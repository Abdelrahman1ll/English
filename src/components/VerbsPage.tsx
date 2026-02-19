import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Book, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData, VocabularyItem } from "../data/levels";

export function VerbsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    const rawData = (levelData?.vocabulary?.BASIC_VERBS as VocabularyItem[]) || [];
    const term = searchQuery.toLowerCase();

    return rawData.filter(
      (item: VocabularyItem) =>
        item.english?.toLowerCase().includes(term) ||
        item.arabic?.includes(searchQuery)
    );
  }, [levelData, searchQuery]);

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
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
          <Book className="text-emerald-400" size={32} /> Basic Verbs
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Master essential verbs for everyday communication.
        </p>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-emerald-600 to-teal-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search verbs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item: VocabularyItem) => (
          <button
            key={item.english}
            onClick={() => handleCardClick(item.english || "")}
            className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
              activeWord === item.english
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 scale-[1.02] shadow-lg z-10"
                : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
            }`}
          >
            <div className="flex flex-col">
              <span className="font-bold text-xl">{item.english}</span>
              <span
                className={`text-lg font-arabic ${activeWord === item.english ? "text-white/80" : "text-neutral-500"}`}
              >
                {item.arabic}
              </span>
            </div>
            <Volume2
              size={20}
              className={`transition-all ${playingItem === item.english ? "text-emerald-400 opacity-100 scale-125" : activeWord === item.english ? "text-emerald-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
