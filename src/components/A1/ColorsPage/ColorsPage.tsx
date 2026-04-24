import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { InstructionCard } from "../../shared/InstructionCard";
import { ColorCard } from "./ColorCard";
import type { Color } from "./types";

export function ColorsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawColors = useMemo(() => (levelData?.vocabulary?.COLORS as readonly Color[]) || [], [levelData]);

  const studyItems: StudyItem[] = useMemo(() => rawColors.map((color) => ({
    primary: color.name, secondary: color.arabic, category: "Colors",
  })), [rawColors]);

  const COLORS = useMemo(() => rawColors.filter(color => 
    color.name.toLowerCase().includes(searchQuery.toLowerCase()) || color.arabic.includes(searchQuery)
  ), [rawColors, searchQuery]);

  const handleColorClick = (color: Color) => {
    speak(color.name, () => setActiveColor(null));
    setActiveColor(color.name);
    setPracticeWord(color.name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Colors</h1>
        <p className="text-neutral-400 mt-2">Learn the names of the colors. Click a color to practice.</p>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
          <LayoutGrid size={20} /> <span className="font-bold">Grid View</span>
        </button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
          <Focus size={20} /> <span className="font-bold">Study Mode</span>
        </button>
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search colors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all font-arabic" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {COLORS.map((color, idx) => (
              <ColorCard key={color.name} color={color} index={idx} isActive={activeWord === color.name} isSpeaking={activeColor === color.name} onClick={handleColorClick} />
            ))}
          </div>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
