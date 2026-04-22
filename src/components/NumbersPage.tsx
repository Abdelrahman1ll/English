import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Hash, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

interface NumberItem {
  digit: string | number;
  word: string;
  arabic?: string;
}

interface NumbersDataStructure {
  BASICS: NumberItem[];
  TEENS: NumberItem[];
  TENS: NumberItem[];
  ORDINALS: NumberItem[];
  BIG: NumberItem[];
}

interface NumberCardProps {
  item: NumberItem;
  isActive: boolean;
  onCardClick: (item: NumberItem) => void;
  index: number;
}

const NumberCard = ({ item, isActive, onCardClick, index }: NumberCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onCardClick(item)}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
      }`}
    >
      <div className="absolute -top-1.5 -left-1.5 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div
        className={`text-4xl font-black mb-3 transition-colors mt-2 ${isActive ? "text-blue-400" : "text-blue-400/80"}`}
      >
        {item.digit}
      </div>
      <div
        className={`flex flex-col items-center gap-1 text-sm font-bold ${isActive ? "text-white/90" : "text-neutral-400"}`}
      >
        <div className="flex items-center gap-2">
          <span>{item.word}</span>
          <Volume2
            size={14}
            className={`transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          />
        </div>
        {item.arabic && (
          <span className="text-xs opacity-50 font-arabic italic">
            {item.arabic}
          </span>
        )}
      </div>
    </button>
  );
};

export function NumbersPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const rawNumbersData = (levelData?.vocabulary
      ?.NUMBERS_DATA as NumbersDataStructure) || {
      BASICS: [],
      TEENS: [],
      TENS: [],
      ORDINALS: [],
      BIG: [],
    };

    const allItems = [
      ...rawNumbersData.BASICS.map((i) => ({ ...i, category: "Basics" })),
      ...rawNumbersData.TEENS.map((i) => ({ ...i, category: "Teens" })),
      ...rawNumbersData.TENS.map((i) => ({ ...i, category: "Tens" })),
      ...rawNumbersData.ORDINALS.map((i) => ({ ...i, category: "Ordinals" })),
      ...rawNumbersData.BIG.map((i) => ({ ...i, category: "Big Numbers" })),
    ];

    return allItems.map((item) => ({
      primary: item.word,
      secondary: item.arabic || item.digit.toString(),
      category: item.category,
    }));
  }, [levelData]);

  const filteredNumbersData = useMemo(() => {
    const rawNumbersData = (levelData?.vocabulary
      ?.NUMBERS_DATA as NumbersDataStructure) || {
      BASICS: [],
      TEENS: [],
      TENS: [],
      ORDINALS: [],
      BIG: [],
    };
    const term = searchQuery.toLowerCase();

    const filter = (items: NumberItem[]) =>
      items.filter(
        (item) =>
          item.word.toLowerCase().includes(term) ||
          (item.arabic && item.arabic.includes(searchQuery)) ||
          item.digit.toString().includes(term),
      );

    return {
      BASICS: filter(rawNumbersData.BASICS || []),
      TEENS: filter(rawNumbersData.TEENS || []),
      TENS: filter(rawNumbersData.TENS || []),
      ORDINALS: filter(rawNumbersData.ORDINALS || []),
      BIG: filter(rawNumbersData.BIG || []),
    };
  }, [levelData, searchQuery]);

  const NUMBERS_DATA = filteredNumbersData;

  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: NumberItem) => {
    speak(item.word);
    setPracticeWord(item.word);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Hash className="text-blue-400" /> Numbers
          </h1>
          <p className="text-neutral-400 mt-2">
            Count from zero to a million and master ordinals.
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button
          onClick={() => setIsStudyMode(false)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            !isStudyMode
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <LayoutGrid size={20} />
          <span className="font-bold">Grid View</span>
        </button>
        <button
          onClick={() => setIsStudyMode(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            isStudyMode
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Focus size={20} />
          <span className="font-bold">Study Mode</span>
        </button>
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          <div className="relative group max-w-2xl">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-4 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
              />
            </div>
          </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-blue-500 uppercase tracking-widest text-sm">
          Basics (0-10)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {NUMBERS_DATA.BASICS.map((item: NumberItem) => (
            <NumberCard
              key={item.digit}
              item={item}
              isActive={activeWord === item.word}
              onCardClick={handleCardClick}
              index={studyItems.findIndex(s => s.primary === item.word)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-purple-500 uppercase tracking-widest text-sm">
          The Teens (11-19)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {NUMBERS_DATA.TEENS.map((item: NumberItem) => (
            <NumberCard
              key={item.digit}
              item={item}
              isActive={activeWord === item.word}
              onCardClick={handleCardClick}
              index={studyItems.findIndex(s => s.primary === item.word)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-amber-500 uppercase tracking-widest text-sm">
          The Tens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {NUMBERS_DATA.TENS.map((item: NumberItem) => (
            <NumberCard
              key={item.digit}
              item={item}
              isActive={activeWord === item.word}
              onCardClick={handleCardClick}
              index={studyItems.findIndex(s => s.primary === item.word)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-rose-500 uppercase tracking-widest text-sm">
          Ordinal Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {NUMBERS_DATA.ORDINALS.map((item: NumberItem) => (
            <NumberCard
              key={item.digit}
              item={item}
              isActive={activeWord === item.word}
              onCardClick={handleCardClick}
              index={studyItems.findIndex(s => s.primary === item.word)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-emerald-500 uppercase tracking-widest text-sm">
          Big Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {NUMBERS_DATA.BIG.map((item) => (
            <NumberCard
              key={item.digit}
              item={item}
              isActive={activeWord === item.word}
              onCardClick={handleCardClick}
              index={studyItems.findIndex(s => s.primary === item.word)}
            />
          ))}
        </div>
      </div>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group mt-16">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any number or ordinal to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
        </>
      )}
    </div>
  );
}
