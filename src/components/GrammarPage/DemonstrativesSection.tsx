import { AlertCircle, Volume2 } from "lucide-react";
import type { DemonstrativeGroup } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface DemonstrativesSectionProps {
  data: readonly DemonstrativeGroup[];
  activeWord: string | null;
  playingItem: string | null;
  studyItems: StudyItem[];
  onItemClick: (text: string) => void;
}

export function DemonstrativesSection({
  data,
  activeWord,
  playingItem,
  studyItems,
  onItemClick,
}: DemonstrativesSectionProps) {
  if (data.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="bg-blue-600/5 border border-blue-600/10 p-5 sm:p-8 rounded-4xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex flex-wrap gap-x-2 items-center">
            <span>7. Demonstratives</span>
            <span className="text-white/40 font-arabic text-lg sm:text-xl">(الإشارة)</span>
          </h2>
        </div>
        <p className="text-neutral-300 text-lg mb-10">We use these words to point things out based on distance:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.map((group) => (
            <div key={group.title} className="space-y-8">
              <h3 className="text-[10px] sm:text-xs font-black text-blue-400/50 uppercase tracking-[0.15em] sm:tracking-[0.3em] px-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {group.title}
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {group.items.map((item) => (
                  <button
                    key={item.text}
                    onClick={() => onItemClick(item.text)}
                    className={`p-6 sm:p-8 rounded-3xl sm:rounded-4xl border transition-all text-center group flex flex-col items-center justify-center relative overflow-hidden ${activeWord === item.text ? "bg-blue-500/10 border-blue-500/50 shadow-2xl scale-105 z-10" : "bg-white/5 border-white/5 hover:bg-white/10 hover:scale-[1.02]"}`}
                  >
                    <div className="absolute -top-1 -left-1 z-20">
                      <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                        <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                          #{String(studyItems.findIndex(s => s.primary === item.text) + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <span className={`text-2xl sm:text-3xl font-black mt-2 ${activeWord === item.text ? "text-blue-400" : "text-white group-hover:text-blue-400"}`}>{item.text}</span>
                    <span className={`text-xs sm:text-sm font-arabic mt-2 ${activeWord === item.text ? "text-white/70" : "text-neutral-500"}`}>{item.translation}</span>
                    <div className="flex gap-2 mt-4">
                      <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-black uppercase tracking-tighter ${activeWord === item.text ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400"}`}>{item.rule}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-black/20 rounded-4xl p-6 space-y-4 border border-white/5">
                {group.examples.map((ex) => (
                  <button
                    key={ex.text}
                    onClick={() => onItemClick(ex.text)}
                    className={`w-full text-left flex items-center justify-between group p-4 rounded-2xl transition-all border relative overflow-hidden ${activeWord === ex.text ? "bg-blue-500/10 border-blue-500/50 shadow-lg" : "hover:bg-white/5 border-transparent"}`}
                  >
                    <div className="absolute -top-1 -left-1 z-20">
                      <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                        <span className="text-[8px] font-black text-neutral-500 tracking-tighter tabular-nums">
                          #{String(studyItems.findIndex(s => s.primary === ex.text) + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className={`text-lg font-bold group-hover:text-blue-400 transition-colors ${activeWord === ex.text ? "text-blue-400" : "text-white"}`}>{ex.text}</div>
                      <div className={`text-sm font-arabic mt-1 ${activeWord === ex.text ? "text-white/70" : "text-neutral-500"}`}>{ex.translation}</div>
                    </div>
                    <Volume2 size={18} className={`transition-all ${playingItem === ex.text ? "text-white opacity-100 scale-125" : activeWord === ex.text ? "text-white/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
