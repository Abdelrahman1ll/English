import { useState, useRef, useEffect } from "react";
import { Mic, PenLine, Ghost, Eye, EyeOff } from "lucide-react";

// Data structures
const MAGIC_E_DATA = [
  { short: "cap", long: "cape", shortAr: "قبعة", longAr: "رداء" },
  { short: "dim", long: "dime", shortAr: "خافت", longAr: "عملة" },
  { short: "con", long: "cone", shortAr: "خدعة", longAr: "مخروط" },
  { short: "dud", long: "dude", shortAr: "قذيفة", longAr: "يا صاح" },
  { short: "dam", long: "dame", shortAr: "سد", longAr: "سيدة" },
  { short: "fin", long: "fine", shortAr: "زعنفة", longAr: "بخير" },
  { short: "cop", long: "cope", shortAr: "شرطي", longAr: "تأقلم" },
  { short: "tub", long: "tube", shortAr: "حوض", longAr: "أنبوب" },
  { short: "fad", long: "fade", shortAr: "بدعة", longAr: "تلاشى" },
  { short: "hid", long: "hide", shortAr: "اختبأ", longAr: "اختباء" },
  { short: "dot", long: "dote", shortAr: "نقطة", longAr: "دلل" },
  { short: "cub", long: "cube", shortAr: "شبل", longAr: "مكعب" },
  { short: "fat", long: "fate", shortAr: "سمين", longAr: "قدر" },
  { short: "kit", long: "kite", shortAr: "عدة", longAr: "طائرة ورقية" },
  { short: "hop", long: "hope", shortAr: "قفز", longAr: "أمل" },
  { short: "gap", long: "gape", shortAr: "فجوة", longAr: "حدق" },
  { short: "pin", long: "pine", shortAr: "دبوس", longAr: "صنوبر" },
  { short: "lob", long: "lobe", shortAr: "رمي", longAr: "فص" },
  { short: "hat", long: "hate", shortAr: "قبعة", longAr: "كره" },
  { short: "pip", long: "pipe", shortAr: "نقطة", longAr: "أنبوب" },
  { short: "mod", long: "mode", shortAr: "تعديل", longAr: "وضع" },
  { short: "mad", long: "made", shortAr: "مجنون", longAr: "صنع" },
  { short: "rid", long: "ride", shortAr: "تخلص", longAr: "ركوب" },
  { short: "mop", long: "mope", shortAr: "ممسحة", longAr: "اكتئاب" },
  { short: "mat", long: "mate", shortAr: "حصيرة", longAr: "رفيق" },
  { short: "rip", long: "ripe", shortAr: "مزق", longAr: "ناضج" },
  { short: "nod", long: "node", shortAr: "إيماءة", longAr: "عقدة" },
  { short: "pal", long: "pale", shortAr: "رفيق", longAr: "شاحب" },
  { short: "sin", long: "sine", shortAr: "إثم", longAr: "جيب الزاوية" },
  { short: "not", long: "note", shortAr: "ليس", longAr: "ملاحظة" },
  { short: "tap", long: "tape", shortAr: "صنبور", longAr: "شريط" },
  { short: "sit", long: "site", shortAr: "جلس", longAr: "موقع" },
  { short: "rob", long: "robe", shortAr: "سرق", longAr: "روب" },
  { short: "rat", long: "rate", shortAr: "جرذ", longAr: "معدل" },
  { short: "win", long: "wine", shortAr: "فاز", longAr: "نبيذ" },
  { short: "tot", long: "tote", shortAr: "طفل", longAr: "حمل" },
];

