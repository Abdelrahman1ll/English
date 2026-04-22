import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, User, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData, VocabularyItem } from "../data/levels";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

export function PersonalityPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const rawData = (levelData?.vocabulary?.PERSONALITY as VocabularyItem[]) || [];
    return rawData.map((item) => ({
      primary: item.english || "",
      secondary: item.arabic || "",
      category: "Personality Traits",
    }));
  }, [levelData]);

  const filteredData = useMemo(() => {
    const rawData = (levelData?.vocabulary?.PERSONALITY as VocabularyItem[]) || [];
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
          <User className="text-pink-400" size={32} /> Personality Adjectives
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Learn how to describe someone's character and traits.
        </p>
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
                size={24}
              />
              <input
                type="text"
                placeholder="Search traits or words..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item: VocabularyItem, idx: number) => (
              <button
                key={item.english}
                onClick={() => handleCardClick(item.english || "")}
                className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
                  activeWord === item.english
                    ? "bg-pink-500/10 border-pink-500/50 text-pink-400 scale-[1.02] shadow-lg z-10"
                    : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
                }`}
              >
                {/* Matte Index Badge */}
                <div className="absolute -top-1 -left-1 z-20">
                  <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                    <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="font-bold text-xl">{item.english}</span>
                  <span
                    className={`text-lg font-arabic ${activeWord === item.english ? "text-white/80" : "text-neutral-500"}`}
                  >
                    {item.arabic}
                  </span>
                  {item.note && (
                    <span className="text-xs text-neutral-600 mt-1 uppercase tracking-widest">{item.note}</span>
                  )}
                </div>
                <Volume2
                  size={20}
                  className={`transition-all ${playingItem === item.english ? "text-pink-400 opacity-100 scale-125" : activeWord === item.english ? "text-pink-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-rose-500 to-red-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any character trait to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
