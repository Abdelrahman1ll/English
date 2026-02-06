import { useState } from "react";
import { Smile, Volume2 } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

type FeelingItem = {
  word: string;
  arabic: string;
  type?: "adj" | "noun" | "verb" | "noun/verb" | "adv" | "adj/verb";
};

const FEELINGS_DATA: { category: string; items: FeelingItem[] }[] = [
  {
    category: "Happiness & Positivity",
    items: [
      { word: "Happy", arabic: "سعيد", type: "adj" },
      { word: "Happiness", arabic: "سعادة", type: "noun" },
      { word: "Joy", arabic: "الفرح / السرور", type: "noun" },
      { word: "Glad", arabic: "مبوسط / مسرور", type: "adj" },
      { word: "Pleased", arabic: "مسرور", type: "adj" },
      { word: "Proud", arabic: "فخور", type: "adj" },
      { word: "Relief", arabic: "الارتياح", type: "noun" },
      { word: "Relieved", arabic: "ارتاح", type: "adj" },
      { word: "Smile", arabic: "يبتسم / ابتسامة", type: "noun/verb" },
      { word: "Laugh", arabic: "ضحك", type: "noun/verb" },
      { word: "Love", arabic: "يحب", type: "verb" },
      { word: "Eager", arabic: "متحمس جداً", type: "adj" },
      { word: "Eagerness", arabic: "التحمس الشديد", type: "noun" },
      { word: "Wonderful", arabic: "رائع", type: "adj" },
      { word: "Wonder", arabic: "يتعجب / العجب", type: "noun/verb" },
      { word: "Hope", arabic: "الأمل / يأمل", type: "noun/verb" },
      { word: "Honor", arabic: "الشرف / يكرم", type: "noun/verb" },
      { word: "Grateful", arabic: "ممتن", type: "adj" },
      { word: "Adore", arabic: "يعشق", type: "verb" },
      { word: "Enjoy", arabic: "يستمتع", type: "verb" },
      { word: "Cool", arabic: "رائع", type: "adj" },
    ],
  },
  {
    category: "Sadness & Regret",
    items: [
      { word: "Sad", arabic: "حزين", type: "adj" },
      { word: "Sadness", arabic: "الحزن", type: "noun" },
      { word: "Sadly", arabic: "للأسف", type: "adv" },
      { word: "Miserable", arabic: "بائس", type: "adj" },
      { word: "Unhappy", arabic: "غير سعيد", type: "adj" },
      { word: "Unhappiness", arabic: "التعاسة", type: "noun" },
      { word: "Broken-hearted", arabic: "مكسور القلب", type: "adj" },
      { word: "Shame", arabic: "عار", type: "noun" },
      { word: "Regret", arabic: "يندم / الندم", type: "noun/verb" },
      { word: "Pity", arabic: "يشفق على", type: "verb" },
      { word: "Sigh", arabic: "تنهد", type: "verb" },
      { word: "Weep", arabic: "يبكي بشدة", type: "verb" },
      { word: "Alone", arabic: "وحيد", type: "adj" },
      { word: "Cry", arabic: "يبكي", type: "verb" },
    ],
  },
  {
    category: "Fear & Worry",
    items: [
      { word: "Fearful", arabic: "خائف", type: "adj" },
      { word: "Frightened", arabic: "خائف / مرعوب", type: "adj" },
      { word: "Scared", arabic: "خائف", type: "adj" },
      { word: "Afraid", arabic: "خائف", type: "adj" },
      { word: "Horror", arabic: "رعب", type: "noun" },
      { word: "Horrify", arabic: "يرعب", type: "verb" },
      { word: "Terror", arabic: "الرعب", type: "noun" },
      { word: "Terrify", arabic: "يرعب", type: "verb" },
      { word: "Terrifying", arabic: "مرعب", type: "adj" },
      { word: "Terrified", arabic: "مرعوب", type: "adj" },
      { word: "Panic", arabic: "يهلع", type: "noun/verb" },
      { word: "Phobia", arabic: "فوبيا / رهاب", type: "noun" },
      { word: "Nervous", arabic: "عصبي", type: "adj" },
      { word: "Worry", arabic: "يقلق / القلق", type: "noun/verb" },
      { word: "Worried", arabic: "قلقان", type: "adj" },
    ],
  },
  {
    category: "Anger & Irritation",
    items: [
      { word: "Angry", arabic: "غاضب", type: "adj" },
      { word: "Angrily", arabic: "بغضب", type: "adv" },
      { word: "Annoy", arabic: "يضايق", type: "verb" },
      { word: "Annoyed", arabic: "متضايق", type: "adj" },
      { word: "Irritated", arabic: "منزعج / غاضب جداً", type: "adj" },
      { word: "Furious", arabic: "غاضب جداً", type: "adj" },
      { word: "Mad", arabic: "مجنون / غاضب", type: "adj" },
      { word: "Upset", arabic: "مستاء / يضايق", type: "adj/verb" },
      { word: "Aggression", arabic: "العنف", type: "noun" },
      { word: "Aggressive", arabic: "عنيف / عدواني", type: "adj" },
      { word: "Detest", arabic: "يكره", type: "verb" },
      { word: "Hate", arabic: "يكره", type: "verb" },
      { word: "Hatred", arabic: "كراهية", type: "noun" },
      { word: "Offend", arabic: "يسيء إلى", type: "verb" },
    ],
  },
  {
    category: "Mental & Physical States",
    items: [
      { word: "Tired", arabic: "متعب", type: "adj" },
      { word: "Exhausted", arabic: "منهك / مرهق جداً", type: "adj" },
      { word: "Exhausting", arabic: "متعب / مرهقة", type: "adj" },
      { word: "Hungry", arabic: "جائع", type: "adj" },
      { word: "Hunger", arabic: "الجوع", type: "noun" },
      { word: "Thirsty", arabic: "عطشان", type: "adj" },
      { word: "Thirst", arabic: "العطش", type: "noun" },
      { word: "Bored", arabic: "ملل / ممل", type: "adj" },
      { word: "Amazed", arabic: "مندهش", type: "adj" },
      { word: "Curious", arabic: "فضولي", type: "adj" },
      { word: "Disappointed", arabic: "محبط", type: "adj" },
      { word: "Moody", arabic: "متقلب المزاج", type: "adj" },
      { word: "Mood", arabic: "المزاج", type: "noun" },
      { word: "Stress", arabic: "الإجهاد", type: "noun" },
      { word: "Stressed", arabic: "مضغوط", type: "adj" },
      { word: "Routine", arabic: "الروتين", type: "noun" },
      { word: "Repetitive", arabic: "متكرر", type: "adj" },
      { word: "Adrenaline", arabic: "الأدرينالين", type: "noun" },
      { word: "Blush", arabic: "تحمر خجلاً", type: "verb" },
      { word: "Devour", arabic: "يأكل بنهم", type: "verb" },
    ],
  },
  {
    category: "Social & Personality",
    items: [
      { word: "Loyal", arabic: "وفي", type: "adj" },
      { word: "Loyalty", arabic: "الوفاء", type: "noun" },
      { word: "Greedy", arabic: "جشع / طماع", type: "adj" },
      { word: "Guilty", arabic: "مذنب", type: "adj" },
      { word: "Jealous", arabic: "غيور", type: "adj" },
      { word: "Jealousy", arabic: "الغيرة", type: "noun" },
      { word: "Shy", arabic: "خجول", type: "adj" },
      { word: "Secure", arabic: "آمن", type: "adj" },
      { word: "Security", arabic: "الأمن", type: "noun" },
      { word: "Self-esteem", arabic: "تقدير الذات", type: "noun" },
      { word: "Pessimist", arabic: "متشائم", type: "noun" },
      { word: "Pessimism", arabic: "التشاؤم", type: "noun" },
      { word: "Confession", arabic: "اعتراف", type: "noun" },
      { word: "Envy", arabic: "يحسد / الحسد", type: "noun/verb" },
    ],
  },
];

