import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

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
  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const rawColors = (levelData?.vocabulary?.COLORS as Color[]) || [];
    return rawColors.map((color) => ({
      primary: color.name,
      secondary: color.arabic,
      category: "Colors",
    }));
  }, [levelData]);

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

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
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
            {COLORS.map((color: Color, idx: number) => {
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
                  {/* Matte Index Badge */}
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                      <span className="text-[10px] font-black text-neutral-400 tracking-tighter">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

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
        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any color to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
