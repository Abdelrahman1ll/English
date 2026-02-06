import { useState } from "react";
import {
  Volume2,
  User,
  Ruler,
  Calendar,
  Star,
  Smile,
  Dumbbell,
  Scissors,
  Search,
} from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

type DescribingItem = {
  text: string;
  translation?: string;
  note?: string;
};

type DescribingCategory = {
  title: string;
  icon: any;
  items: DescribingItem[];
};

const DESCRIBING_SENTENCES: DescribingItem[] = [
  {
    text: "He's the most handsome man I've ever met.",
    translation: "إنه أكثر رجل وسيم قابلته على الإطلاق",
  },
  {
    text: "That's a cute little baby.",
    translation: "هذا طفل صغير جذاب",
  },
  {
    text: "She was looking pale and thin.",
    translation: "كانت تبدو شاحبة ونحيفة",
  },
  {
    text: "He's a tall man.",
    translation: "إنه رجل طويل",
  },
  {
    text: "What about your big muscular trainer?",
    translation: "ماذا عن مدربك ذو العضلات؟",
  },
  {
    text: "He is a very short man.",
    translation: "إنه رجل قصير جداً",
  },
  {
    text: "You see that short-haired boy over there.",
    translation: "أتري هذا الفتى ذو الشعر القصير هناك",
  },
  {
    text: "I was talking about the long-haired man.",
    translation: "كنت أتحدث عن الرجل ذو الشعر الطويل",
  },
  {
    text: "The bald man is the owner of the house.",
    translation: "الرجل الأصلع هو صاحب المنزل",
  },
];

const VOCABULARY_DATA: DescribingCategory[] = [
  {
    title: "General Looks",
    icon: Smile,
    items: [
      { text: "Good-looking", translation: "حسن المظهر" },
      { text: "Handsome", translation: "وسيم" },
      { text: "Ugly", translation: "قبيح" },
      { text: "Cute", translation: "جذاب" },
      { text: "Attractive", translation: "جذاب" },
      { text: "Pretty", translation: "جميل" },
      { text: "Well-dressed", translation: "أنيق" },
    ],
  },
  {
    title: "Body Build",
    icon: Dumbbell,
    items: [
      { text: "Obese", translation: "بدين (وزن زائد)" },
      { text: "Overweight", translation: "سمين" },
      { text: "Well-built", translation: "قوي الجسم" },
      { text: "Fat", translation: "بدين" },
    ],
  },
  {
    title: "Height",
    icon: Ruler,
    items: [
      { text: "Tall", translation: "طويل" },
      { text: "Short", translation: "قصير" },
      { text: "Medium height", translation: "متوسط القامة" },
    ],
  },
  {
    title: "Age",
    icon: Calendar,
    items: [
      { text: "Old", translation: "كبير السن" },
      { text: "Young", translation: "صغير السن / يافع" },
      { text: "Middle-aged", translation: "في منتصف العمر" },
    ],
  },
  {
    title: "Hair & Face",
    icon: Scissors,
    items: [
      { text: "Bald-headed", translation: "أصلع الرأس" },
      { text: "Beard", translation: "لحية" },
      { text: "Moustache", translation: "شارب" },
      { text: "Long hair", translation: "شعر طويل" },
    ],
  },
];

