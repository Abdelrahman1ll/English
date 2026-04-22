import { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Shapes, type LucideIcon } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import { StudyModule, type StudyItem } from "./shared/StudyModule";
import { Focus, LayoutGrid } from "lucide-react";

interface ShapeItem {
  name: string;
  arabic: string;
  icon?: LucideIcon;
  cssClass?: string;
}

export function ShapesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  interface ShapesData {
    "2D": ShapeItem[];
    "3D": ShapeItem[];
  }

  const SHAPES_DATA = (levelData?.vocabulary?.SHAPES_DATA as ShapesData) || {
    "2D": [],
    "3D": [],
  };

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    [...SHAPES_DATA["2D"], ...SHAPES_DATA["3D"]].forEach((s) => {
      items.push({
        primary: s.name,
        secondary: s.arabic,
        category: SHAPES_DATA["2D"].includes(s) ? "2D Shape" : "3D Shape",
      });
    });
    return items;
  }, [SHAPES_DATA]);

  const [isStudyMode, setIsStudyMode] = useState(false);

  const { setPracticeWord, activeWord } = usePractice();
  // Using a local state for the "speaking" animation only, similar to ColorsPage
  const [speakingShape, setSpeakingShape] = useState<string | null>(null);
  const { speak } = useSpeech();
  // Using a ref to track the last speech request ID, to prevent race conditions
  const lastSpeechId = useRef<number>(0);

  const handleCardClick = (item: ShapeItem) => {
    // Cancel any ongoing speaking state immediately for UI responsiveness
    setSpeakingShape(item.name);
    setPracticeWord(item.name);

    // Generate a unique ID for this specific click
    const currentId = Date.now();
    lastSpeechId.current = currentId;

    speak(item.name, () => {
      // Only clear the speaking state if this callback is for the *latest* request
      if (lastSpeechId.current === currentId) {
        setSpeakingShape(null);
      }
    });
  };

  const ShapeCard = ({ item }: { item: ShapeItem }) => {
    const isActive = activeWord === item.name;
    const isSpeaking = speakingShape === item.name;

    return (
      <button
        onClick={() => handleCardClick(item)}
        className={`group relative flex flex-col items-center justify-center p-6 rounded-3xl border transition-all overflow-hidden ${
          isActive
            ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
        }`}
      >
        {/* Matte Index Badge */}
        <div className="absolute -top-1 -left-1 z-20">
          <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
            <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
              #{String(studyItems.findIndex(s => s.primary === item.name) + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div
          className={`mb-4 transition-all group-hover:scale-110 mt-2 ${isActive ? "text-blue-400 scale-110" : "text-blue-400/80"}`}
        >
          {item.icon ? (
            <item.icon
              size={48}
              strokeWidth={1.5}
              className={isSpeaking ? "animate-pulse" : ""}
            />
          ) : (
            <div
              className={`border-2 border-current ${item.cssClass} ${isSpeaking ? "animate-pulse" : ""}`}
            />
          )}
        </div>

        <div
          className={`text-lg font-bold transition-colors ${isActive ? "text-blue-400" : "text-white"}`}
        >
          {item.name}
        </div>
        <div className="text-neutral-500 font-arabic mt-1">{item.arabic}</div>
        <div
          className={`mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-all ${isActive ? "text-blue-400 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
        >
          <Volume2 size={12} className={isSpeaking ? "animate-pulse" : ""} />
          Practice
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Shapes className="text-emerald-400" size={32} /> Shapes
          </h1>
          <p className="text-neutral-400 mt-2">Learn common 2D and 3D shapes.</p>
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
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-emerald-500 uppercase tracking-widest text-sm">
          2D Shapes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SHAPES_DATA["2D"].map((shape: ShapeItem) => (
            <ShapeCard key={shape.name} item={shape} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-purple-500 uppercase tracking-widest text-sm">
          3D Shapes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SHAPES_DATA["3D"].map((shape: ShapeItem) => (
            <ShapeCard key={shape.name} item={shape} />
          ))}
        </div>
      </div>

        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group mt-16">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any shape to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
