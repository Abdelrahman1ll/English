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
} from "lucide-react";

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

  const ShapeCard = ({ item }: { item: ShapeItem }) => (
    <button
      onClick={() => speak(item.name)}
      className={`group flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
        playingItem === item.name
          ? "bg-blue-600/20 border-blue-500/50"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#2a2a2a]"
      }`}
    >
      <div
        className={`mb-4 transition-transform group-hover:scale-110 ${playingItem === item.name ? "text-blue-400" : "text-white"}`}
      >
        {item.icon ? (
          <item.icon size={48} strokeWidth={1.5} />
        ) : (
          <div className={`border-2 border-current ${item.cssClass}`} />
        )}
      </div>

      <div
        className={`text-lg font-bold ${playingItem === item.name ? "text-blue-400" : "text-white"}`}
      >
        {item.name}
      </div>
      <div className="text-neutral-500 font-arabic mt-1">{item.arabic}</div>
      <div
        className={`mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-opacity ${playingItem === item.name ? "text-blue-400 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
      >
        <Volume2 size={12} />
        Listen
      </div>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Shapes</h1>
        <p className="text-neutral-400 mt-2">
          Learn the names of 2D and 3D shapes.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white pl-2 border-l-4 border-emerald-500">
          2D Shapes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SHAPES_2D.map((shape) => (
            <ShapeCard key={shape.name} item={shape} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white pl-2 border-l-4 border-purple-500">
          3D Shapes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SHAPES_3D.map((shape) => (
            <ShapeCard key={shape.name} item={shape} />
          ))}
        </div>
      </div>
    </div>
  );
}