const CHARACTER_SENTENCES: DescribingItem[] = [
  {
    text: "Brave Policeman Arrests Drug Tycoon.",
    translation: "شرطي شجاع يعتقل تاجر المخدرات",
  },
  {
    text: "You have a chatty doorman.",
    translation: "لديكم بواب ثرثار (كثير الكلام)",
  },
  {
    text: "Adnan is a very clever student. He always gets top scores.",
    translation: "عدنان طالب ماهر جداً. دائماً يحصل على أعلى الدرجات",
  },
  {
    text: "Ahmed is a bit of a coward. He really hates going to the dentist!",
    translation: "أحمد جبان نوعاً ما. هو حقاً يكره الذهاب إلى طبيب الأسنان!",
  },
  {
    text: "The people in my office are friendly! I love working there!",
    translation: "الناس في مكتبي ودودون! أنا أحب العمل هناك!",
  },
  {
    text: "Adnan is a funny person! He always entertains me with jokes!",
    translation: "عدنان شخص مضحك! دائماً يمتعني بالنكات!",
  },
  {
    text: "My parents are very generous.",
    translation: "والداي كرماء جداً",
  },
  {
    text: "My boss is grumpy.",
    translation: "مديري حاد الطبع (نكد)",
  },
  {
    text: "Mahmoud is very honest. He always tells me the truth.",
    translation: "محمود صادق جداً. دائماً يقول لي الحقيقة",
  },
  {
    text: "My father is a kind man.",
    translation: "والدي رجل طيب",
  },
  {
    text: "Sara is loud! When she talks.",
    translation: "سارة صوتها عالٍ (مزعجة) عندما تتحدث",
  },
  {
    text: "Ali is very stingy. He spends a little on his children.",
    translation: "علي بخيل جداً. ينفق القليل على أولاده",
  },
  {
    text: "Mona is very moody. Now she says hello; yesterday she ignored me!",
    translation: "منى مزاجية جداً. الآن تقول مرحباً، وبالأمس تجاهلتني!",
  },
  {
    text: "I don't like nasty people.",
    translation: "أنا لا أحب الناس السيئة",
  },
  {
    text: "My daughter is very neat and organized.",
    translation: "ابنتي مرتبة ومنظمة جداً",
  },
  {
    text: "My son is a very polite boy.",
    translation: "ابني فتى مهذب للغاية",
  },
  {
    text: "She is a quiet girl.",
    translation: "إنها فتاة هادئة",
  },
  {
    text: "Ayman is a rude boy. He doesn't respect the adults.",
    translation: "أيمن فتى غير مهذب. إنه لا يحترم الكبار",
  },
];

export function DescribingPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <User className="text-pink-400" size={32} /> Describing People
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Master the art of describing appearances and personalities.
        </p>
      </div>

      {/* Appearances Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400">
            <Smile size={24} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Physical Appearances
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DESCRIBING_SENTENCES.map((item) => (
            <button
              key={item.text}
              onClick={() => handleCardClick(item.text)}
              className={`text-left p-5 sm:p-6 rounded-3xl border transition-all group relative overflow-hidden ${
                playingItem === item.text
                  ? "bg-pink-500/10 border-pink-500/50 scale-[1.01] shadow-xl z-10"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
              }`}
            >
              <div
                className={`text-xl font-bold mb-2 transition-colors ${playingItem === item.text ? "text-pink-400" : "text-white"}`}
              >
                "{item.text}"
              </div>
              <div
                className={`font-arabic text-lg ${playingItem === item.text ? "text-white/80" : "text-neutral-500"}`}
              >
                {item.translation}
              </div>
              <div
                className={`mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${playingItem === item.text ? "text-pink-400 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
              >
                <Volume2 size={14} /> Practice
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Character Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-yellow-500/20 rounded-xl text-yellow-400">
            <Star size={24} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Character & Personality
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHARACTER_SENTENCES.map((item) => (
            <button
              key={item.text}
              onClick={() => handleCardClick(item.text)}
              className={`text-left p-5 sm:p-6 rounded-3xl border transition-all group relative overflow-hidden ${
                playingItem === item.text
                  ? "bg-yellow-500/10 border-yellow-500/50 scale-[1.01] shadow-xl z-10"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
              }`}
            >
              <div
                className={`text-xl font-bold mb-2 transition-colors ${playingItem === item.text ? "text-yellow-400" : "text-white"}`}
              >
                "{item.text}"
              </div>
              <div
                className={`font-arabic text-lg ${playingItem === item.text ? "text-white/80" : "text-neutral-500"}`}
              >
                {item.translation}
              </div>
              <div
                className={`mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${playingItem === item.text ? "text-yellow-400 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
              >
                <Volume2 size={14} /> Practice
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Vocabulary Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
            <Search size={24} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Vocabulary Essentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOCABULARY_DATA.map((category) => (
            <div
              key={category.title}
              className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl"
            >
              <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-4">
                <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-400 shadow-inner">
                  <category.icon size={20} />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {category.title}
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {category.items.map((item) => (
                  <button
                    key={item.text}
                    onClick={() => handleCardClick(item.text)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group ${
                      playingItem === item.text
                        ? "bg-pink-500/10 border-pink-500/50 text-pink-400 scale-[1.02] shadow-lg z-10"
                        : "bg-transparent border-transparent hover:bg-white/5 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{item.text}</span>
                      <span
                        className={`text-sm font-arabic ${playingItem === item.text ? "text-white/80" : "text-neutral-500"}`}
                      >
                        {item.translation}
                      </span>
                    </div>
                    <Volume2
                      size={16}
                      className={`transition-all ${playingItem === item.text ? "text-pink-400 opacity-100 scale-125" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-yellow-500 to-blue-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any phrase or word to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
