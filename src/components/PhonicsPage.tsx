import { useState, useEffect } from "react";
import { Ghost } from "lucide-react";
import { usePractice } from "../context/PracticeContext";

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

export function PhonicsPage({ type }: { type: "magic-e" | "silent-letters" }) {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();

  // Stop synthesis when switching type
  useEffect(() => {
    setActiveWord(null);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }, [type]);

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
    setActiveWord(word);
    speak(word);
    setPracticeWord(word);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
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

      <div className="space-y-8">
        {/* Main Grid/List */}
        <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
          {type === "magic-e" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {MAGIC_E_DATA.map((pair, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <button
                    onClick={() => handleWordClick(pair.short)}
                    className={`p-3 rounded-xl border transition-all text-center relative ${
                      activeWord === pair.short
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg scale-105 z-10"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-bold block opacity-50 uppercase mb-1">
                      {pair.shortAr}
                    </span>
                    <span className="text-xl font-bold">{pair.short}</span>
                  </button>
                  <button
                    onClick={() => handleWordClick(pair.long)}
                    className={`p-3 rounded-xl border transition-all text-center relative ${
                      activeWord === pair.long
                        ? "bg-amber-600 border-amber-400 text-white shadow-lg scale-105 z-10"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-bold block opacity-50 uppercase mb-1">
                      {pair.longAr}
                    </span>
                    <span className="text-xl font-bold">{pair.long}</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(SILENT_LETTERS_DATA).map(([letter, words]) => (
                <div key={letter} className="space-y-4">
                  <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2 uppercase tracking-widest">
                    <Ghost size={18} /> Silent {letter}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {words.map((item) => (
                      <button
                        key={item.word}
                        onClick={() => handleWordClick(item.word)}
                        className={`px-6 py-3 rounded-xl border transition-all relative ${
                          activeWord === item.word
                            ? "bg-rose-600 border-rose-400 text-white shadow-lg scale-105 z-10"
                            : "bg-[#2a2a2a] border-white/5 text-neutral-300 hover:bg-[#333]"
                        }`}
                      >
                        <span className="text-lg font-bold">{item.word}</span>
                        <span className="text-[10px] text-neutral-500 block mt-1 font-medium italic">
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

        {/* Instruction Card */}
        <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Practice Mode</h3>
          <p className="text-neutral-400 max-w-md mx-auto">
            Click on any word, then use the floating menu on the right to
            practice **Writing** or **Speaking**.
          </p>
        </div>
      </div>
    </div>
  );
}
