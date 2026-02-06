import { useState } from "react";
import {
  Volume2,
  Circle,
  Square,
  Triangle,
  Pentagon,
  Octagon,
  Star,
  Heart,
  Diamond,
  Box,
  Globe,
  Cylinder,
  Cone,
  Pyramid,
  RectangleHorizontal,
  Shapes,
} from "lucide-react";
import { usePractice } from "../context/PracticeContext";

type ShapeItem = {
  name: string;
  arabic: string;
  icon?: any;
  cssClass?: string; // Custom CSS shape if no icon matches perfectly
};

const SHAPES_2D: ShapeItem[] = [
  { name: "Circle", arabic: "دائرة", icon: Circle },
  { name: "Oval", arabic: "بيضاوي", cssClass: "w-16 h-10 rounded-[50%]" },
  { name: "Square", arabic: "مربع", icon: Square },
  { name: "Rectangle", arabic: "مستطيل", icon: RectangleHorizontal },
  { name: "Triangle", arabic: "مثلث", icon: Triangle },
  { name: "Pentagon", arabic: "خماسي", icon: Pentagon },
  { name: "Octagon", arabic: "مثمن", icon: Octagon },
  { name: "Star", arabic: "نجمة", icon: Star },
  { name: "Heart", arabic: "قلب", icon: Heart },
  { name: "Diamond", arabic: "دايموند", icon: Diamond },
];

const SHAPES_3D: ShapeItem[] = [
  { name: "Sphere", arabic: "كروي", icon: Globe },
  { name: "Cube", arabic: "مكعب", icon: Box },
  { name: "Cone", arabic: "قرطاس", icon: Cone },
  { name: "Cylinder", arabic: "أسطواني", icon: Cylinder },
  { name: "Pyramid", arabic: "هرم", icon: Pyramid },
];

export function ShapesPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setPlayingItem(text);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCardClick = (item: ShapeItem) => {
    speak(item.name);
    setPracticeWord(item.name);
  };

  const ShapeCard = ({ item }: { item: ShapeItem }) => (
    <button
      onClick={() => handleCardClick(item)}
      className={`group flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
        playingItem === item.name
          ? "bg-blue-600 border-transparent scale-105 shadow-xl shadow-blue-500/20 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
      }`}
    >
      <div
        className={`mb-4 transition-transform group-hover:scale-110 ${playingItem === item.name ? "text-white" : "text-blue-400"}`}
      >
        {item.icon ? (
          <item.icon size={48} strokeWidth={1.5} />
        ) : (
          <div className={`border-2 border-current ${item.cssClass}`} />
        )}
      </div>

      <div
        className={`text-lg font-bold ${playingItem === item.name ? "text-white" : "text-white"}`}
      >
        {item.name}
      </div>
      <div className="text-neutral-500 font-arabic mt-1">{item.arabic}</div>
      <div
        className={`mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-opacity ${playingItem === item.name ? "text-white opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
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