const SILENT_LETTERS_DATA: Record<string, { word: string; arabic: string }[]> =
  {
    B: [
      { word: "Bomb", arabic: "قنبلة" },
      { word: "Climb", arabic: "تسلق" },
      { word: "Comb", arabic: "مشط" },
      { word: "Crumb", arabic: "فتات" },
      { word: "Debt", arabic: "دين" },
      { word: "Doubt", arabic: "شك" },
      { word: "Dumb", arabic: "أبكم" },
      { word: "Lamb", arabic: "حمل" },
      { word: "Limb", arabic: "طرف" },
      { word: "Numb", arabic: "خدر" },
      { word: "Plumber", arabic: "سباك" },
      { word: "Subtle", arabic: "رقيق" },
      { word: "Thumb", arabic: "إبهام" },
      { word: "Succumb", arabic: "استسلم" },
    ],
    T: [
      { word: "Butcher", arabic: "جزار" },
      { word: "Castle", arabic: "قلعة" },
      { word: "Christmas", arabic: "عيد الميلاد" },
      { word: "Fasten", arabic: "ربط" },
      { word: "Hustle", arabic: "صخب" },
      { word: "Listen", arabic: "استمع" },
      { word: "Mortgage", arabic: "رهن عقاري" },
      { word: "Nestle", arabic: "استقر" },
      { word: "Often", arabic: "غالباً" },
      { word: "Rustle", arabic: "حفيف" },
      { word: "Soften", arabic: "نعم" },
      { word: "Witch", arabic: "ساحرة" },
      { word: "Watch", arabic: "شاهد/ساعة" },
    ],
    H: [
      { word: "Ghost", arabic: "شبح" },
      { word: "Honest", arabic: "صادق" },
      { word: "Hour", arabic: "ساعة" },
      { word: "Mechanic", arabic: "ميكانيكي" },
      { word: "Rhythm", arabic: "إيقاع" },
      { word: "Scheme", arabic: "مخطط" },
      { word: "School", arabic: "مدرسة" },
      { word: "What", arabic: "ماذا" },
      { word: "When", arabic: "متى" },
      { word: "Where", arabic: "أين" },
      { word: "Whether", arabic: "ما إذا" },
      { word: "While", arabic: "بينما" },
      { word: "White", arabic: "أبيض" },
      { word: "Why", arabic: "لماذا" },
    ],
    K: [
      { word: "Knee", arabic: "ركبة" },
      { word: "Knew", arabic: "عرف" },
      { word: "Knickers", arabic: "سروال داخلي" },
      { word: "Knife", arabic: "سكين" },
      { word: "Knight", arabic: "فارس" },
      { word: "Knit", arabic: "حياكة" },
      { word: "Knitting", arabic: "حياكة" },
      { word: "Knob", arabic: "مقبض" },
      { word: "Knock", arabic: "طرق" },
      { word: "Knot", arabic: "عقدة" },
      { word: "Know", arabic: "عرف" },
      { word: "Knowledge", arabic: "معرفة" },
      { word: "Knuckle", arabic: "مفصل" },
      { word: "Knack", arabic: "مهارة" },
    ],
    W: [
      { word: "Answer", arabic: "إجابة" },
      { word: "Sword", arabic: "سيف" },
      { word: "Two", arabic: "اثنين" },
      { word: "Whole", arabic: "كل/كامل" },
      { word: "Wrack", arabic: "دمار" },
      { word: "Wrap", arabic: "لف" },
      { word: "Wrist", arabic: "رسغ" },
      { word: "Wrinkle", arabic: "تجاعيد" },
      { word: "Wreck", arabic: "حطام" },
      { word: "Wren", arabic: "عصفور" },
      { word: "Wrench", arabic: "مفتاح الربط" },
      { word: "Wrestle", arabic: "صارع" },
      { word: "Writing", arabic: "كتابة" },
      { word: "Wriggle", arabic: "تلوي" },
    ],
    G: [
      { word: "Sign", arabic: "علامة" },
      { word: "Campaign", arabic: "حملة" },
      { word: "Champagne", arabic: "شمبانيا" },
      { word: "Cologne", arabic: "كولونيا" },
      { word: "Gnome", arabic: "قزم" },
      { word: "Design", arabic: "تصميم" },
      { word: "Resign", arabic: "استقال" },
      { word: "Align", arabic: "محاذاة" },
      { word: "Assign", arabic: "تعيين" },
    ],
    U: [
      { word: "Guard", arabic: "حارس" },
      { word: "Biscuit", arabic: "بسكويت" },
      { word: "Vogue", arabic: "موضة" },
      { word: "Building", arabic: "بناء" },
      { word: "Rogue", arabic: "مارق" },
      { word: "Tongue", arabic: "لسان" },
      { word: "Guilty", arabic: "مذنب" },
      { word: "Guitar", arabic: "جيتار" },
      { word: "Guess", arabic: "تخمين" },
      { word: "Guest", arabic: "ضيف" },
    ],
    C: [
      { word: "Conscience", arabic: "ضمير" },
      { word: "Conscious", arabic: "واع" },
      { word: "Crescent", arabic: "هلال" },
      { word: "Descend", arabic: "نزل" },
      { word: "Descent", arabic: "نصول" },
      { word: "Disciple", arabic: "تلميذ" },
      { word: "Evanesce", arabic: "تلاشى" },
      { word: "Fascinate", arabic: "سحر" },
      { word: "Fluorescent", arabic: "فلوري" },
      { word: "Muscle", arabic: "عضلة" },
    ],
    L: [
      { word: "Almond", arabic: "لوز" },
      { word: "Talk", arabic: "تحدث" },
      { word: "Calf", arabic: "عجل" },
      { word: "Calm", arabic: "هدوء" },
      { word: "Chalk", arabic: "طباشير" },
      { word: "Walk", arabic: "مشى" },
      { word: "Folk", arabic: "قوم" },
      { word: "Half", arabic: "نصف" },
      { word: "Palm", arabic: "نخيل/كف" },
      { word: "Salmon", arabic: "سلمون" },
    ],
    P: [
      { word: "Coup", arabic: "انقلاب" },
      { word: "Cupboard", arabic: "خزانة" },
      { word: "Pneumonia", arabic: "التهاب رئوي" },
      { word: "Pseudo", arabic: "زائف" },
      { word: "Psychiatrist", arabic: "طبيب نفسي" },
      { word: "Psychic", arabic: "نفسي" },
      { word: "Psychology", arabic: "علم النفس" },
      { word: "Psychotherapy", arabic: "علاج نفسي" },
      { word: "Psychotic", arabic: "ذهاني" },
      { word: "Raspberry", arabic: "توت" },
    ],
    E: [
      { word: "Age", arabic: "عمر" },
      { word: "Baggage", arabic: "أمتعة" },
      { word: "Breathe", arabic: "تنفس" },
      { word: "Change", arabic: "تغيير" },
      { word: "Clothes", arabic: "ملابس" },
    ],
    D: [
      { word: "Edge", arabic: "حافة" },
      { word: "Bridge", arabic: "جسر" },
      { word: "Handsome", arabic: "وسيم" },
      { word: "Hedge", arabic: "سياج" },
      { word: "Sandwich", arabic: "شطيرة" },
    ],
    A: [
      { word: "Artistically", arabic: "فنياً" },
      { word: "Logically", arabic: "منطقياً" },
      { word: "Musically", arabic: "موسيقياً" },
      { word: "Physically", arabic: "جسدياً" },
      { word: "Critically", arabic: "نقدياً" },
    ],
    N: [
      { word: "Autumn", arabic: "خريف" },
      { word: "Column", arabic: "عمود" },
      { word: "Damn", arabic: "اللعنة" },
    ],
    S: [
      { word: "Aisle", arabic: "ممر" },
      { word: "Island", arabic: "جزيرة" },
      { word: "Isis", arabic: "إيزيس" },
    ],
  };

