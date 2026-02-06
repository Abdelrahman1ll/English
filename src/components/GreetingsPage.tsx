import { useState } from "react";
import {
  Hand,
  Sun,
  Sunrise,
  Volume2,
  HelpCircle,
  Clock,
  Zap,
  MapPin,
  MessageCircle,
  Heart,
  Activity,
  Briefcase,
  Users,
  Sparkles,
  Bell,
  LogOut,
  Moon,
  AlertCircle,
} from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

type GreetingItem = {
  text: string;
  translation?: string; // Optional Arabic translation if available/relevant
  note?: string; // Additional context
};

type GreetingCategory = {
  title: string;
  icon: any;
  items: GreetingItem[];
};

const GREETINGS_DATA: GreetingCategory[] = [
  {
    title: "Simple Greetings",
    icon: Hand,
    items: [
      { text: "Hi!", translation: "مرحبان" },
      { text: "Hello!", translation: "أهلا بك" },
      { text: "Hello there", translation: "أهلا" },
      { text: "Howdy!", note: "Casual" },
      { text: "Hey!", translation: "هاي" },
      { text: "Yo!", note: "Very Casual" },
    ],
  },
  {
    title: "General Inquiries",
    icon: Sun,
    items: [
      { text: "How are you?", translation: "كيف حالك ؟" },
      { text: "How's it going?", translation: "كيف الحال ؟ (عامية)" },
      { text: "How's it been?", translation: "كيف كان الحال ؟" },
      { text: "How is everything?", translation: "كيف هي الأمور ؟" },
      { text: "How've you been?", note: "Long time no see" },
      { text: "What's new?", translation: "ما الجديد ؟" },
      { text: "What's up?", translation: "ما أخبارك ؟ (عامية)" },
      { text: "What's happening?", note: "Casual" },
      { text: "What's going on?", note: "Casual" },
    ],
  },
  {
    title: "Time-Based",
    icon: Sunrise,
    items: [
      { text: "Good morning", translation: "صباح الخير" },
      { text: "Morning", note: "Short form" },
      { text: "Good afternoon", translation: "تحية وقت الظهيرة" },
      { text: "Good evening", translation: "تحية المساء" },
      { text: "Evening", note: "Short form" },
      { text: "How are you this bright morning?", note: "Poetic/Friendly" },
    ],
  },
  {
    title: "Asking how things are going",
    icon: HelpCircle,
    items: [
      { text: "How're things?", translation: "كيف الأحوال؟" },
      { text: "How're things with you?", translation: "كيف تسير الأمور معك؟" },
      {
        text: "How's it shaking?",
        translation: "كيف تسير الأمور؟",
        note: "Slang",
      },
      { text: "How's everything?", translation: "كيف كل شيء؟" },
      { text: "How's everything going?", translation: "كيف تسير كل الأمور؟" },
      { text: "How's it going?", translation: "كيف تسير الأمور؟" },
      { text: "How are you getting on?", translation: "كيف تبلي؟" },
      { text: "How are you getting along?", translation: "كيف تتدبر أمورك؟" },
      {
        text: "How's the world treating you?",
        translation: "كيف يعاملك العالم؟",
        note: "Idiom",
      },
    ],
  },
  {
    title: "Long Time No See",
    icon: Clock,
    items: [
      {
        text: "I haven't seen you in an age!",
        translation: "لم أراك منذ دهر!",
      },
      { text: "Long time no see.", translation: "لم أرك منذ فترة طويلة" },
      {
        text: "I haven't seen you in a month of Sundays!",
        note: "Idiom: A long time",
      },
    ],
  },
  {
    title: "Surprise / Unexpected",
    icon: Zap,
    items: [
      {
        text: "What a surprise to meet you!",
        translation: "يا لها من مفاجأة!",
      },
      { text: "Imagine meeting you here!", translation: "تخيل أن أقابلك هنا!" },
      { text: "Fancy meeting you here!", translation: "يا للصدفة!" },
      {
        text: "Never thought I'd see you here!",
        translation: "لم أتوقع رؤيتك هنا!",
      },
    ],
  },
  {
    title: "Context / Location",
    icon: MapPin,
    items: [
      {
        text: "What are you doing in this part of town?",
        translation: "ماذا تفعل في هذا الجزء من المدينة؟",
      },
      {
        text: "What are you doing in this neck of the woods?",
        note: "Idiom: Area/Location",
      },
      {
        text: "Shouldn't you be at school?",
        translation: "ألم يكن مفروضاً أن تكون بالمدرسة؟",
      },
      {
        text: "Shouldn't you be at work?",
        translation: "ألم يكن مفروضاً أن تكون بالعمل؟",
      },
      { text: "Have you been keeping busy?", translation: "هل كنت مشغولاً؟" },
    ],
  },
  {
    title: "Breaking the Ice",
    icon: MessageCircle,
    items: [
      { text: "Haven't we met before?", translation: "ألم نلتق من قبل؟" },
      {
        text: "I'm sorry, I've forgotten your name.",
        translation: "آسف، لقد نسيت اسمك.",
      },
      { text: "We have to stop meeting like this.", note: "Joke/Cliche" },
    ],
  },
  {
    title: "Health & Happiness (Positive)",
    icon: Heart,
    items: [
      { text: "I'm fine.", translation: "أنا بخير" },
      {
        text: "Fine and dandy.",
        translation: "بخير وعال العال",
        note: "Informal",
      },
      {
        text: "Couldn't be better.",
        translation: "لا يمكن أن أكون أفضل من ذلك",
      },
      { text: "Happy as a clam.", translation: "سعيد جداً", note: "Idiom" },
      { text: "Can't complain.", translation: "لا أشكوى عندي" },
      { text: "Great!", translation: "عظيم!" },
    ],
  },
  {
    title: "Status Updates (Busy / Neutral)",
    icon: Activity,
    items: [
      { text: "I've been busy.", translation: "لقد كنت مشغولاً" },
      { text: "Keeping busy.", translation: "مشغول دائماً" },
      { text: "Keeping out of trouble.", translation: "بعيد عن المشاكل" },
      { text: "Getting by.", translation: "ماشي الحال" },
      { text: "So-so.", translation: "عادي / نص نص" },
      { text: "Fair to middling.", translation: "متوسط / عادي", note: "Idiom" },
      { text: "Could be better.", translation: "يمكن أن يكون أفضل" },
    ],
  },
  {
    title: "Expressing Heavy Busyness",
    icon: Briefcase,
    items: [
      {
        text: "I'm swamped.",
        translation: "غارق في العمل",
        note: "Like a sinking boat",
      },
      { text: "Snowed under.", translation: "مدفون في العمل", note: "Idiom" },
      {
        text: "I don't have time to breathe.",
        translation: "ليس لدي وقت لأتنفس",
      },
      {
        text: "There aren't enough hours in the day.",
        translation: "اليوم لا يكفي",
      },
      {
        text: "Running around like a chicken with its head cut off.",
        translation: "أدور حول نفسي (مشغول جداً)",
        note: "Old/Cliche",
      },
    ],
  },
  {
    title: "Asking About Health & Family",
    icon: Users,
    items: [
      { text: "How is your family?", translation: "كيف حال عائلتك؟" },
      { text: "How are you doing today?", translation: "كيف حالك اليوم؟" },
      { text: "Are you doing OK?", translation: "هل أنت بخير؟" },
      { text: "How are you feeling?", translation: "كيف تشعر؟" },
      {
        text: "Are you feeling better today?",
        translation: "هل تشعر بتحسن اليوم؟",
      },
    ],
  },
  {
    title: "Starting Conversation (Informal)",
    icon: Sparkles,
    items: [
      { text: "Guess what?", translation: "خمن ماذا؟" },
      {
        text: "Have you heard the latest?",
        translation: "هل سمعت آخر الأخبار؟",
      },
      {
        text: "Did you get the scoop?",
        translation: "هل سمعت الخبر؟",
        note: "Scoop = News",
      },
      {
        text: "You'll never guess what I heard.",
        translation: "لن تخمن أبداً ما سمعته",
      },
      {
        text: "Get a load of this.",
        translation: "خذ عينة من هذا (انظر لهذا)",
        note: "Informal",
      },
      { text: "Dig this.", translation: "افهم هذا", note: "Slang" },
    ],
  },
  {
    title: "Getting Attention",
    icon: Bell,
    items: [
      { text: "Pardon me.", translation: "اعذرني / عفواً" },
      { text: "Excuse me.", translation: "عفواً / المعذرة" },
      { text: "Hey!", translation: "هاي!", note: "Informal" },
      { text: "Yo!", translation: "يو!", note: "Slang" },
      { text: "Listen up.", translation: "اسمعوا جيداً", note: "Informal" },
      { text: "Hear me out.", translation: "اسمعني للآخر" },
      { text: "Are you ready for this?", translation: "هل أنتم مستعدون لهذا؟" },
    ],
  },
  {
    title: "Ending Conversation Abruptly",
    icon: LogOut,
    items: [
      { text: "Oh, look at this time.", translation: "انظر للوقت" },
      { text: "I'm going to have to run.", translation: "يجب أن أعدو (أغادر)" },
      { text: "I'm all out of time.", translation: "نفد وقتي" },
      { text: "I really must go.", translation: "يجب حقاً أن أمضي" },
      {
        text: "It's been great talking to you, but...",
        translation: "كان التحدث إليك عظيماً، لكن...",
      },
      {
        text: "Wow! I'm late. Look, I'll call you.",
        translation: "أنا متأخر، سأتصل بك",
      },
      {
        text: "Sorry, but I have to leave now.",
        translation: "آسف، يجب أن أغادر الآن",
      },
      {
        text: "Let's continue this another time.",
        translation: "لنكمل هذا في وقت آخر",
      },
    ],
  },
  {
    title: "Good-byes",
    icon: Moon,
    items: [
      { text: "Good-bye.", translation: "وداعاً" },
      { text: "Bye.", translation: "وداعاً" },
      { text: "So long.", translation: "إلى اللقاء" },
      {
        text: "Ta-ta.",
        translation: "وداعاً (نانا)",
        note: "Informal/British",
      },
      { text: "Farewell.", translation: "الوداع", note: "Formal" },
      { text: "Cheerio.", translation: "وداعاً", note: "Informal/British" },
      { text: "Good night.", translation: "طابت ليلتك" },
      {
        text: "See you later alligator.",
        translation: "أراك لاحقاً",
        note: "Slang",
      },
      { text: "Catch you later.", translation: "أراك لاحقاً" },
      { text: "Let's get together soon.", translation: "دعنا نتقابل قريباً" },
    ],
  },
  {
    title: "Asking for Explanation",
    icon: HelpCircle,
    items: [
      { text: "What do you mean?", translation: "ماذا تعني؟" },
      { text: "What are you saying?", translation: "ماذا تقول؟" },
      {
        text: "What are you trying to get at?",
        translation: "ما الذي تحاول الوصول إليه؟",
      },
      {
        text: "What's the bottom line?",
        translation: "ما هي الخلاصة / الموضوع الرئيسي؟",
      },
      {
        text: "What does this all boil down to?",
        translation: "إلام يؤول كل هذا؟ (ما النتيجة؟)",
        note: "Idiom",
      },
      { text: "How so?", translation: "كيف ذلك؟" },
      { text: "What's the upshot?", translation: "ما الختام / النتيجة؟" },
    ],
  },
  {
    title: "Expressing Misunderstanding",
    icon: AlertCircle,
    items: [
      { text: "I didn't get that.", translation: "لم أفهم ذلك" },
      {
        text: "I don't see what you're getting at.",
        translation: "لا أرى ما ترمي إليه",
      },
      { text: "I don't get it.", translation: "لا أفهمها" },
      { text: "I don't follow you.", translation: "لا أتابعك (لم أفهم قصدك)" },
      {
        text: "I'm not sure I follow.",
        translation: "لست متأكداً أنني أتابعك",
      },
    ],
  },
  {
    title: "Clarifying Yourself",
    icon: MessageCircle,
    items: [
      { text: "That's not what I mean.", translation: "ليس هذا ما أعنيه" },
      { text: "I didn't mean that.", translation: "لم أعنِ ذلك" },
      { text: "I said no such thing.", translation: "لم أقل شيئاً كهذا" },
      {
        text: "I didn't mean to give you that impression.",
        translation: "لم أقصد أن أعطيك هذا الانطباع",
      },
      {
        text: "I didn't mean to imply that.",
        translation: "لم أقصد أن ألمح لذلك",
      },
    ],
  },
];

