import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Clock, Search, BookOpen, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData, VocabularyItem, SentenceItem } from "../data/levels";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

export function RoutinesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const v = (levelData?.vocabulary?.ROUTINES_VOCAB as VocabularyItem[]) || [];
    const s = (levelData?.sentences?.ROUTINES_SENTENCES as SentenceItem[]) || [];
    
    const items: StudyItem[] = [];
    v.forEach(i => items.push({ primary: i.english || "", secondary: i.arabic || "", category: "Routine Vocabulary" }));
    s.forEach(i => items.push({ primary: i.english || "", secondary: i.arabic || "", category: "Routine Sentences" }));
    
    return items;
  }, [levelData]);

  const vocabulary = useMemo(() => {
    const rawData = (levelData?.vocabulary?.ROUTINES_VOCAB as VocabularyItem[]) || [];
    const term = searchQuery.toLowerCase();
    return rawData.filter(
      (item) =>
        item.english?.toLowerCase().includes(term) ||
        item.arabic?.includes(searchQuery)
    );
  }, [levelData, searchQuery]);

  const sentences = useMemo(() => {
    const rawData = (levelData?.sentences?.ROUTINES_SENTENCES as SentenceItem[]) || [];
    const term = searchQuery.toLowerCase();
    return rawData.filter(
      (item) =>
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
          <Clock className="text-blue-400" size={32} /> Daily Routines
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Learn vocabulary and phrases about your daily activities.
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
                placeholder="Search routines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
              />
            </div>
          </div>

          {/* Vocabulary Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
              <BookOpen size={24} className="text-blue-400" /> Vocabulary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vocabulary.map((item) => (
                <button
                  key={item.english}
                  onClick={() => handleCardClick(item.english || "")}
                  className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
                    activeWord === item.english
                      ? "bg-blue-500/10 border-blue-500/50 text-blue-400 scale-[1.02] shadow-lg z-10"
                      : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
                  }`}
                >
                  {/* Matte Index Badge */}
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1 text-center min-w-[32px]">
                      <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                        #{String(studyItems.findIndex(s => s.primary === item.english) + 1).padStart(2, "0")}
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
                  </div>
                  <Volume2
                    size={20}
                    className={`transition-all ${playingItem === item.english ? "text-blue-400 opacity-100 scale-125" : activeWord === item.english ? "text-blue-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Sentences Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
              <Clock size={24} className="text-amber-400" /> Common Sentences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sentences.map((item) => (
                <button
                  key={item.english}
                  onClick={() => handleCardClick(item.english)}
                  className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
                    activeWord === item.english
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400 scale-[1.02] shadow-lg z-10"
                      : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
                  }`}
                >
                  {/* Matte Index Badge */}
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1 text-center min-w-[32px]">
                      <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                        #{String(studyItems.findIndex(s => s.primary === item.english) + 1).padStart(2, "0")}
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
                  </div>
                  <Volume2
                    size={20}
                    className={`transition-all ${playingItem === item.english ? "text-amber-400 opacity-100 scale-125" : activeWord === item.english ? "text-amber-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group mt-16">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any routine or phrase to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
