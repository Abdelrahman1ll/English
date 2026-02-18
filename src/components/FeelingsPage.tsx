import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Smile, Volume2, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function FeelingsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const rawFeelingsData = levelData?.vocabulary?.FEELINGS_DATA || [];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeelingsData = useMemo(() => {
    return rawFeelingsData
      .map((category: { category: string; items: any[] }) => ({
        ...category,
        items: category.items.filter(
          (item: any) =>
            item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.arabic.includes(searchQuery),
        ),
      }))
      .filter((category: { items: any[] }) => category.items.length > 0);
  }, [rawFeelingsData, searchQuery]);

  const FEELINGS_DATA = filteredFeelingsData;

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: any) => {
    speak(item.word, () => setPlayingItem(null));
    setPlayingItem(item.word);
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

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search feelings in English or Arabic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      <div className="space-y-16">
        {FEELINGS_DATA.map((category: { category: string; items: any[] }) => (
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
                    activeWord === item.word
                      ? "bg-pink-500/10 border-pink-500/50 scale-105 shadow-xl shadow-pink-500/20 z-10"
                      : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20 shadow-lg"
                  }`}
                >
                  <div className="flex justify-between items-start w-full mb-2">
                    <span
                      className={`text-xl font-black transition-colors ${activeWord === item.word ? "text-pink-400" : "text-white"}`}
                    >
                      {item.word}
                    </span>
                    <Volume2
                      size={18}
                      className={`transition-all ${playingItem === item.word ? "opacity-100 text-white scale-125" : activeWord === item.word ? "opacity-60 text-white" : "opacity-0 group-hover:opacity-100 text-neutral-400"}`}
                    />
                  </div>

                  <div className="flex justify-between items-end w-full">
                    <span
                      className={`text-sm font-arabic font-medium ${activeWord === item.word ? "text-white/90" : "text-neutral-400"}`}
                    >
                      {item.arabic}
                    </span>
                    {item.type && (
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${activeWord === item.word ? "bg-white/20 text-white" : "bg-black/40 text-neutral-500"}`}
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
