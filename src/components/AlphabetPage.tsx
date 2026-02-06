import { useState, useRef, useEffect } from "react";
import { Mic, PenLine, Eye, EyeOff } from "lucide-react";

// Expanded Data with Phonics
const ALPHABET_DATA: Record<
  string,
  {
    name: string;
    sound: string;
    soundExample: string;
    phoneme: string;
    soundAlternatives: string[];
  }
> = {
  A: {
    name: "Ay",
    sound: "Ah",
    soundExample: "Apple",
    phoneme: "a",
    soundAlternatives: ["a", "ah", "apple", "at", "an", "as", "about"],
  },
  B: {
    name: "Bee",
    sound: "Buh",
    soundExample: "Ball",
    phoneme: "b",
    soundAlternatives: ["ba", "buh", "ball", "be", "bee", "boy", "but"],
  },
  C: {
    name: "See",
    sound: "Kuh",
    soundExample: "Cat",
    phoneme: "c",
    soundAlternatives: ["ka", "kuh", "cat", "car", "can", "come"],
  },
  D: {
    name: "Dee",
    sound: "Duh",
    soundExample: "Dog",
    phoneme: "d",
    soundAlternatives: ["da", "duh", "dog", "day", "do", "dad"],
  },
  E: {
    name: "Ee",
    sound: "Eh",
    soundExample: "Egg",
    phoneme: "e",
    soundAlternatives: ["e", "eh", "egg", "end", "elephant", "every"],
  },
  F: {
    name: "Eff",
    sound: "Fff",
    soundExample: "Fish",
    phoneme: "f",
    soundAlternatives: ["f", "fff", "fish", "fox", "fan", "for"],
  },
  G: {
    name: "Jee",
    sound: "Guh",
    soundExample: "Goat",
    phoneme: "g",
    soundAlternatives: ["ga", "guh", "goat", "game", "go", "good"],
  },
  H: {
    name: "Aitch",
    sound: "Huh",
    soundExample: "Hat",
    phoneme: "h",
    soundAlternatives: ["ha", "huh", "hat", "hot", "he", "hi"],
  },
  I: {
    name: "Eye",
    sound: "Ih",
    soundExample: "Igloo",
    phoneme: "i",
    soundAlternatives: ["i", "ih", "igloo", "it", "is", "in"],
  },
  J: {
    name: "Jay",
    sound: "Juh",
    soundExample: "Jam",
    phoneme: "j",
    soundAlternatives: ["ja", "juh", "jam", "jet", "jar", "joy"],
  },
  K: {
    name: "Kay",
    sound: "Kuh",
    soundExample: "Kite",
    phoneme: "k",
    soundAlternatives: ["ka", "kuh", "kite", "key", "king", "kind"],
  },
  L: {
    name: "El",
    sound: "Lll",
    soundExample: "Lion",
    phoneme: "l",
    soundAlternatives: ["la", "lll", "lion", "leg", "let", "look"],
  },
  M: {
    name: "Em",
    sound: "Mmm",
    soundExample: "Monkey",
    phoneme: "m",
    soundAlternatives: ["ma", "mmm", "monkey", "me", "my", "man"],
  },
  N: {
    name: "En",
    sound: "Nnn",
    soundExample: "Nest",
    phoneme: "n",
    soundAlternatives: ["na", "nnn", "nest", "no", "not", "new"],
  },
  O: {
    name: "Oh",
    sound: "Aw",
    soundExample: "Octopus",
    phoneme: "o",
    soundAlternatives: ["o", "aw", "octopus", "on", "off", "ox"],
  },
  P: {
    name: "Pee",
    sound: "Puh",
    soundExample: "Pig",
    phoneme: "p",
    soundAlternatives: ["pa", "puh", "pig", "pen", "put", "pet"],
  },
  Q: {
    name: "Cue",
    sound: "Kwuh",
    soundExample: "Queen",
    phoneme: "q",
    soundAlternatives: ["kwa", "kwuh", "queen", "quick", "question"],
  },
  R: {
    name: "Ar",
    sound: "Rrr",
    soundExample: "Rabbit",
    phoneme: "r",
    soundAlternatives: ["ra", "rrr", "rabbit", "run", "red", "rat"],
  },
  S: {
    name: "Ess",
    sound: "Sah",
    soundExample: "Sun",
    phoneme: "s",
    soundAlternatives: ["sa", "sah", "sun", "see", "sit", "sing"],
  },
  T: {
    name: "Tee",
    sound: "Tuh",
    soundExample: "Tiger",
    phoneme: "t",
    soundAlternatives: ["ta", "tuh", "tiger", "to", "ten", "top"],
  },
  U: {
    name: "You",
    sound: "Uh",
    soundExample: "Umbrella",
    phoneme: "u",
    soundAlternatives: ["u", "uh", "umbrella", "up", "us", "under"],
  },
  V: {
    name: "Vee",
    sound: "Vvv",
    soundExample: "Van",
    phoneme: "v",
    soundAlternatives: ["va", "vvv", "van", "very", "voice"],
  },
  W: {
    name: "Double u",
    sound: "Wuh",
    soundExample: "Watch",
    phoneme: "w",
    soundAlternatives: ["wa", "wuh", "watch", "we", "was", "will"],
  },
  X: {
    name: "Ex",
    sound: "Ks",
    soundExample: "Box",
    phoneme: "x",
    soundAlternatives: ["ks", "ex", "box", "six", "fox", "tax"],
  },
  Y: {
    name: "Wye",
    sound: "Yuh",
    soundExample: "Yo-yo",
    phoneme: "y",
    soundAlternatives: ["ya", "yuh", "yo-yo", "yes", "why", "wye", "you"],
  },
  Z: {
    name: "Zee",
    sound: "Zzz",
    soundExample: "Zebra",
    phoneme: "z",
    soundAlternatives: ["za", "zzz", "zebra", "zoo", "zip", "zero"],
  },
};

