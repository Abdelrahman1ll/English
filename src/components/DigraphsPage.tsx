import { useState } from "react";
import { Volume2, Split } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

type DigraphData = {
  digraph: string;
  examples: { text: string; translation: string }[];
};

const CONSONANT_DIGRAPHS: DigraphData[] = [
  {
    digraph: "ch",
    examples: [
      { text: "chair", translation: "كرسي" },
      { text: "chore", translation: "عمل روتيني" },
      { text: "each", translation: "كل" },
      { text: "much", translation: "كثير" },
    ],
  },
  {
    digraph: "ck",
    examples: [
      { text: "back", translation: "ظهر" },
      { text: "duck", translation: "بطة" },
      { text: "neck", translation: "رقبة" },
      { text: "rock", translation: "صخرة" },
    ],
  },
  {
    digraph: "gh",
    examples: [
      { text: "cough", translation: "سعال" },
      { text: "laugh", translation: "ضحك" },
      { text: "rough", translation: "خشن" },
      { text: "tough", translation: "صعب/قوي" },
    ],
  },
  {
    digraph: "kn",
    examples: [
      { text: "knee", translation: "ركبة" },
      { text: "knife", translation: "سكين" },
      { text: "knot", translation: "عقدة" },
      { text: "know", translation: "يعرف" },
    ],
  },
  {
    digraph: "ll",
    examples: [
      { text: "all", translation: "الكل" },
      { text: "ball", translation: "كرة" },
      { text: "fall", translation: "يسقط/خريف" },
      { text: "wall", translation: "جدار" },
    ],
  },
  {
    digraph: "ng",
    examples: [
      { text: "king", translation: "ملك" },
      { text: "ring", translation: "خاتم" },
      { text: "sing", translation: "يغني" },
      { text: "wing", translation: "جناح" },
    ],
  },
  {
    digraph: "ph",
    examples: [
      { text: "phone", translation: "هاتف" },
      { text: "photo", translation: "صورة" },
      { text: "graph", translation: "رسم بياني" },
      { text: "gopher", translation: "سنجاب الأرض" },
    ],
  },
  {
    digraph: "qu",
    examples: [
      { text: "quack", translation: "بطبطة" },
      { text: "queen", translation: "ملكة" },
      { text: "quiet", translation: "هادئ" },
      { text: "quiz", translation: "اختبار قصير" },
    ],
  },
  {
    digraph: "sh",
    examples: [
      { text: "dish", translation: "طبق" },
      { text: "fish", translation: "سمكة" },
      { text: "ship", translation: "سفينة" },
      { text: "shoe", translation: "حذاء" },
    ],
  },
  {
    digraph: "th",
    examples: [
      { text: "bath", translation: "حمّام" },
      { text: "both", translation: "كلاهما" },
      { text: "than", translation: "مِن" },
      { text: "thing", translation: "شيء" },
    ],
  },
  {
    digraph: "wh",
    examples: [
      { text: "whale", translation: "حوت" },
      { text: "what", translation: "ماذا" },
      { text: "when", translation: "متى" },
      { text: "white", translation: "أبيض" },
    ],
  },
  {
    digraph: "wr",
    examples: [
      { text: "wrap", translation: "يلف" },
      { text: "wrist", translation: "معصم" },
      { text: "write", translation: "يكتب" },
      { text: "wreath", translation: "إكليل" },
    ],
  },
];

