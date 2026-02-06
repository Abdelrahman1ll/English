import { useState } from "react";
import { Volume2, Shapes } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

type ShapeItem = {
  name: string;
  arabic: string;
  icon?: any;
  cssClass?: string;
};

const SHAPES_2D: ShapeItem[] = [
  // ... existing SHAPES_2D data ...
];

const SHAPES_3D: ShapeItem[] = [
  // ... existing SHAPES_3D data ...
];

export function ShapesPage() {
  const [activeShape, setActiveShape] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: ShapeItem) => {
    speak(item.name, () => setActiveShape(null));
    setActiveShape(item.name);
    setPracticeWord(item.name);
  };

  const ShapeCard = ({ item }: { item: ShapeItem }) => (
    <button
      onClick={() => handleCardClick(item)}
      className={`group flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
        activeShape === item.name
          ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
      }`}
    >
      <div
        className={`mb-4 transition-all group-hover:scale-110 ${activeShape === item.name ? "text-blue-400 scale-110" : "text-blue-400/80"}`}
      >
        {item.icon ? (
          <item.icon size={48} strokeWidth={1.5} />
        ) : (
          <div className={`border-2 border-current ${item.cssClass}`} />
        )}
      </div>

      <div
        className={`text-lg font-bold transition-colors ${activeShape === item.name ? "text-blue-400" : "text-white"}`}
      >
        {item.name}
      </div>
      <div className="text-neutral-500 font-arabic mt-1">{item.arabic}</div>
      <div
        className={`mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-all ${activeShape === item.name ? "text-blue-400 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
      >
        <Volume2 size={12} />
        Practice
      </div>
    </button>
  );

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
          {SHAPES_2D.map((shape) => (
            <ShapeCard key={shape.name} item={shape} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-purple-500 uppercase tracking-widest text-sm">
          3D Shapes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SHAPES_3D.map((shape) => (
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
