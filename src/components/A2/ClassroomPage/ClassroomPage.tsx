import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import type { VocabularyItem } from "../../../data/levels";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { InstructionCard } from "../../shared/InstructionCard";
import { ClassroomCard } from "./ClassroomCard";

export function ClassroomPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.vocabulary?.CLASSROOM_DATA as readonly VocabularyItem[]) || [], [levelData]);

  const studyItems: StudyItem[] = useMemo(() => rawData.map(i => ({ primary: i.english || "", secondary: i.arabic || "", category: "Classroom Objects" })), [rawData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawData.filter(i => i.english?.toLowerCase().includes(term) || i.arabic?.includes(searchQuery));
  }, [rawData, searchQuery]);

  const handleCardClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Briefcase className="text-emerald-400" size={32} /> Classroom Objects</h1>
        <p className="text-neutral-400 mt-3 text-lg">Learn the names of things you find in a classroom.</p>
      </header>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-emerald-500/50 outline-hidden transition-all font-arabic" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, idx) => <ClassroomCard key={item.english} item={item} index={idx} isActive={activeWord === item.english} isPlaying={playingItem === item.english} onClick={handleCardClick} />)}
          </div>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