type Feedback = {
  type: "success" | "error" | "neutral";
  message: string;
} | null;

export function PhonicsPage({ type }: { type: "magic-e" | "silent-letters" }) {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [userText, setUserText] = useState("");
  const [showPracticeWord, setShowPracticeWord] = useState(true);
  const [writeFeedback, setWriteFeedback] = useState<Feedback>(null);
  const [speakFeedback, setSpeakFeedback] = useState<Feedback>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stop synthesis when switching type
  useEffect(() => {
    setActiveWord(null);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }, [type]);

  // Auto-hide word when typing starts
  useEffect(() => {
    if (userText.length > 0 && showPracticeWord) {
      setShowPracticeWord(false);
    }
  }, [userText, showPracticeWord]);

  const speak = (text: string, rate = 0.9) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleWordClick = (word: string) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setActiveWord(word);
    speak(word);
    setWriteFeedback(null);
    setSpeakFeedback(null);
    setUserText("");
    setTranscript("");
    setShowPracticeWord(true); // Reset visibility when selecting a new word
  };

  const handleCheckAnswer = () => {
    if (!userText.trim() || !activeWord) return;
    if (userText.trim().toLowerCase() === activeWord.toLowerCase()) {
      setWriteFeedback({
        type: "success",
        message: "Perfect! Correct spelling.",
      });
      speak("Perfect!");
    } else {
      setWriteFeedback({ type: "error", message: "Try again." });
      speak("Not quite.");
    }
  };

  const startListening = () => {
    if (!activeWord) return;

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
      }, 10000); // 10 seconds for phonics
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

      resetTimer();
      const result = (finalTranscript || interimTranscript)
        .trim()
        .toLowerCase();
      setTranscript(result);

      if (!result) return;

      const normalize = (s: string) =>
        s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const normResult = normalize(result);
      const targetWord = normalize(activeWord);

      if (normResult.includes(targetWord)) {
        setSpeakFeedback({ type: "success", message: "Perfect! You got it." });
        recognition.stop();
        speak("Perfect!");
      } else {
        setSpeakFeedback({
          type: "error",
          message: `Try saying: "${activeWord}"`,
        });
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight capitalize">
            {type.replace("-", " ")}
          </h1>
          <p className="text-neutral-400 mt-1 text-sm sm:text-base">
            {type === "magic-e"
              ? "Learn how the 'silent E' changes vowel sounds."
              : "Master words with letters that are written but not spoken."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Grid/List */}
        <div className="lg:col-span-2 bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 shadow-lg max-h-[700px] overflow-y-auto custom-scrollbar">
          {type === "magic-e" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MAGIC_E_DATA.map((pair, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <button
                    onClick={() => handleWordClick(pair.short)}
                    className={`p-3 rounded-xl border transition-all text-center relative ${
                      activeWord === pair.short
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-bold block opacity-50 uppercase mb-1">
                      {pair.shortAr}
                    </span>
                    <span
                      className={`text-xl font-bold transition-all duration-300 ${activeWord === pair.short && !showPracticeWord ? "blur-xl opacity-0" : "blur-none opacity-100"}`}
                    >
                      {pair.short}
                    </span>
                  </button>
                  <button
                    onClick={() => handleWordClick(pair.long)}
                    className={`p-3 rounded-xl border transition-all text-center relative ${
                      activeWord === pair.long
                        ? "bg-amber-600 border-amber-400 text-white shadow-lg"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-bold block opacity-50 uppercase mb-1">
                      {pair.longAr}
                    </span>
                    <span
                      className={`text-xl font-bold transition-all duration-300 ${activeWord === pair.long && !showPracticeWord ? "blur-xl opacity-0" : "blur-none opacity-100"}`}
                    >
                      {pair.long}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(SILENT_LETTERS_DATA).map(([letter, words]) => (
                <div key={letter} className="space-y-3">
                  <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                    <Ghost size={18} /> Silent {letter}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {words.map((item) => (
                      <button
                        key={item.word}
                        onClick={() => handleWordClick(item.word)}
                        className={`px-4 py-2 rounded-xl border transition-all relative ${
                          activeWord === item.word
                            ? "bg-rose-600 border-rose-400 text-white shadow-lg"
                            : "bg-[#2a2a2a] border-white/5 text-neutral-300 hover:bg-[#333]"
                        }`}
                      >
                        <span
                          className={`transition-all duration-300 ${activeWord === item.word && !showPracticeWord ? "blur-xl opacity-0" : "blur-none opacity-100"}`}
                        >
                          {item.word}
                        </span>
                        <span className="text-[10px] text-neutral-500 block mt-1 font-medium">
                          {item.arabic}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Practice Sidebar */}
        <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-6">
          {/* Writing Practice */}
          <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-3xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-amber-400 font-semibold text-sm sm:text-base">
                <PenLine size={20} /> Writing Practice
              </div>
              {activeWord && (
                <button
                  onClick={() => setShowPracticeWord(!showPracticeWord)}
                  className="p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white transition-colors"
                >
                  {showPracticeWord ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>

            {activeWord ? (
              <div className="space-y-4">
                <div className="text-center py-4 border-b border-white/5 mb-4 relative min-h-[60px] flex items-center justify-center">
                  <span
                    className={`text-4xl font-black text-white transition-all duration-300 ${!showPracticeWord ? "blur-xl opacity-0 scale-90" : "blur-none opacity-100 scale-100"}`}
                  >
                    {activeWord}
                  </span>
                  {!showPracticeWord && (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm animate-pulse font-medium">
                      Memory Mode Active
                    </div>
                  )}
                </div>

                <p className="text-neutral-400 text-sm">
                  Type the word from memory:
                </p>
                <input
                  type="text"
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Type here..."
                  className="w-full bg-[#141414] rounded-xl p-4 text-white border border-white/5 focus:border-amber-500/50 outline-none transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleCheckAnswer()}
                />

                {writeFeedback && (
                  <div
                    className={`text-sm font-medium ${writeFeedback.type === "success" ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {writeFeedback.message}
                  </div>
                )}

                <button
                  onClick={handleCheckAnswer}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/10"
                >
                  Check Spelling
                </button>
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-10">
                Select a word to start writing
              </p>
            )}
          </div>

          {/* Speaking Practice */}
          <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 sm:gap-3 text-rose-400 mb-4 sm:mb-6 font-semibold text-sm sm:text-base">
              <Mic size={20} /> Speaking Practice
            </div>

            {activeWord ? (
              <div className="flex-1 flex flex-col justify-between text-center">
                <div>
                  <div className="text-4xl font-black text-white py-4">
                    {activeWord}
                  </div>

                  {transcript && (
                    <div className="bg-white/5 px-4 py-2 rounded-lg truncate max-w-full mb-4">
                      <span className="text-neutral-400 text-xs uppercase font-bold mr-2">
                        Heard:
                      </span>
                      <span className="text-white font-medium italic">
                        "{transcript}"
                      </span>
                    </div>
                  )}

                  {speakFeedback && (
                    <div
                      className={`font-medium mb-4 ${speakFeedback.type === "success" ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {speakFeedback.message}
                    </div>
                  )}
                </div>

                <button
                  onClick={startListening}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isListening ? "bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500" : "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600"}`}
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
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-neutral-500">
                  Select a word to start speaking
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
