import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";

interface Color {
  name: string;
  arabic: string;
  hex: string;
  textClass?: string;
}

export function ColorsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColors = useMemo(() => {
    const rawColors = (levelData?.vocabulary?.COLORS as Color[]) || [];
    return rawColors.filter(
      (color: Color) =>
        color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        color.arabic.includes(searchQuery),
    );
  }, [levelData, searchQuery]);

  const COLORS = filteredColors;

  const [activeColor, setActiveColor] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleColorClick = (color: Color) => {
    speak(color.name, () => setActiveColor(null));
    setActiveColor(color.name);
    setPracticeWord(color.name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Colors</h1>
        <p className="text-neutral-400 mt-2">
          Learn the names of the colors. Click a color to practice.
        </p>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search colors in English or Arabic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {COLORS.map((color: Color) => {
          const isActive = activeWord === color.name;
          return (
            <button
              key={color.name}
              onClick={() => handleColorClick(color)}
              className={`group relative h-48 rounded-3xl overflow-hidden shadow-lg transition-all border-2 ${
                isActive
                  ? "scale-105 z-10 shadow-2xl"
                  : "hover:scale-105 active:scale-95 border-white/10"
              }`}
              style={{
                backgroundColor: isActive ? "rgba(30, 30, 30, 1)" : color.hex,
                borderColor: isActive ? color.hex : "rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* If active, show a subtle background tint of the color */}
              {isActive && (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: color.hex }}
                />
              )}

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? "text-white" : color.textClass || "text-white"
                }`}
              >
                <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  {color.name}
                  <Volume2
                    size={20}
                    className={`transition-all ${
                      activeColor === color.name
                        ? "animate-pulse scale-110 opacity-100"
                        : isActive
                          ? "opacity-60"
                          : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
                <div className="text-lg opacity-80 font-arabic">
                  {color.arabic}
                </div>
              </div>

              {/* Selection Indicator */}
              {isActive && (
                <div
                  className="absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: color.hex }}
                />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
