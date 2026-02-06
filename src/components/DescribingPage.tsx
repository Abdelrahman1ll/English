import { useState } from "react";
import {
  User,
  Volume2,
  Search,
  Smile,
  Dumbbell,
  Scissors,
  Ruler,
  Calendar,
  Star,
} from "lucide-react";

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

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setPlayingItem(text);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <User className="text-pink-400" /> Describing People
        </h1>
        <p className="text-neutral-400 mt-2">
          Learn how to describe appearances and characteristics.
        </p>
      </div>

      {/* Appearances Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Volume2 className="text-emerald-400" /> Describing Appearances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DESCRIBING_SENTENCES.map((item) => (
            <button
              key={item.text}
              onClick={() => speak(item.text)}
              className={`text-left p-6 rounded-2xl border transition-all group ${
                playingItem === item.text
                  ? "bg-pink-600/20 border-pink-500/50"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/10"
              }`}
            >
              <div
                className={`text-lg font-semibold mb-2 ${playingItem === item.text ? "text-pink-400" : "text-white"}`}
              >
                {item.text}
              </div>
              <div className="text-neutral-400 font-arabic text-lg">
                {item.translation}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Character Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Star className="text-yellow-400" /> Character & Personality
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHARACTER_SENTENCES.map((item) => (
            <button
              key={item.text}
              onClick={() => speak(item.text)}
              className={`text-left p-6 rounded-2xl border transition-all group ${
                playingItem === item.text
                  ? "bg-yellow-600/20 border-yellow-500/50"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/10"
              }`}
            >
              <div
                className={`text-lg font-semibold mb-2 ${playingItem === item.text ? "text-yellow-400" : "text-white"}`}
              >
                {item.text}
              </div>
              <div className="text-neutral-400 font-arabic text-lg">
                {item.translation}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Vocabulary Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Search className="text-blue-400" /> Vocabulary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOCABULARY_DATA.map((category) => (
            <div
              key={category.title}
              className="bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-5 bg-white/5 border-b border-white/5 flex items-center gap-3">
                <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                  <category.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {category.items.map((item) => (
                  <button
                    key={item.text}
                    onClick={() => speak(item.text)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                      playingItem === item.text
                        ? "bg-pink-500/20 text-pink-300"
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
      </section>
    </div>
  );
}
