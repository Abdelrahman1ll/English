import { useState, useRef, useEffect } from "react";
import { Mic, PenLine, Eye, EyeOff, Calendar, Clock } from "lucide-react";

// Data structures
const MONTHS_DATA = [
  { name: "January", arabic: "يناير" },
  { name: "February", arabic: "فبراير" },
  { name: "March", arabic: "مارس" },
  { name: "April", arabic: "أبريل" },
  { name: "May", arabic: "مايو" },
  { name: "June", arabic: "يونيو" },
  { name: "July", arabic: "يوليو" },
  { name: "August", arabic: "أغسطس" },
  { name: "September", arabic: "سبتمبر" },
  { name: "October", arabic: "أكتوبر" },
  { name: "November", arabic: "نوفمبر" },
  { name: "December", arabic: "ديسمبر" },
];

const DAYS_DATA = [
  {
    name: "Monday",
    arabic: "الاثنين",
    sentence: "Monday is the first day of the week.",
    sentenceTranslation: "الاثنين هو اليوم الأول من الأسبوع.",
  },
  {
    name: "Tuesday",
    arabic: "الثلاثاء",
    sentence: "Tuesday is the second day of the week.",
    sentenceTranslation: "الثلاثاء هو اليوم الثاني من الأسبوع.",
  },
  {
    name: "Wednesday",
    arabic: "الأربعاء",
    sentence: "Wednesday is the third day of the week.",
    sentenceTranslation: "الأربعاء هو اليوم الثالث من الأسبوع.",
  },
  {
    name: "Thursday",
    arabic: "الخميس",
    sentence: "Thursday is the fourth day of the week.",
    sentenceTranslation: "الخميس هو اليوم الرابع من الأسبوع.",
  },
  {
    name: "Friday",
    arabic: "الجمعة",
    sentence: "Friday is the fifth day of the week.",
    sentenceTranslation: "الجمعة هو اليوم الخامس من الأسبوع.",
  },
  {
    name: "Saturday",
    arabic: "السبت",
    sentence: "Saturday is the sixth day of the week.",
    sentenceTranslation: "السبت هو اليوم السادس من الأسبوع.",
  },
  {
    name: "Sunday",
    arabic: "الأحد",
    sentence: "Sunday is the seventh day of the week.",
    sentenceTranslation: "الأحد هو اليوم السابع من الأسبوع.",
  },
];

const TIME_VOCABULARY = [
  {
    category: "Periods of Time",
    items: [
      { text: "Morning", translation: "الصباح" },
      { text: "Noon", translation: "الظهر" },
      { text: "Afternoon", translation: "بعد الظهر" },
      { text: "Evening", translation: "المساء" },
      { text: "Night", translation: "الليل" },
      { text: "Midnight", translation: "منتصف الليل" },
      { text: "Midday", translation: "منتصف النهار" },
      { text: "Daylight", translation: "ضوء النهار" },
      { text: "Daytime", translation: "النهار" },
    ],
  },
  {
    category: "Duration & Frequency",
    items: [
      { text: "Hour", translation: "ساعة" },
      { text: "Half an hour", translation: "نصف ساعة" },
      { text: "Day-to-day", translation: "من يوم إلى آخر" },
      { text: "Fortnight", translation: "أسبوعين" },
      { text: "Decade", translation: "عقد (10 سنوات)" },
      { text: "Annual", translation: "سنوي" },
      { text: "Annually", translation: "سنوياً" },
      { text: "Daily", translation: "يومياً" },
      { text: "Hourly", translation: "كل ساعة" },
      { text: "Frequent", translation: "متكرر" },
      { text: "Continuously", translation: "باستمرار" },
    ],
  },
  {
    category: "Relative Time",
    items: [
      { text: "Ago", translation: "منذ / في الماضي" },
      { text: "Ahead of", translation: "سابق لـ" },
      { text: "Behind time", translation: "متأخر" },
      { text: "Early", translation: "في وقت مبكر" },
      { text: "Late", translation: "متأخر" },
      { text: "Future", translation: "المستقبل" },
      { text: "Recent", translation: "حديث / جديد" },
      { text: "Just", translation: "فقط / تماماً" },
      { text: "At the same time", translation: "في نفس الوقت" },
      { text: "In the end", translation: "في النهاية / أخيراً" },
      { text: "For the moment", translation: "في الوقت الحالي" },
    ],
  },
];

type Feedback = {
  type: "success" | "error" | "neutral";
  message: string;
} | null;

