import { useState, useRef, useEffect } from "react";
import {
  Mic,
  PenLine,
  X,
  CheckCircle2,
  AlertCircle,
  Volume2,
} from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { isFuzzyMatch } from "../utils/textUtils";

// --- Speech Recognition Types ---
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}
// --------------------------------

export function PracticeWidget() {
  const {
    activeWord,
    activePhonetics,
    practiceMode,
    setPracticeMode,
    clearPractice,
  } = usePractice();
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "neutral";
    message: string;
  } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const validationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearPractice();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [clearPractice]);

  // Ensure SpeechRecognition is stopped when component unmounts
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  const { speak } = useSpeech();

  const handleWritingCheck = () => {
    if (!userText.trim() || !activeWord) return;

    // For alphabet letters, handle the "Aa" pair logic
    const isLetter = activeWord.length === 1;
    const expected = isLetter
      ? `${activeWord}${activeWord.toLowerCase()}`
      : activeWord;

    if (userText.trim().toLowerCase() === expected.toLowerCase()) {
      setFeedback({
        type: "success",
        message: "Excellent! You wrote it correctly.",
      });
      speak("Excellent!");
    } else {
      setFeedback({
        type: "error",
        message: `Try again! The correct spelling is "${expected}".`,
      });
      speak("Check spelling.");
    }
  };

  /* ------------------------------------------------------------
   * Speech Recognition Logic
   * ------------------------------------------------------------ */
  const [interimTranscript, setInterimTranscript] = useState("");

  const toggleListening = () => {
    if (!activeWord) return;

    // If already listening, stop
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    // Reset state
    if (recognitionRef.current) recognitionRef.current.stop();
    setTranscript("");
    setInterimTranscript("");
    setFeedback(null);

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    // 2s Validation Timer (After speech stops)
    const resetValidationTimer = () => {
      if (validationTimerRef.current) clearTimeout(validationTimerRef.current);
      validationTimerRef.current = setTimeout(() => {
        recognition.stop();
        // If we get here, it means silence happened but NO match was found yet
        // So we give "Try again" feedback
        setFeedback({
          type: "error",
          message: "Not quite. Listen and try again!",
        });
        speak("Try again.");
        setIsListening(false);
      }, 2000);
    };

    // 10s Silence Timer (No speech at all)
    const resetTimer = () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        recognition.stop();
        if (!transcript && !interimTranscript) {
          setFeedback({
            type: "error",
            message: "No speech detected. Try again!",
          });
        }
      }, 10000);
    };

    recognition.onstart = () => {
      setIsListening(true);
      resetTimer();
      // Don't start validation timer until we actually get results
    };

    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        setIsListening(false);
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (validationTimerRef.current)
          clearTimeout(validationTimerRef.current);

        // If we have an interim result but no final, treat interim as final
        if (!transcript && interimTranscript) {
          setTranscript(interimTranscript);
        }
      }
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (recognitionRef.current === recognition) {
        setIsListening(false);
        if (e.error !== "no-speech") {
          setFeedback({ type: "error", message: `Mic Error: ${e.error}` });
        }
      }
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      resetTimer();
      resetValidationTimer();

      let final = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        setTranscript((prev) => prev + final);
        // Also clear interim since we have a final
        setInterimTranscript("");
      } else {
        setInterimTranscript(interim);
      }

      // Check for match against EITHER final or interim (for speed)
      const currentText = (final || interim).trim().toLowerCase();
      const target = activeWord.toLowerCase();

      const normalize = (s: string) =>
        s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const normResult = normalize(currentText);

      // 1. Exact/Close Match?
      let isCorrect = isFuzzyMatch(normResult, normalize(target));

      // 2. Phonetic Match?
      if (activePhonetics) {
        const foundName =
          isFuzzyMatch(normResult, normalize(activePhonetics.name)) ||
          isFuzzyMatch(normResult, normalize(activeWord));

        const foundSound =
          isFuzzyMatch(normResult, normalize(activePhonetics.sound)) ||
          activePhonetics.soundAlternatives?.some((alt) =>
            isFuzzyMatch(normResult, normalize(alt)),
          );

        if (foundName && foundSound) isCorrect = true;
        // If partial match
        else if (foundName || foundSound) {
          // partial logic
        }
      }

      if (isCorrect) {
        setFeedback({ type: "success", message: "Perfect! You got it right." });
        speak("Perfect!");

        // Save what triggered it as final transcript for display
        setTranscript(currentText);
        setInterimTranscript("");

        if (validationTimerRef.current)
          clearTimeout(validationTimerRef.current);
        recognition.stop();
        setIsListening(false);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  if (!activeWord) return null;

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        <button
          onClick={() => setPracticeMode("writing")}
          className={`p-4 rounded-2xl border transition-all shadow-xl backdrop-blur-md group ${
            practiceMode === "writing"
              ? "bg-amber-500 border-amber-400 text-black scale-110"
              : "bg-[#1a1a1a]/80 border-white/10 text-amber-500 hover:bg-amber-500/10 hover:scale-105"
          }`}
          title="Practice Writing"
        >
          <PenLine size={24} />
          <div className="absolute right-full mr-4 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-2xl border border-white/5">
            Practice Writing: {activeWord}
          </div>
        </button>

        <button
          onClick={() => setPracticeMode("speaking")}
          className={`p-4 rounded-2xl border transition-all shadow-xl backdrop-blur-md group ${
            practiceMode === "speaking"
              ? "bg-rose-500 border-rose-400 text-white scale-110"
              : "bg-[#1a1a1a]/80 border-white/10 text-rose-500 hover:bg-rose-500/10 hover:scale-105"
          }`}
          title="Practice Speaking"
        >
          <Mic size={24} />
          <div className="absolute right-full mr-4 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-2xl border border-white/5">
            Practice Speaking: {activeWord}
          </div>
        </button>

        <button
          onClick={clearPractice}
          className="p-4 rounded-2xl bg-neutral-800/80 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-700/80 transition-all shadow-xl backdrop-blur-md"
          title="Clear Selection"
        >
          <X size={24} />
        </button>
      </div>

      {/* Practice Modal/Overlay */}
      {practiceMode && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-6 sm:p-12">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setPracticeMode(null)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setPracticeMode(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-neutral-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-12 space-y-8 text-center">
              {/* Header */}
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                    practiceMode === "writing"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {practiceMode === "writing" ? (
                    <PenLine size={14} />
                  ) : (
                    <Mic size={14} />
                  )}
                  {practiceMode} Practice
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                  {practiceMode === "speaking" ? activeWord : "?????"}
                </h2>
                <p className="text-neutral-400 max-w-sm mx-auto">
                  {practiceMode === "writing"
                    ? `How do you spell the word? Type it below to find out.`
                    : `Listen carefully and repeat the word into your microphone.`}
                </p>
              </div>

              {/* Interaction Area */}
              <div className="space-y-6">
                {practiceMode === "writing" ? (
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      value={userText}
                      onChange={(e) => {
                        setUserText(e.target.value);
                        setFeedback(null);
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleWritingCheck()
                      }
                      placeholder="Type the word here..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-2xl text-center text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-mono"
                    />
                    <button
                      onClick={handleWritingCheck}
                      className="w-full mt-4 py-5 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98]"
                    >
                      Check Spelling
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-center gap-6">
                      <button
                        onClick={() => speak(activeWord)}
                        className="p-6 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all group active:scale-95"
                        title="Listen to Word"
                      >
                        <Volume2
                          size={48}
                          className="transition-transform group-hover:scale-110"
                        />
                      </button>
                    </div>

                    <button
                      onClick={toggleListening}
                      className={`w-full py-8 rounded-4xl text-2xl font-black transition-all flex items-center justify-center gap-4 ${
                        isListening
                          ? "bg-rose-500/20 text-rose-400 border-2 border-rose-500 animate-pulse"
                          : "bg-rose-500 text-white hover:bg-rose-600 shadow-2xl shadow-rose-500/20 active:scale-[0.98]"
                      }`}
                    >
                      {isListening ? (
                        <>
                          <div className="flex gap-1 items-center">
                            <span className="w-2 h-8 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-12 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-8 bg-rose-400 rounded-full animate-bounce" />
                          </div>
                          <span>Listening...</span>
                        </>
                      ) : (
                        <>
                          <Mic size={32} />
                          <span>Tap to Speak</span>
                        </>
                      )}
                    </button>

                    {/* Transcript Display (Final + Interim) */}
                    {(transcript || interimTranscript) && !isListening && (
                      <div className="bg-white/5 px-6 py-4 rounded-2xl inline-block max-w-full">
                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest block mb-1">
                          We Heard:
                        </span>
                        <span className="text-xl text-white font-medium italic">
                          "{transcript || interimTranscript}"
                        </span>
                      </div>
                    )}

                    {/* Live Interim Display while Listening */}
                    {isListening && interimTranscript && (
                      <div className="bg-rose-500/10 border border-rose-500/20 px-6 py-4 rounded-2xl inline-block max-w-full animate-pulse">
                        <span className="text-rose-400 text-xs font-bold uppercase tracking-widest block mb-1">
                          Hearing...
                        </span>
                        <span className="text-xl text-white font-medium italic">
                          "{interimTranscript}..."
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Feedback Area */}
              <div className="min-h-[80px] flex items-center justify-center">
                {feedback && (
                  <div
                    className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 ${
                      feedback.type === "success"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : feedback.type === "neutral"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <AlertCircle size={24} />
                    )}
                    <span className="font-bold">{feedback.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
