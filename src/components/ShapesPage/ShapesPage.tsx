import { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Shapes, Focus, LayoutGrid } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { ShapeCard } from "./ShapeCard";
import type { ShapeItem, ShapesData } from "./types";

export function ShapesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [speakingShape, setSpeakingShape] = useState<string | null>(null);
  const lastSpeechId = useRef<number>(0);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const SHAPES_DATA = useMemo(() => (levelData?.vocabulary?.SHAPES_DATA as ShapesData) || { "2D": [], "3D": [] }, [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const all = [...SHAPES_DATA["2D"], ...SHAPES_DATA["3D"]];
    return all.map(s => ({ primary: s.name, secondary: s.arabic, category: SHAPES_DATA["2D"].includes(s) ? "2D Shape" : "3D Shape" }));
  }, [SHAPES_DATA]);

  const handleCardClick = (item: ShapeItem) => {
    setSpeakingShape(item.name);
    setPracticeWord(item.name);
    const currentId = Date.now();
    lastSpeechId.current = currentId;
    speak(item.name, () => { if (lastSpeechId.current === currentId) setSpeakingShape(null); });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><Shapes className="text-emerald-400" size={32} /> Shapes</h1>
          <p className="text-neutral-400 mt-2">Learn common 2D and 3D shapes.</p>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
          <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
          <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
        </div>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <ShapeSection title="2D Shapes" color="emerald" items={SHAPES_DATA["2D"]} studyItems={studyItems} activeWord={activeWord} speakingShape={speakingShape} onCardClick={handleCardClick} />
          <ShapeSection title="3D Shapes" color="purple" items={SHAPES_DATA["3D"]} studyItems={studyItems} activeWord={activeWord} speakingShape={speakingShape} onCardClick={handleCardClick} />
        </>
      )}
      <InstructionCard />
    </div>
  );
}

function ShapeSection({ title, color, items, studyItems, activeWord, speakingShape, onCardClick }: any) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-6">
      <h2 className={`font-bold text-white pl-4 border-l-4 border-${color}-500 uppercase tracking-widest text-sm`}>{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((shape: ShapeItem) => (
          <ShapeCard key={shape.name} item={shape} isActive={activeWord === shape.name} isSpeaking={speakingShape === shape.name} studyItems={studyItems} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}