export function MonthsPage() {
  const [activeTab, setActiveTab] = useState<"months" | "days">("months");
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activeSentence, setActiveSentence] = useState<string | null>(null);
  const [userText, setUserText] = useState("");
  const [showPracticeWord, setShowPracticeWord] = useState(true);
  const [writeFeedback, setWriteFeedback] = useState<Feedback>(null);
  const [speakFeedback, setSpeakFeedback] = useState<Feedback>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stop synthesis when switching tabs
  useEffect(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setActiveWord(null);
    setActiveSentence(null);
  }, [activeTab]);

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
      setPlayingItem(text);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleWordClick = (word: string, sentence?: string) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setActiveWord(word);
    setActiveSentence(sentence || null);
    speak(sentence || word);
    setWriteFeedback(null);
    setSpeakFeedback(null);
    setUserText("");
    setTranscript("");
    setShowPracticeWord(true);
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
      }, 5000);
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
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Calendar className="text-blue-400" /> Months & Calendar
          </h1>
          <p className="text-neutral-400 mt-2">
            Months, Days, and Date vocabulary.
          </p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/5 pb-1">
        <button
          onClick={() => setActiveTab("months")}
          className={`px-6 py-3 font-bold rounded-t-xl transition-all relative top-px ${activeTab === "months" ? "bg-[#1e1e1e] text-white border-t border-x border-white/5" : "text-neutral-500 hover:text-neutral-300"}`}
        >
          Months Practice
        </button>
        <button
          onClick={() => setActiveTab("days")}
          className={`px-6 py-3 font-bold rounded-t-xl transition-all relative top-px ${activeTab === "days" ? "bg-[#1e1e1e] text-white border-t border-x border-white/5" : "text-neutral-500 hover:text-neutral-300"}`}
        >
          Days & Time
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Grid */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "months" && (
            <div className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 shadow-lg max-h-[700px] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MONTHS_DATA.map((month) => (
                  <button
                    key={month.name}
                    onClick={() => handleWordClick(month.name)}
                    className={`p-4 rounded-xl border transition-all text-center relative ${
                      activeWord === month.name
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold block ${activeWord === month.name && !showPracticeWord ? "blur-md" : ""}`}
                    >
                      {month.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-1 font-medium">
                      {month.arabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "days" && (
            <div className="space-y-8">
              {/* Days Practice */}
              <div className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 shadow-lg">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                  <Calendar className="text-purple-400" /> Days of the Week
                </h2>
                <div className="flex flex-col gap-3">
                  {DAYS_DATA.map((day) => (
                    <button
                      key={day.name}
                      onClick={() => handleWordClick(day.name, day.sentence)}
                      className={`p-4 rounded-xl border transition-all text-left relative flex items-center justify-between group ${
                        activeWord === day.name
                          ? "bg-purple-600 border-purple-400 text-white shadow-lg"
                          : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-xl font-bold block ${activeWord === day.name && !showPracticeWord ? "blur-md" : ""}`}
                        >
                          {day.name}
                        </span>
                        <span className="text-xs text-neutral-500 block mt-1 font-medium font-arabic">
                          {day.arabic}
                        </span>
                      </div>
                      {activeWord === day.name && (
                        <div className="text-right">
                          <div className="text-sm opacity-90 italic">
                            "{day.sentence}"
                          </div>
                          <div className="text-[10px] text-purple-300/70 font-arabic mt-1">
                            {day.sentenceTranslation}
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Vocabulary Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Clock className="text-amber-400" /> Time Vocabulary
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {TIME_VOCABULARY.map((category) => (
                    <div
                      key={category.category}
                      className="bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden flex flex-col"
                    >
                      <div className="p-5 bg-white/5 border-b border-white/5 flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white">
                          {category.category}
                        </h3>
                      </div>
                      <div className="p-4 flex flex-col gap-2">
                        {category.items.map((item) => (
                          <button
                            key={item.text}
                            onClick={() => speak(item.text)}
                            className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                              playingItem === item.text
                                ? "bg-amber-500/20 text-amber-300"
                                : "hover:bg-white/5 text-neutral-300 hover:text-white"
                            }`}
                          >
                            <span className="font-medium">{item.text}</span>
                            <span className="text-sm text-neutral-500 font-arabic group-hover:text-neutral-400">
                              {item.translation}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Practice Sidebar */}
        <div className="space-y-8 sticky top-6">
          {/* Writing Practice */}
          <div className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-amber-400 font-semibold">
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
                    className={`text-3xl font-black text-white transition-all duration-300 ${!showPracticeWord ? "blur-xl opacity-0 scale-90" : "blur-none opacity-100 scale-100"}`}
                  >
                    {activeWord}
                  </span>
                  {!showPracticeWord && (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm animate-pulse font-medium">
                      Memory Mode Active
                    </div>
                  )}
                </div>
                {activeSentence && (
                  <div className="text-center text-sm text-neutral-500 italic mb-4">
                    "{activeSentence}"
                  </div>
                )}

                <p className="text-neutral-400 text-sm">Type from memory:</p>
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
          <div className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col min-h-[300px]">
            <div className="flex items-center gap-3 text-rose-400 mb-6 font-semibold">
              <Mic size={20} /> Speaking Practice
            </div>

            {activeWord ? (
              <div className="flex-1 flex flex-col justify-between text-center">
                <div>
                  <div className="text-3xl font-black text-white py-4">
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