const VOWEL_DIGRAPHS: DigraphData[] = [
  {
    digraph: "ai",
    examples: [
      { text: "main", translation: "رئيسي" },
      { text: "paint", translation: "طلاء" },
      { text: "rain", translation: "مطر" },
      { text: "train", translation: "قطار" },
    ],
  },
  {
    digraph: "ay",
    examples: [
      { text: "day", translation: "يوم" },
      { text: "play", translation: "يلعب" },
      { text: "stay", translation: "يبقى" },
      { text: "today", translation: "اليوم" },
    ],
  },
  {
    digraph: "ea",
    examples: [
      { text: "eat", translation: "يأكل" },
      { text: "read", translation: "يقرأ" },
      { text: "seat", translation: "مقعد" },
      { text: "team", translation: "فريق" },
    ],
  },
  {
    digraph: "ee",
    examples: [
      { text: "bee", translation: "نحلة" },
      { text: "free", translation: "حر" },
      { text: "see", translation: "يرى" },
      { text: "tree", translation: "شجرة" },
    ],
  },
  {
    digraph: "oa",
    examples: [
      { text: "boat", translation: "قارب" },
      { text: "coat", translation: "معطف" },
      { text: "road", translation: "طريق" },
      { text: "soap", translation: "صابون" },
    ],
  },
  {
    digraph: "ue",
    examples: [
      { text: "blue", translation: "أزرق" },
      { text: "clue", translation: "دليل" },
      { text: "glue", translation: "غراء" },
      { text: "true", translation: "حقيقي" },
    ],
  },
];

export function DigraphsPage() {
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">(
    "consonants",
  );
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleDigraphClick = (item: DigraphData) => {
    setPlayingItem(item.digraph);
    speak(item.digraph, () => setPlayingItem(null));
    setPracticeWord(item.digraph);
  };

  const handleExampleClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    setPlayingItem(word);
    speak(word, () => setPlayingItem(null));
    setPracticeWord(word);
  };

  const currentData =
    activeTab === "consonants" ? CONSONANT_DIGRAPHS : VOWEL_DIGRAPHS;

  const { activeWord } = usePractice();

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Split className="text-blue-400" /> Digraphs
          </h1>
          <p className="text-neutral-400 mt-2">
            Two letters making one unique sound.
          </p>
        </div>

        <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveTab("consonants")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "consonants"
                ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/5"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Consonants
          </button>
          <button
            onClick={() => setActiveTab("vowels")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
              activeTab === "vowels"
                ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg shadow-rose-500/5"
                : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            Vowels
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item) => (
          <div
            key={item.digraph}
            onClick={() => handleDigraphClick(item)}
            className={`group flex flex-col bg-[#1e1e1e] border rounded-3xl p-8 transition-all hover:bg-[#252525] cursor-pointer relative overflow-hidden ${
              activeWord === item.digraph
                ? "border-amber-500/50 bg-amber-500/10 shadow-xl shadow-amber-500/5 scale-105 z-10"
                : "border-white/5 shadow-lg"
            }`}
          >
            <div
              className={`text-5xl font-black mb-8 transition-all ${activeWord === item.digraph ? "text-amber-400 scale-110" : "text-white group-hover:text-amber-400"}`}
            >
              <div className="flex items-center justify-between w-full">
                {item.digraph}
                <Volume2
                  size={24}
                  className={`transition-all ${playingItem === item.digraph ? "text-amber-400 scale-125 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                />
              </div>
            </div>

            <div className="w-full space-y-2.5 relative z-10">
              {item.examples.map((ex) => (
                <button
                  key={ex.text}
                  onClick={(e) => handleExampleClick(e, ex.text)}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-between transition-all border ${
                    activeWord === ex.text
                      ? "bg-amber-500/20 border-amber-500/50 text-white scale-[1.05] shadow-lg z-20"
                      : "bg-black/40 text-neutral-300 border-transparent hover:bg-white/10 hover:border-white/5"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="capitalize">{ex.text}</span>
                    <span
                      className={`text-[10px] font-arabic leading-none mt-1 ${activeWord === ex.text ? "text-white/80" : "text-neutral-500"}`}
                    >
                      {ex.translation}
                    </span>
                  </div>
                  <Volume2
                    size={14}
                    className={`transition-all ${playingItem === ex.text ? "text-white scale-125 opacity-100" : activeWord === ex.text ? "text-white/60 opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                  />
                </button>
              ))}
            </div>

            <div
              className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${activeWord === item.digraph ? "text-amber-400 opacity-20" : ""}`}
            >
              <Split size={120} />
            </div>
          </div>
        ))}
      </div>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="font-bold text-white uppercase tracking-widest text-sm opacity-50">
          Practice Mode
        </h3>
        <p className="text-neutral-300 max-w-md mx-auto text-lg">
          Click on a digraph or any example word to practice **Writing** or
          **Speaking**.
        </p>
      </div>
    </div>
  );
}
