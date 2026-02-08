import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Shapes } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

interface ShapeItem {
  name: string;
  arabic: string;
  icon?: any;
  cssClass?: string;
}

export function ShapesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const SHAPES_DATA = levelData?.vocabulary?.SHAPES_DATA || {
    "2D": [],
    "3D": [],
  };

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
        className={`group flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
          isActive
            ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
        }`}
      >
        <div
          className={`mb-4 transition-all group-hover:scale-110 ${isActive ? "text-blue-400 scale-110" : "text-blue-400/80"}`}
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
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Shapes className="text-emerald-400" /> Shapes
        </h1>
        <p className="text-neutral-400 mt-2">Learn common 2D and 3D shapes.</p>
      </div>

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

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Practice Mode</h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          Click on any shape, then use the floating menu on the right to
          practice **Writing** or **Speaking**.
        </p>
      </div>
    </div>
  );
}
