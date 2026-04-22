import { AlertCircle, Volume2, Quote } from "lucide-react";
import type { PrepositionItem, PrepositionExample } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface PrepositionsSectionProps {
  data: {
    LIST: readonly PrepositionItem[];
    EXPLANATION_EXAMPLES: readonly PrepositionExample[];
  };
  activeWord: string | null;
  playingItem: string | null;
  studyItems: StudyItem[];
  onItemClick: (text: string) => void;
}

export function PrepositionsSection({
  data,
  activeWord,
  playingItem,
  studyItems,
  onItemClick,
}: PrepositionsSectionProps) {
  if (data.LIST.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="bg-purple-600/5 border border-purple-600/10 p-5 sm:p-8 rounded-4xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            8. Prepositions (حروف الجر)
          </h2>
        </div>
        <p className="text-neutral-300 text-lg mb-10 leading-relaxed">
          Words that show the relationship between things in space or time:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {data.LIST.map((prep) => (
            <button
              key={prep.text}
              onClick={() => onItemClick(prep.text)}
              className={`p-4 sm:p-6 rounded-2xl border transition-all text-center group relative overflow-hidden ${activeWord === prep.text ? "bg-purple-500/10 border-purple-500/50 shadow-2xl scale-110 z-10" : "bg-white/5 border-white/5 hover:bg-white/10 hover:scale-105 hover:border-white/10 shadow-lg"}`}
            >
              <div className="absolute -top-1 -left-1 z-20">
                <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                  <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                    #{String(studyItems.findIndex(s => s.primary === prep.text) + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className={`text-xl sm:text-2xl font-black mt-1 transition-colors ${activeWord === prep.text ? "text-purple-400" : "text-white group-hover:text-purple-400"}`}>{prep.text}</div>
              <div className={`text-xs sm:text-sm font-arabic mt-2 ${activeWord === prep.text ? "text-white/70" : "text-neutral-500"}`}>{prep.translation}</div>
            </button>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-3">
            <Quote size={20} className="text-purple-500" /> Usage: "In the world"
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.EXPLANATION_EXAMPLES.map((ex) => (
              <button
                key={ex.en}
                onClick={() => onItemClick(ex.en)}
                className={`p-5 sm:p-6 rounded-3xl transition-all border text-left group relative overflow-hidden ${activeWord === ex.en ? "bg-purple-500/10 border-purple-500/50 shadow-2xl scale-[1.02] z-10" : "bg-black/20 border-white/5 hover:bg-black/30 hover:border-purple-500/30 shadow-lg"}`}
              >
                <div className="absolute -top-1 -left-1 z-20">
                  <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                    <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                      #{String(studyItems.findIndex(s => s.primary === ex.en) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className={`text-lg sm:text-xl font-bold leading-relaxed mt-1 ${activeWord === ex.en ? "text-purple-400" : "text-white group-hover:text-purple-400"}`}>{ex.en}</div>
                <div className={`text-base sm:text-lg font-arabic mt-3 ${activeWord === ex.en ? "text-white/70" : "text-neutral-500 group-hover:text-neutral-400"}`}>{ex.ar}</div>
                <Volume2 size={18} className={`absolute top-4 right-4 transition-all ${playingItem === ex.en ? "text-white opacity-100 scale-125" : activeWord === ex.en ? "text-white/60 opacity-100" : "text-neutral-800 opacity-0 group-hover:opacity-100"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
