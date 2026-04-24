import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Smile, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { InstructionCard } from "../../shared/InstructionCard";
import { FeelingCard } from "./FeelingCard";
import type { FeelingItem, FeelingCategory } from "./types";

export function FeelingsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.vocabulary?.FEELINGS_DATA as readonly FeelingCategory[]) || [], [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawData.forEach(cat => cat.items.forEach(i => items.push({ primary: i.word, secondary: i.arabic, category: cat.category })));
    return items;
  }, [rawData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawData.map(cat => ({ ...cat, items: cat.items.filter(i => i.word.toLowerCase().includes(term) || i.arabic.includes(searchQuery)) })).filter(cat => cat.items.length > 0);
  }, [rawData, searchQuery]);

  const handleCardClick = (item: FeelingItem) => {
    speak(item.word, () => setPlayingItem(null));
    setPlayingItem(item.word);
    setPracticeWord(item.word);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><Smile className="text-pink-400" /> Feelings & Emotions</h1>
        <p className="text-neutral-400 mt-2">Learn how to express your emotions and states of being.</p>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search feelings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all font-arabic" />
          </div>

          <div className="space-y-16">
            {filteredData.map(category => (
              <div key={category.category} className="space-y-6">
                <h2 className="font-bold text-white/40 uppercase tracking-widest text-xs border-l-2 border-pink-500/50 pl-4 ml-2">{category.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map(item => (
                    <FeelingCard key={`${item.word}-${item.type}`} item={item} isActive={activeWord === item.word} isPlaying={playingItem === item.word} studyItems={studyItems} onClick={handleCardClick} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