// (Import moved to top)

export function GreetingsPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: GreetingItem) => {
    setPlayingItem(item.text);
    speak(item.text, () => setPlayingItem(null));
    // Clean up punctuation for practice if needed, though PracticeWidget handles it
    setPracticeWord(item.text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Hand className="text-blue-400" /> Greetings
        </h1>
        <p className="text-neutral-400 mt-2">
          Master common phrases and greetings for every situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GREETINGS_DATA.map((category) => (
          <div
            key={category.title}
            className="flex flex-col bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
                <category.icon size={20} spellCheck />
              </div>
              <h2 className="text-xl font-bold text-white">{category.title}</h2>
            </div>

            <div className="p-4 flex flex-col gap-2">
              {category.items.map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleCardClick(item)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group ${
                    playingItem === item.text
                      ? "bg-blue-500/10 border-blue-500/50 scale-[1.02] shadow-xl shadow-blue-500/10 z-10"
                      : "bg-[#141414] border-transparent hover:bg-[#1a1a1a] hover:border-white/5"
                  }`}
                >
                  <div className="flex-1">
                    <div
                      className={`font-bold text-lg transition-colors ${playingItem === item.text ? "text-blue-400" : "text-neutral-200"}`}
                    >
                      {item.text}
                    </div>
                    {(item.translation || item.note) && (
                      <div
                        className={`text-sm mt-1 font-arabic ${playingItem === item.text ? "text-white/80" : "text-neutral-500"}`}
                      >
                        {item.translation}
                        {item.translation && item.note && " • "}
                        {item.note && (
                          <span className="italic">{item.note}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <Volume2
                    size={16}
                    className={`transition-all ${playingItem === item.text ? "text-blue-400 opacity-100 scale-110" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
              ))}
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
          Click on any phrase to hear it, then use the floating menu to practice
          **Writing** or **Speaking**.
        </p>
      </div>

      {/* Quote Section */}
      <div className="bg-linear-to-r from-blue-900/20 to-purple-900/20 border border-white/5 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-500 opacity-50" />
        <blockquote className="text-2xl md:text-3xl font-serif text-neutral-200 italic mb-8 leading-relaxed relative">
          <span className="absolute -left-4 -top-4 text-6xl text-white/5 font-serif">
            "
          </span>
          "You need to like the language you are learning to really want to
          speak it. Imagine yourself as a member of that language group."
          <span className="absolute -right-4 -bottom-4 text-6xl text-white/5 font-serif">
            "
          </span>
        </blockquote>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/20" />
            <cite className="text-white font-black not-italic text-xl tracking-tight uppercase">
              Steve Kaufmann
            </cite>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <div className="text-emerald-400 font-arabic text-xl tracking-wide dir-rtl bg-emerald-400/5 px-6 py-2 rounded-full border border-emerald-400/10">
            تحب اللغة اللي بتتعلمها عشان فعلاً تكون عايز تتكلمها. تخيل نفسك واحد
            من أهل اللغة دي.
          </div>
        </div>
      </div>
    </div>
  );
}
