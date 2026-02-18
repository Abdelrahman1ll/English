import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Hash, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function NumbersPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawNumbersData = levelData?.vocabulary?.NUMBERS_DATA || {
    BASICS: [],
    TEENS: [],
    TENS: [],
    ORDINALS: [],
    BIG: [],
  };

  const filteredNumbersData = useMemo(() => {
    const term = searchQuery.toLowerCase();

    const filter = (items: any[]) =>
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
  }, [rawNumbersData, searchQuery]);

  const NUMBERS_DATA = filteredNumbersData;

  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: any) => {
    speak(item.word);
    setPracticeWord(item.word);
  };

  const NumberCard = ({ item }: { item: any }) => {
    const isActive = activeWord === item.word;

    return (
      <button
        onClick={() => handleCardClick(item)}
        className={`group flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
          isActive
            ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
        }`}
      >
        <div
          className={`text-4xl font-black mb-3 transition-colors ${isActive ? "text-blue-400" : "text-blue-400/80"}`}
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

        <div className="relative group w-full md:w-80 shrink-0">
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
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-blue-500 uppercase tracking-widest text-sm">
          Basics (0-10)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {NUMBERS_DATA.BASICS.map((item: any) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-purple-500 uppercase tracking-widest text-sm">
          The Teens (11-19)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {NUMBERS_DATA.TEENS.map((item: any) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-amber-500 uppercase tracking-widest text-sm">
          The Tens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {NUMBERS_DATA.TENS.map((item: any) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-rose-500 uppercase tracking-widest text-sm">
          Ordinal Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {NUMBERS_DATA.ORDINALS.map((item: any) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-emerald-500 uppercase tracking-widest text-sm">
          Big Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {NUMBERS_DATA.BIG.map((item: any) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Practice Mode</h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          Click on any number, then use the floating menu on the right to
          practice **Writing** or **Speaking** its name.
        </p>
      </div>
    </div>
  );
}