export function FeelingsPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: FeelingItem) => {
    setPlayingItem(item.word);
    speak(item.word, () => setPlayingItem(null));
    setPracticeWord(item.word);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Smile className="text-pink-400" /> Feelings & Emotions
        </h1>
        <p className="text-neutral-400 mt-2">
          Learn how to express your emotions and states of being.
        </p>
      </div>

      <div className="space-y-16">
        {FEELINGS_DATA.map((category) => (
          <div key={category.category} className="space-y-6">
            <h2 className="font-bold text-white/40 uppercase tracking-widest text-xs border-l-2 border-pink-500/50 pl-4 ml-2">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <button
                  key={`${item.word}-${item.type}`}
                  onClick={() => handleCardClick(item)}
                  className={`group flex flex-col p-6 rounded-3xl border transition-all text-left ${
                    playingItem === item.word
                      ? "bg-pink-500/10 border-pink-500/50 scale-105 shadow-xl shadow-pink-500/20 z-10"
                      : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20 shadow-lg"
                  }`}
                >
                  <div className="flex justify-between items-start w-full mb-2">
                    <span
                      className={`text-xl font-black transition-colors ${playingItem === item.word ? "text-pink-400" : "text-white"}`}
                    >
                      {item.word}
                    </span>
                    <Volume2
                      size={18}
                      className={`transition-opacity ${playingItem === item.word ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-neutral-400"}`}
                    />
                  </div>

                  <div className="flex justify-between items-end w-full">
                    <span
                      className={`text-sm font-arabic font-medium ${playingItem === item.word ? "text-white/90" : "text-neutral-400"}`}
                    >
                      {item.arabic}
                    </span>
                    {item.type && (
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${playingItem === item.word ? "bg-white/20 text-white" : "bg-black/40 text-neutral-500"}`}
                      >
                        {item.type}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Practice Mode</h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          Click on any word to hear it, then use the floating menu on the right
          to practice **Writing** or **Speaking**.
        </p>
      </div>
    </div>
  );
}