const ALPHABET = Object.keys(ALPHABET_DATA);

type Feedback = {
  type: "success" | "error" | "neutral";
  message: string;
} | null;

export function AlphabetPage() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [userText, setUserText] = useState("");
  const [showReference, setShowReference] = useState(true);

  // SEPARATED FEEDBACK STATES
  const [writeFeedback, setWriteFeedback] = useState<Feedback>(null);
  const [speakFeedback, setSpeakFeedback] = useState<Feedback>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide reference when typing starts
  useEffect(() => {
    if (userText.length > 0 && showReference) {
      setShowReference(false);
    }
  }, [userText, showReference]);

  const toggleReference = () => {
    setShowReference(!showReference);
  };

  const handleUserTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
    if (writeFeedback && writeFeedback.type === "error") setWriteFeedback(null);
  };

  const speak = (text: string, rate = 1.0) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLetterClick = (letter: string) => {
    // STOP LISTEN ALL IF ACTIVE

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    }
    setActiveLetter(letter);
    setWriteFeedback(null);
    setSpeakFeedback(null);
    setUserText("");
    setTranscript("");
    setShowReference(true);
    const data = ALPHABET_DATA[letter];
    // Simple Prompt: Name and Sound
    speak(`${data.name}, ${data.sound}`);
  };

  const startListening = () => {
    if (!activeLetter) {
      speak("Select a letter first");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported. Use Chrome.");
      return;
    }

    if (recognitionRef.current) recognitionRef.current.stop();
    setTranscript("");
    setSpeakFeedback(null);

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    // Stable Silence Timer (15 seconds)
    const resetTimer = () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (isListening) {
          recognition.stop();
          setSpeakFeedback({
            type: "error",
            message: "Silence timeout. Try again!",
          });
        }
      }, 15000);
    };

    recognition.onstart = () => {
      setIsListening(true);
      resetTimer();
    };
    recognition.onend = () => {
      setIsListening(false);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
    recognition.onerror = (e: any) => {
      setIsListening(false);
      setSpeakFeedback({ type: "error", message: `Mic Error: ${e.error}` });
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Reset timer on any speech activity
      resetTimer();

      const result = (finalTranscript || interimTranscript).trim();
      setTranscript(result);

      if (!result) return;

      const data = ALPHABET_DATA[activeLetter!];
      const normalize = (s: string) =>
        s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const normResult = normalize(result);

      const targetName = normalize(data.name);
      const targetLetter = normalize(activeLetter!);

      // Found Name: checking if result contains the letter name or the letter itself
      const foundName =
        normResult.includes(targetName) || normResult.includes(targetLetter);

      // Found Sound: checking if result contains the sound, the example, or any alternative
      const foundSound =
        normResult.includes(normalize(data.sound)) ||
        normResult.includes(normalize(data.soundExample)) ||
        data.soundAlternatives.some((alt) =>
          normResult.includes(normalize(alt)),
        );

      if (foundName && foundSound) {
        setSpeakFeedback({ type: "success", message: "Perfect! You got it." });
        recognition.stop(); // Stop immediately on success
        speak("Perfect!");
      } else if (foundName) {
        setSpeakFeedback({
          type: "neutral",
          message: "Good! Now say the sound too.",
        });
      } else if (foundSound) {
        setSpeakFeedback({
          type: "neutral",
          message: "Great sound! Say the letter name too.",
        });
      } else {
        setSpeakFeedback({
          type: "error",
          message: `Try saying: "${data.name} ${data.sound}"`,
        });
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error(e);
      setSpeakFeedback({
        type: "error",
        message: "Mic access failed. Refresh page.",
      });
    }
  };

  const handleCheckAnswer = () => {
    if (!userText.trim()) return;
    setShowReference(true);

    if (activeLetter) {
      const expectedPair = `${activeLetter}${activeLetter.toLowerCase()}`;
      const parts = userText.trim().split(/\s+/);
      if (parts.length < 5) {
        const msg = `Write 5 times! Found ${parts.length}.`;
        setWriteFeedback({ type: "error", message: msg });
        speak(msg);
        return;
      }
      const mistakes = parts.filter((p) => p !== expectedPair);
      if (mistakes.length === 0) {
        setWriteFeedback({ type: "success", message: "Excellent!" });
        speak("Excellent!");
      } else {
        setWriteFeedback({ type: "error", message: `Check spelling.` });
        speak("Check spelling.");
      }
    } else {
      const cleaned = userText.replace(/[^a-zA-Z]/g, "").toUpperCase();
      if (cleaned.includes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")) {
        setWriteFeedback({ type: "success", message: "Amazing!" });
        speak("Amazing!");
      } else {
        setWriteFeedback({ type: "error", message: "Practice A B C..." });
        speak("Practice A B C.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Alphabet
          </h1>
          <p className="text-neutral-400 mt-1 text-sm sm:text-base">
            Master the 26 letters.
          </p>
        </div>
        {/* Mode Toggle */}
        <div className="flex justify-end gap-3">
          <button
            onClick={toggleReference}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#242424] text-neutral-400 text-sm border border-white/5"
          >
            {showReference ? <Eye size={16} /> : <EyeOff size={16} />}
            {showReference ? "Hide Letters" : "Show Letters"}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-4 transition-all duration-500 ${showReference ? "opacity-100 blur-none" : "opacity-0 blur-xl pointer-events-none absolute inset-0 z-[-1]"}`}
      >
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative overflow-hidden group border border-white/5 ${
              activeLetter === letter
                ? "bg-blue-600 text-white scale-110 z-10"
                : "bg-[#1e1e1e] text-neutral-300 hover:bg-[#2a2a2a]"
            }`}
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              {letter}
              {letter.toLowerCase()}
            </span>
            {activeLetter === letter && (
              <div className="text-xs mt-1 font-medium opacity-80">
                {ALPHABET_DATA[letter].name}
              </div>
            )}
          </button>
        ))}
      </div>

      {!showReference && (
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl text-neutral-500">
          Letters Hidden - Memory Mode
        </div>
      )}

      <div className="flex flex-col gap-10">
        {/* Practice Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Writing - Auto Hides */}
          <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col h-[420px]">
            <div className="flex items-center gap-3 text-amber-400 mb-4 px-2">
              <PenLine size={20} />
              <span className="font-semibold">Writing Practice</span>
            </div>
            <p className="text-neutral-400 text-sm mb-4 px-2 h-5">
              {activeLetter
                ? `Write "${activeLetter}${activeLetter.toLowerCase()}" 5 times:`
                : "Write alphabet (Aa Bb...):"}
            </p>
            <textarea
              value={userText}
              onChange={handleUserTextChange}
              placeholder={activeLetter ? "Aa Aa Aa ..." : "Aa Bb Cc ..."}
              className="w-full flex-1 bg-[#141414] rounded-xl p-4 text-lg text-white mb-4 resize-none font-mono"
            />
            {/* Fixed Height Feedback Container */}
            <div className="h-6 mb-2 flex items-center">
              {writeFeedback && (
                <div
                  className={`text-sm font-medium ${writeFeedback.type === "success" ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {writeFeedback.message}
                </div>
              )}
            </div>
            <button
              onClick={handleCheckAnswer}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors"
            >
              Check Written Answer
            </button>
          </div>

          {/* Speaking - Fixed Layout */}
          <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col h-[420px]">
            <div className="flex items-center gap-3 text-rose-400 mb-4 px-2">
              <Mic size={20} />
              <span className="font-semibold text-sm sm:text-base">
                Speaking Practice
              </span>
            </div>

            {activeLetter ? (
              <>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-neutral-400 mb-4 text-sm">
                    Repeat what you heard:
                  </p>
                  <div className="flex gap-4 mb-6">
                    <span className="text-2xl font-bold text-blue-400 bg-blue-400/10 px-4 py-2 rounded-xl border border-blue-400/20">
                      {ALPHABET_DATA[activeLetter].name}
                    </span>
                    <span className="text-2xl font-bold text-rose-400 bg-rose-400/10 px-4 py-2 rounded-xl border border-rose-400/20">
                      {ALPHABET_DATA[activeLetter].sound}
                    </span>
                  </div>
                  <div className="text-7xl font-black text-white mb-2 tracking-tighter">
                    {activeLetter}
                  </div>
                </div>

                {/* Fixed Height Transcript Area */}
                <div className="h-10 flex items-center justify-center w-full mb-2">
                  {transcript && (
                    <div className="bg-white/5 px-4 py-2 rounded-lg truncate max-w-full">
                      <span className="text-neutral-400 text-xs uppercase font-bold mr-2">
                        Heard:
                      </span>
                      <span className="text-white font-medium">
                        "{transcript}"
                      </span>
                    </div>
                  )}
                </div>

                {/* Fixed Height Feedback Area */}
                <div className="h-6 flex items-center justify-center w-full mb-4">
                  {speakFeedback && (
                    <div
                      className={`font-medium ${speakFeedback.type === "success" ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {speakFeedback.message}
                    </div>
                  )}
                </div>

                <button
                  onClick={startListening}
                  className={`w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${isListening ? "bg-rose-500/20 text-rose-400 border border-rose-500 animate-pulse shadow-none" : "shadow-lg shadow-rose-500/20"}`}
                >
                  {isListening ? (
                    <>
                      <Mic size={20} className="animate-pulse" />
                      <span>Listening...</span>
                    </>
                  ) : (
                    <>
                      <Mic size={20} />
                      <span>Click to Speak</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-neutral-500 font-medium">
                Select a letter first.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
