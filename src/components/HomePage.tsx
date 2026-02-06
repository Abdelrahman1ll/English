import { Link } from "react-router-dom";
import { ChevronRight, Lock } from "lucide-react";
import { useLevel } from "../context/LevelContext";

export function HomePage() {
  const { availableLevels, setLevel, currentLevel } = useLevel();

  return (
    <div className="space-y-12 py-8">
      <header className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Choose Your <span className="text-blue-500">Learning Path</span>
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Select a level to access tailored lessons and practice exercises.
          Complete all modules in one level to unlock the next.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableLevels.map((level) => {
          const isSelected = currentLevel?.id === level.id;
          const isLocked = level.modules.length === 0;

          return (
            <div
              key={level.id}
              onClick={() => !isLocked && setLevel(level.id)}
              className={`
                relative group p-8 rounded-3xl border transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? "bg-blue-600/10 border-blue-500/50 scale-[1.02] ring-2 ring-blue-500/20"
                    : "bg-[#1a1a1a] border-white/5 hover:border-white/20 hover:scale-[1.01]"
                }
                ${isLocked ? "opacity-60 grayscale cursor-not-allowed" : "hover:shadow-2xl hover:shadow-blue-500/10"}
              `}
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`
                  w-16 h-16 rounded-2xl bg-linear-to-br ${level.color} 
                  flex items-center justify-center text-white text-3xl font-black shadow-lg
                `}
                >
                  {level.id}
                </div>
                {isLocked ? (
                  <Lock className="text-neutral-600" size={24} />
                ) : (
                  <ChevronRight
                    className={`transition-transform duration-300 group-hover:translate-x-1 ${isSelected ? "text-blue-400" : "text-neutral-600"}`}
                    size={24}
                  />
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {level.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                {level.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${level.color} transition-all duration-1000`}
                    style={{
                      width: isSelected ? "100%" : isLocked ? "0%" : "20%",
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  {isSelected
                    ? "Active"
                    : isLocked
                      ? "Coming Soon"
                      : "Available"}
                </span>
              </div>

              {isSelected && (
                <div className="mt-8 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                  <Link
                    to={level.modules[0]?.to || "/"}
                    className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
                  >
                    Continue Lessons <ChevronRight size={18} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
