import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, Volume2, Quote } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { Question } from "../data/levels";

interface BasicItem {
  word: string;
  arabic: string;
  example: string;
  exampleArabic: string;
}

interface BasicsData {
  ARTICLES: BasicItem[];
  PRONOUNS: BasicItem[];
  POSSESSIVES: BasicItem[];
  QUIZ: Question[];
}

export function BasicsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const BASICS_DATA = (levelData?.vocabulary?.BASICS_DATA as BasicsData) || {
    ARTICLES: [],
    PRONOUNS: [],
    POSSESSIVES: [],
    QUIZ: [],
  };

  const { setPracticeWord, activeWord } = usePractice();
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const { speak } = useSpeech();
  const lastSpeechId = useRef<number>(0);

  const handleItemClick = (item: BasicItem) => {
    setSpeakingItem(item.word);
    setPracticeWord(item.word);

    const currentId = Date.now();
    lastSpeechId.current = currentId;

    speak(item.word, () => {
      if (lastSpeechId.current === currentId) {
        setSpeakingItem(null);
      }
    });
  };

  const handleQuizOptionClick = (questionIndex: number, option: string) => {
    const isCorrect =
      option.toLowerCase() ===
      BASICS_DATA.QUIZ[questionIndex].answer.toLowerCase();

    if (isCorrect) {
      speak("Correct!");
    } else {
      speak("Try again.");
    }

    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const BasicCard = ({ item, color }: { item: BasicItem; color: string }) => {
    const isActive = activeWord === item.word;
    const isSpeaking = speakingItem === item.word;

    const colorClasses: Record<string, string> = {
      blue: "bg-blue-500/10 border-blue-500/50 shadow-blue-500/20 text-blue-400",
      emerald:
        "bg-emerald-500/10 border-emerald-500/50 shadow-emerald-500/20 text-emerald-400",
      purple:
        "bg-purple-500/10 border-purple-500/50 shadow-purple-500/20 text-purple-400",
    };

    return (
      <button
        onClick={() => handleItemClick(item)}
        className={`group flex flex-col p-6 rounded-3xl border transition-all text-left ${
          isActive
            ? `${colorClasses[color]} scale-[1.02] z-10 shadow-xl`
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div
            className={`text-2xl font-black ${isActive ? "" : "text-white"}`}
          >
            {item.word}
          </div>
          <Volume2
            size={18}
            className={`transition-all ${isSpeaking ? "animate-pulse" : isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40 text-neutral-400"}`}
          />
        </div>
        <div
          className={`text-lg font-arabic mb-4 ${isActive ? "text-white/80" : "text-neutral-500"}`}
        >
          {item.arabic}
        </div>
        <div className="mt-auto space-y-1">
          <div className="flex items-start gap-2 text-xs text-neutral-400 font-medium">
            <Quote size={10} className="mt-1 opacity-50 rotate-180" />
            <p className="leading-relaxed">{item.example}</p>
          </div>
          <div className="text-[10px] font-arabic text-neutral-600 pl-4">
            {item.exampleArabic}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Sparkles className="text-blue-400" /> Basics
        </h1>
        <p className="text-neutral-400 mt-2">
          Essential building blocks: Articles, Pronouns, and Possessives.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-blue-500 uppercase tracking-widest text-sm">
          Articles (أدوات التعريف والنكرة)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BASICS_DATA.ARTICLES.map((item: BasicItem) => (
            <BasicCard key={item.word} item={item} color="blue" />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-emerald-500 uppercase tracking-widest text-sm">
          Subject Pronouns (ضمائر الفاعل)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {BASICS_DATA.PRONOUNS.map((item: BasicItem) => (
            <BasicCard key={item.word} item={item} color="emerald" />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-purple-500 uppercase tracking-widest text-sm">
          Possessive Adjectives (صفات الملكية)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {BASICS_DATA.POSSESSIVES.map((item: BasicItem) => (
            <BasicCard key={item.word} item={item} color="purple" />
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="space-y-8 pt-10 border-t border-white/5">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <Sparkles size={24} className="text-amber-400" /> Quick Basics Quiz
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {BASICS_DATA.QUIZ.map((q: Question, idx: number) => {
            const isAnswered = quizAnswers[idx] !== undefined;
            const isCorrect =
              quizAnswers[idx]?.toLowerCase() === q.answer.toLowerCase();

            return (
              <div
                key={idx}
                className="bg-[#1e1e1e] p-6 rounded-4xl border border-white/5 shadow-md space-y-6"
              >
                <p className="text-xl text-white font-bold flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-sm text-neutral-500">
                    {idx + 1}
                  </span>
                  {q.question}
                </p>
                <div className="flex flex-wrap gap-3">
                  {q.options.map((option: string) => (
                    <button
                      key={option}
                      onClick={() => handleQuizOptionClick(idx, option)}
                      disabled={isAnswered && isCorrect}
                      className={`px-6 py-3 rounded-2xl font-black transition-all border-2 ${
                        quizAnswers[idx] === option
                          ? isCorrect
                            ? "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-500/20"
                            : "bg-rose-600 border-transparent text-white"
                          : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                      } ${isAnswered && option.toLowerCase() === q.answer.toLowerCase() ? "bg-emerald-600 border-transparent text-white" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-white italic">
          Start with the Basics
        </h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          These words are used in almost every English sentence. Practice them
          daily!
        </p>
      </div>
    </div>
  );
}
