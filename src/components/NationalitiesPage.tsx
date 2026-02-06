import { useState } from "react";
import { Globe, Languages, MessageSquare, Volume2 } from "lucide-react";

const LANGUAGES_DATA = [
  { text: "Arabic", translation: "العربية" },
  { text: "English", translation: "الإنجليزية" },
  { text: "French", translation: "الفرنسية" },
  { text: "Italian", translation: "الإيطالية" },
  { text: "Spanish", translation: "الأسبانية" },
  { text: "Portuguese", translation: "البرتغالية" },
  { text: "German", translation: "الألمانية" },
  { text: "Chinese", translation: "الصينية" },
  { text: "Russian", translation: "الروسية" },
  { text: "Japanese", translation: "اليابانية" },
  { text: "Greek", translation: "اليونانية" },
  { text: "Swahili", translation: "السواحيلي" },
  { text: "Bengali", translation: "البنغالية" },
  { text: "Czech", translation: "التشيكية" },
  { text: "Danish", translation: "الدنماركية" },
  { text: "Dutch", translation: "الهولندية" },
  { text: "Hindi", translation: "الهندية" },
  { text: "Scottish", translation: "الإسكتلندية" },
  { text: "Filipino", translation: "الفلبينية" },
  { text: "Swedish", translation: "السويدية" },
];

const PHRASES_DATA = [
  {
    question: "What is your country?",
    translation: "ما هو بلدك؟",
    answers: [
      { text: "My country is Egypt.", translation: "بلدي هو مصر." },
      { text: "I am from Egypt.", translation: "أنا من مصر." },
    ],
  },
  {
    question: "What is your language?",
    translation: "ما هي لغتك؟",
    answers: [
      { text: "My language is Arabic.", translation: "لغتي هي العربية." },
      { text: "I speak Arabic.", translation: "أنا أتحدث العربية." },
    ],
  },
  {
    question: "What is your nationality?",
    translation: "ما هي جنسيتك؟",
    answers: [{ text: "I am Egyptian.", translation: "أنا مصري." }],
  },
  {
    question: "What does enormous mean?",
    translation: "ماذا تعني كلمة enormous؟",
    answers: [
      {
        text: "Enormous means something is very big.",
        translation: "Enormous تعني شيئاً كبيراً جداً.",
      },
    ],
  },
];

export function NationalitiesPage() {
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
          <Globe className="text-emerald-400" /> Languages & Countries
        </h1>
        <p className="text-neutral-400 mt-2">
          Learn about languages, countries, and nationalities.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Languages className="text-blue-400" /> Languages (اللغات)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {LANGUAGES_DATA.map((lang) => (
            <button
              key={lang.text}
              onClick={() => speak(lang.text)}
              className={`p-6 rounded-3xl border transition-all text-center group ${
                playingItem === lang.text
                  ? "bg-blue-600 border-blue-400 shadow-lg scale-105"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/10"
              }`}
            >
              <div
                className={`text-xl font-bold transition-colors ${playingItem === lang.text ? "text-white" : "text-blue-400"}`}
              >
                {lang.text}
              </div>
              <div
                className={`text-xs font-arabic mt-1 ${playingItem === lang.text ? "text-white/70" : "text-neutral-500"}`}
              >
                {lang.translation}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-amber-400" /> Essential Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHRASES_DATA.map((phrase, idx) => (
            <div
              key={idx}
              className="bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden flex flex-col"
            >
              <button
                onClick={() => speak(phrase.question)}
                className="p-6 bg-white/5 border-b border-white/5 text-left group hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                    Q: {phrase.question}
                  </span>
                  <Volume2
                    size={18}
                    className="text-neutral-600 group-hover:text-amber-400 transition-all"
                  />
                </div>
                <div className="text-sm text-neutral-500 font-arabic">
                  {phrase.translation}
                </div>
              </button>
              <div className="p-4 space-y-3">
                {phrase.answers.map((ans, ansIdx) => (
                  <button
                    key={ansIdx}
                    onClick={() => speak(ans.text)}
                    className="w-full text-left p-4 rounded-2xl bg-black/20 hover:bg-black/40 border border-white/5 transition-all group"
                  >
                    <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                      A: {ans.text}
                    </div>
                    <div className="text-xs text-neutral-500 font-arabic mt-1">
                      {ans.translation}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Egyptian Pride Section */}
      <div className="bg-linear-to-r from-red-900/20 via-white/5 to-black/20 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center space-y-4">
        <div className="text-4xl">🇪🇬</div>
        <h3 className="text-2xl font-black text-white">Egypt (مصر)</h3>
        <p className="text-neutral-400 max-w-lg">
          Egypt is my country. I am Egyptian and my language is Arabic.
          <br />
          <span className="font-arabic text-emerald-400 mt-2 block">
            مصر هي بلدي. أنا مصري ولغتي هي العربية.
          </span>
        </p>
      </div>
    </div>
  );
}
