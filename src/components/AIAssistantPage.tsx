import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Square, MessageSquare, History, BrainCircuit, X as LucideX, Sparkles } from "lucide-react";
import { aiService } from "../utils/aiService";
import { useSpeech } from "../hooks/useSpeech";

interface Message {
  role: "user" | "model";
  content: string;
}

// --- Wave Visualizer Component ---
interface WaveVisualizerProps {
  state: "idle" | "listening" | "thinking" | "speaking";
}

function WaveVisualizer({ state }: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const colors = {
      idle: ["#3b82f6", "#60a5fa", "#93c5fd"], // Blue
      listening: ["#f43f5e", "#fb7185", "#fda4af"], // Rose
      thinking: ["#f59e0b", "#fbbf24", "#fcd34d"], // Amber
      speaking: ["#10b821", "#34d399", "#6ee7b7"], // Emerald
    };

    const config = {
      idle: { lines: 3, amplitude: 15, speed: 0.02, frequency: 0.015 },
      listening: { lines: 5, amplitude: 45, speed: 0.1, frequency: 0.03 },
      thinking: { lines: 4, amplitude: 25, speed: 0.05, frequency: 0.02 },
      speaking: { lines: 5, amplitude: 40, speed: 0.08, frequency: 0.025 },
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { lines, amplitude, speed, frequency } = config[state];
      const activeColors = colors[state];

      phase += speed;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = i === 0 ? 3 : 1;
        ctx.strokeStyle = activeColors[i % activeColors.length] + (i === 0 ? "" : "66");
        
        const lineOffset = i * 0.5;
        const lineAmplitude = amplitude * (1 - i / lines);

        for (let x = 0; x < canvas.width; x++) {
          const y = (canvas.height / 2) + 
                    Math.sin(x * frequency + phase + lineOffset) * 
                    lineAmplitude * 
                    Math.sin((x / canvas.width) * Math.PI); // Taper at edges

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.parentElement.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [state]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-pointer"
      title="Tap to Interact"
    />
  );
}

// --- Speech Recognition Types ---
interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hello! I'm your English Mentor. I can help you with anything in your curriculum. Talk to me! 🌟" },
  ]);
  const [appState, setAppState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [showHistory, setShowHistory] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { speak, stop } = useSpeech();

  const handleAISend = useCallback(async (text: string) => {
    if (!text.trim()) {
      setAppState("idle");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setAppState("thinking");

    try {
      const response = await aiService.sendMessage(text, messages.map(m => ({
        role: m.role,
        content: m.content
      })));
      
      setMessages((prev) => [...prev, { role: "model", content: response }]);
      
      // Auto-speak the response
      setAppState("speaking");
      speak(response, () => setAppState("idle"));
    } catch (error) {
      console.error("AI Error:", error);
      setAppState("idle");
    }
  }, [messages, speak]);

  const startRecording = () => {
    const win = window as unknown as { 
      SpeechRecognition: SpeechRecognitionConstructor; 
      webkitSpeechRecognition: SpeechRecognitionConstructor 
    };
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
    
    if (!SpeechRecognitionClass) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setAppState("listening");
      stop(); // Stop any current AI speech when user starts talking
    };
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      handleAISend(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopInteraction = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    stop(); // Stop speaking
    setAppState("idle");
  };

  const userMemory = aiService.getMemory();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative py-12">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 transition-all duration-1000 ${
          appState === "listening" ? "bg-rose-500" : appState === "thinking" ? "bg-amber-500" : appState === "speaking" ? "bg-emerald-500" : "bg-blue-500"
        }`} />
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 z-10 w-full max-w-2xl px-6">
        
        {/* The Wave Visualizer */}
        <div className="w-full h-48 sm:h-64 relative" onClick={appState === "idle" ? startRecording : stopInteraction}>
          <WaveVisualizer state={appState} />
          
          {/* Subtle Ambient Glow */}
          <div className={`absolute inset-0 bg-linear-to-r from-transparent via-current to-transparent opacity-5 blur-3xl pointer-events-none ${
            appState === "listening" ? "text-rose-500" : appState === "thinking" ? "text-amber-500" : appState === "speaking" ? "text-emerald-500" : "text-blue-500"
          }`} />
        </div>

        {/* Status Text */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase">
            {appState === "listening" ? "Listening..." : appState === "thinking" ? "Understanding..." : appState === "speaking" ? "Responding..." : "Ready to Help"}
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto text-lg leading-relaxed">
            {appState === "listening" 
              ? "I'm all ears! Speak clearly into your mic."
              : appState === "thinking"
              ? "Analyzing your request and preparing a mentor response..."
              : appState === "speaking"
              ? "Listen carefully to my guidance."
              : `I am your AI mentor. ${userMemory.userName ? `Welcome back, ${userMemory.userName}! ` : ""}Tap the waves to start chatting.`}
          </p>
        </div>

        {/* Last Model Response Preview */}
        {appState === "idle" && messages.length > 0 && (
          <div className="w-full bg-white/5 border border-white/10 rounded-4xl p-8 animate-in fade-in zoom-in-95 duration-700 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Mentor Feedback
            </div>
            <p className="text-xl text-neutral-200 italic leading-relaxed">
              "{messages[messages.length - 1].content}"
            </p>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={() => setShowMemory(!showMemory)}
          className={`p-5 rounded-2xl border transition-all ${
            showMemory ? "bg-amber-500 border-amber-400 text-black" : "bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800"
          } backdrop-blur-xl shadow-xl hover:scale-105 active:scale-95`}
          title="What I've Learned"
        >
          <BrainCircuit size={28} />
        </button>

        {appState === "idle" ? (
          <button
            onClick={startRecording}
            className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 text-lg uppercase tracking-wider"
          >
            <Mic size={28} />
            Start Chat
          </button>
        ) : (
          <button
            onClick={stopInteraction}
            className="px-10 py-5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl shadow-2xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 text-lg uppercase tracking-wider animate-in slide-in-from-bottom-2"
          >
            <Square size={28} />
            Stop AI
          </button>
        )}

        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`p-5 rounded-2xl border transition-all ${
            showHistory ? "bg-white/20 border-white/40 text-white" : "bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800"
          } backdrop-blur-xl shadow-xl hover:scale-105 active:scale-95`}
          title="Conversation History"
        >
          <History size={28} />
        </button>
      </div>

      {/* History Slide-over */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowHistory(false)} />
          <div className="relative w-full max-w-md bg-[#111] border-l border-white/10 shadow-3xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <MessageSquare className="text-blue-500" />
                HISTORY
              </h3>
              <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/5 rounded-full text-neutral-500 transition-colors">
                <LucideX size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${msg.role === "user" ? "text-blue-500" : "text-emerald-500"}`}>
                    {msg.role === "user" ? "Student" : "Mentor"}
                  </span>
                  <div className={`max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed ${
                    msg.role === "user" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white/5 text-neutral-300 border border-white/5 shadow-xl"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Memory Slide-over */}
      {showMemory && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowMemory(false)} />
          <div className="relative w-full max-w-md bg-[#111] border-l border-white/10 shadow-3xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <BrainCircuit className="text-amber-500" />
                MY PERSONAL LOGS
              </h3>
              <button onClick={() => setShowMemory(false)} className="p-2 hover:bg-white/5 rounded-full text-neutral-500 transition-colors">
                <LucideX size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {/* User Name */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-2">
                  <Sparkles size={14} /> Student Profile
                </h4>
                <div className="text-2xl font-black text-white">{userMemory.userName || "Guest Student"}</div>
              </div>

              {/* Facts & Hobbies */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mx-2">Learned Facts</h4>
                <div className="flex flex-wrap gap-2">
                  {userMemory.facts.length > 0 ? userMemory.facts.map((fact, i) => (
                    <span key={i} className="px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full text-sm font-bold border border-amber-500/20">
                      {fact}
                    </span>
                  )) : <div className="text-neutral-600 italic px-2">No facts learned yet. Tell me something about yourself!</div>}
                </div>
              </div>

              {/* Topics Practiced */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mx-2">Practiced Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {userMemory.learnedTopics.length > 0 ? userMemory.learnedTopics.map((topic, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-bold border border-blue-500/20">
                      {topic}
                    </span>
                  )) : <div className="text-neutral-600 italic px-2">No topics practiced yet. Ask for help with a lesson!</div>}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 mx-2">Watch-list (Mistakes)</h4>
                <div className="flex flex-wrap gap-2">
                  {userMemory.commonMistakes.length > 0 ? userMemory.commonMistakes.map((mistake, i) => (
                    <span key={i} className="px-4 py-2 bg-rose-500/10 text-rose-500 rounded-full text-sm font-bold border border-rose-500/20">
                      {mistake}
                    </span>
                  )) : <div className="text-neutral-600 italic px-2">No mistakes recorded yet. Keep it up!</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
