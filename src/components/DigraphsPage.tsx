import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Split, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function DigraphsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawDigraphsData = levelData?.vocabulary?.DIGRAPHS_DATA || {
    CONSONANTS: [],
    VOWELS: [],
  };

  const filteredDigraphsData = useMemo(() => {
    const term = searchQuery.toLowerCase();

    const filter = (items: any[]) =>
      items.filter(
        (item) =>
          item.digraph.toLowerCase().includes(term) ||
          item.examples.some(
            (ex: any) =>
              ex.text.toLowerCase().includes(term) ||
              ex.translation.includes(searchQuery),
          ),
      );

    return {
      CONSONANTS: filter(rawDigraphsData.CONSONANTS || []),
      VOWELS: filter(rawDigraphsData.VOWELS || []),
    };
  }, [rawDigraphsData, searchQuery]);

  const DIGRAPHS_DATA = filteredDigraphsData;

  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">(
    "consonants",
  );
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleDigraphClick = (item: any) => {
    speak(item.digraph, () => setPlayingItem(null));
    setPlayingItem(item.digraph);
    setPracticeWord(item.digraph);
  };

  const handleExampleClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    speak(word, () => setPlayingItem(null));
    setPlayingItem(word);
    setPracticeWord(word);
  };

  const currentData =
    activeTab === "consonants"
      ? DIGRAPHS_DATA.CONSONANTS
      : DIGRAPHS_DATA.VOWELS;

  const { activeWord } = usePractice();

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Split className="text-blue-400" /> Digraphs
          </h1>
          <p className="text-neutral-400 mt-2">
            Two letters making one unique sound.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group w-full sm:w-80">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search digraphs or examples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-xl"
              />
            </div>
          </div>

          <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner shrink-0">
            <button
              onClick={() => setActiveTab("consonants")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "consonants"
                  ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/5"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              Consonants
            </button>
            <button
              onClick={() => setActiveTab("vowels")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                activeTab === "vowels"
                  ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg shadow-rose-500/5"
                  : "border-transparent text-neutral-500 hover:text-white"
              }`}
            >
              Vowels
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item: any) => (
          <div
            key={item.digraph}
            onClick={() => handleDigraphClick(item)}
            className={`group flex flex-col bg-[#1e1e1e] border rounded-3xl p-8 transition-all hover:bg-[#252525] cursor-pointer relative overflow-hidden ${
              activeWord === item.digraph
                ? "border-amber-500/50 bg-amber-500/10 shadow-xl shadow-amber-500/5 scale-105 z-10"
                : "border-white/5 shadow-lg"
            }`}
          >
            <div
              className={`text-5xl font-black mb-8 transition-all ${activeWord === item.digraph ? "text-amber-400 scale-110" : "text-white group-hover:text-amber-400"}`}
            >
              <div className="flex items-center justify-between w-full">
                {item.digraph}
                <Volume2
                  size={24}
                  className={`transition-all ${playingItem === item.digraph ? "text-amber-400 scale-125 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                />
              </div>
            </div>

            <div className="w-full space-y-2.5 relative z-10">
              {item.examples.map((ex: any) => (
                <button
                  key={ex.text}
                  onClick={(e) => handleExampleClick(e, ex.text)}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-between transition-all border ${
                    activeWord === ex.text
                      ? "bg-amber-500/20 border-amber-500/50 text-white scale-[1.05] shadow-lg z-20"
                      : "bg-black/40 text-neutral-300 border-transparent hover:bg-white/10 hover:border-white/5"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="capitalize">{ex.text}</span>
                    <span
                      className={`text-[10px] font-arabic leading-none mt-1 ${activeWord === ex.text ? "text-white/80" : "text-neutral-500"}`}
                    >
                      {ex.translation}
                    </span>
                  </div>
                  <Volume2
                    size={14}
                    className={`transition-all ${playingItem === ex.text ? "text-white scale-125 opacity-100" : activeWord === ex.text ? "text-white/60 opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                  />
                </button>
              ))}
            </div>

            <div
              className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${activeWord === item.digraph ? "text-amber-400 opacity-20" : ""}`}
            >
              <Split size={120} />
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
          Click on a digraph or any example word to practice **Writing** or
          **Speaking**.
        </p>
      </div>
    </div>
  );
}
