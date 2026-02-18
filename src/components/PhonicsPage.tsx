import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Ghost, Search, Volume2 } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function PhonicsPage({ type }: { type: "magic-e" | "silent-letters" }) {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawPhonicsData = levelData?.vocabulary?.PHONICS_DATA || {
    MAGIC_E: [],
    SILENT_LETTERS: {},
  };

  const filteredPhonicsData = useMemo(() => {
    const term = searchQuery.toLowerCase();

    if (type === "magic-e") {
      return {
        ...rawPhonicsData,
        MAGIC_E: rawPhonicsData.MAGIC_E.filter(
          (pair: any) =>
            pair.short.toLowerCase().includes(term) ||
            pair.long.toLowerCase().includes(term) ||
            pair.shortAr.includes(searchQuery) ||
            pair.longAr.includes(searchQuery),
        ),
      };
    } else {
      const filteredSilent: any = {};
      Object.entries(rawPhonicsData.SILENT_LETTERS).forEach(
        ([letter, words]: [string, any]) => {
          const matchingWords = words.filter(
            (item: any) =>
              item.word.toLowerCase().includes(term) ||
              item.arabic.includes(searchQuery),
          );
          if (matchingWords.length > 0) {
            filteredSilent[letter] = matchingWords;
          }
        },
      );
      return {
        ...rawPhonicsData,
        SILENT_LETTERS: filteredSilent,
      };
    }
  }, [rawPhonicsData, searchQuery, type]);

  const PHONICS_DATA = filteredPhonicsData;

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();

  const { speak, cancel } = useSpeech();

  // Stop synthesis when switching type
  useEffect(() => {
    cancel();
  }, [type, cancel]);

  const handleWordClick = (word: string) => {
    speak(word, () => setPlayingItem(null));
    setPlayingItem(word);
    setPracticeWord(word);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight capitalize">
            {type.replace("-", " ")}
          </h1>
          <p className="text-neutral-400 mt-1 text-sm sm:text-base">
            {type === "magic-e"
              ? "Learn how the 'silent E' changes vowel sounds."
              : "Master words with letters that are written but not spoken."}
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
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-4 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main Grid/List */}
        <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
          {type === "magic-e" ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {PHONICS_DATA.MAGIC_E.map((pair: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-2">
                  <button
                    onClick={() => handleWordClick(pair.short)}
                    className={`p-3 rounded-xl border transition-all text-center relative ${
                      activeWord === pair.short
                        ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg scale-105 z-10"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-[10px] sm:text-sm font-bold block opacity-50 uppercase mb-1">
                      {pair.shortAr}
                    </span>
                    <span className="text-xl font-bold">{pair.short}</span>
                  </button>
                  <button
                    onClick={() => handleWordClick(pair.long)}
                    className={`p-3 rounded-xl border transition-all text-center relative ${
                      activeWord === pair.long
                        ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg scale-105 z-10"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-[10px] sm:text-sm font-bold block opacity-50 uppercase mb-1">
                      {pair.longAr}
                    </span>
                    <span className="text-xl font-bold">{pair.long}</span>
                    {playingItem === pair.long && (
                      <Volume2
                        size={12}
                        className="absolute top-1 right-1 animate-pulse text-amber-400"
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(PHONICS_DATA.SILENT_LETTERS).map(
                ([letter, words]: [string, any]) => (
                  <div key={letter} className="space-y-4">
                    <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2 uppercase tracking-widest">
                      <Ghost size={18} /> Silent {letter}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {words.map((item: any) => (
                        <button
                          key={item.word}
                          onClick={() => handleWordClick(item.word)}
                          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl border transition-all relative ${
                            activeWord === item.word
                              ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg scale-105 z-10"
                              : "bg-[#2a2a2a] border-white/5 text-neutral-300 hover:bg-[#333]"
                          }`}
                        >
                          <span className="text-lg font-bold">{item.word}</span>
                          <span className="text-[10px] text-neutral-500 block mt-1 font-medium italic">
                            {item.arabic}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        {/* Instruction Card */}
        <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Practice Mode</h3>
          <p className="text-neutral-400 max-w-md mx-auto">
            Click on any word, then use the floating menu on the right to
            practice **Writing** or **Speaking**.
          </p>
        </div>
      </div>
    </div>
  );
}
