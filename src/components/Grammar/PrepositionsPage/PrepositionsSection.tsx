import { Sparkles, CheckCircle2, Volume2, Quote } from "lucide-react";
import type { PrepositionItem, PrepositionExample } from "../types";
import type { StudyItem } from "../../shared/StudyModule";

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
  onItemClick,
}: PrepositionsSectionProps) {
  if (data.LIST.length === 0) return null;

  return (
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-purple-900/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                Prepositions
              </h2>
            </div>
            <p className="text-purple-50 text-lg max-w-md font-medium leading-relaxed">
              Words that show the relationship between things in space or time.
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-right" dir="rtl">
            <h3 className="text-white font-bold text-xl mb-2 flex items-center justify-end gap-2">
              حروف الجر <CheckCircle2 size={18} className="text-purple-300" />
            </h3>
            <p className="text-purple-100/80 text-sm">توضح مكان أو زمان الشيء بالنسبة لشيء آخر.</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </div>

      <div className="bg-[#1a1a1a] p-8 rounded-4xl border border-white/5 shadow-xl space-y-10">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
            <Quote size={20} />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            Prepositions List & Examples
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.LIST.map((prep, idx) => (
            <div
              key={prep.text}
              className={`group flex flex-col p-6 rounded-[2rem] border transition-all relative ${activeWord === prep.text ? "bg-purple-600 border-purple-400 shadow-2xl scale-105 z-10" : "bg-neutral-900 border-white/5 hover:bg-neutral-800"}`}
            >
              <div className="absolute -top-2 -left-2 z-20">
                <div className={`flex items-center justify-center min-w-[28px] h-[18px] rounded-lg border shadow-xl ${activeWord === prep.text ? "bg-white border-white" : "bg-neutral-800 border-white/10"}`}>
                  <span className={`text-[10px] font-black tracking-tighter leading-none ${activeWord === prep.text ? "text-purple-600" : "text-purple-400"}`}>
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <button
                    onClick={() => onItemClick(prep.text)}
                    className={`text-2xl font-black text-left ${activeWord === prep.text ? "text-white" : "text-neutral-100 group-hover:text-purple-400"}`}
                  >
                    {prep.text}
                  </button>
                  <span className={`text-sm font-arabic ${activeWord === prep.text ? "text-purple-100" : "text-neutral-500"}`}>
                    {prep.translation}
                  </span>
                </div>
                <Volume2
                  size={20}
                  onClick={() => onItemClick(prep.text)}
                  className={`cursor-pointer transition-all ${playingItem === prep.text ? "text-white animate-pulse" : activeWord === prep.text ? "text-white/60" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
                />
              </div>

              {prep.example && (
                <button
                  onClick={() => onItemClick(prep.example!)}
                  className={`mt-6 p-4 rounded-2xl text-left transition-all relative ${activeWord === prep.example ? "bg-white/10 border-white/10" : "bg-black/20 border-transparent hover:bg-black/30 border"}`}
                >
                  <div className={`absolute -top-2 -left-2 z-20 flex items-center justify-center min-w-[28px] h-[18px] rounded-lg border shadow-xl ${activeWord === prep.example ? "bg-white border-white" : "bg-neutral-800 border-white/10"}`}>
                    <span className={`text-[10px] font-black tracking-tighter leading-none ${activeWord === prep.example ? "text-purple-600" : "text-purple-400"}`}>
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className={`text-sm font-bold ${activeWord === prep.example ? "text-white" : "text-neutral-300"}`}>
                    {prep.example}
                  </p>
                  <p className={`text-xs font-arabic mt-1 ${activeWord === prep.example ? "text-purple-200" : "text-neutral-600"}`}>
                    {prep.exampleTranslation}
                  </p>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
