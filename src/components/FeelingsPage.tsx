import { useState } from "react";
import { Smile, Volume2 } from "lucide-react";

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
      { word: "Glad", arabic: "مبسوط / مسرور", type: "adj" },
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
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Smile className="text-pink-400" /> Feelings & Emotions
        </h1>
        <p className="text-neutral-400 mt-2">Express how you feel.</p>
      </div>

      <div className="space-y-12">
        {FEELINGS_DATA.map((category) => (
          <div key={category.category} className="space-y-6">
            <h2 className="text-xl font-bold text-white/40 uppercase tracking-widest px-2">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <button
                  key={`${item.word}-${item.type}`}
                  onClick={() => speak(item.word)}
                  className={`group flex flex-col p-5 rounded-2xl border transition-all text-left ${
                    playingItem === item.word
                      ? "bg-pink-600 border-pink-400 scale-105 shadow-lg"
                      : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start w-full mb-1">
                    <span
                      className={`text-xl font-bold ${playingItem === item.word ? "text-white" : "text-pink-400"}`}
                    >
                      {item.word}
                    </span>
                    <Volume2
                      size={16}
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
                      <span className="text-[10px] uppercase tracking-wider text-neutral-600 bg-black/20 px-2 py-0.5 rounded-full">
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
    </div>
  );
}
