import { AlertCircle, Volume2 } from "lucide-react";
import type { PluralExample } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface PluralSectionProps {
  items: readonly PluralExample[];
  activeWord: string | null;
  playingItem: string | null;
  studyItems: StudyItem[];
  onItemClick: (text: string) => void;
}

export function PluralSection({
  items,
  activeWord,
  playingItem,
  studyItems,
  onItemClick,
}: PluralSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="bg-blue-500/5 border border-blue-500/10 p-5 sm:p-8 rounded-4xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            4. Singular & Plural
          </h2>
        </div>
        <p className="text-neutral-300 text-xl leading-relaxed mb-8">
          To make most words plural (more than one), we usually add{" "}
          <span className="text-blue-400 font-black text-2xl px-2 bg-blue-500/10 rounded-lg">
            S
          </span>{" "}
          at the end.
        </p>
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => {
            const displayText = `${item.singular} → ${item.plural}`;
            return (
              <button
                key={item.singular}
                onClick={() => onItemClick(displayText)}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-3xl transition-all border group relative overflow-hidden ${
                  activeWord === displayText
                    ? "bg-blue-500/10 border-blue-500/50 shadow-xl scale-[1.01] z-10"
                    : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525]"
                }`}
              >
                <div className="absolute -top-1 -left-1 z-20">
                  <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                    <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                      #{String(studyItems.findIndex(s => s.primary === displayText) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
                  <div
                    className={`text-xl sm:text-2xl font-bold transition-colors ${activeWord === displayText ? "text-white/60" : "text-neutral-600"}`}
                  >
                    {item.singular}
                  </div>
                  <div
                    className={`transition-colors ${activeWord === displayText ? "text-white/40" : "text-neutral-800"}`}
                  >
                    →
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-black transition-colors ${activeWord === displayText ? "text-white" : "text-blue-400"}`}
                  >
                    {item.plural}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
                  <div
                    className={`text-lg sm:text-xl font-arabic transition-colors ${activeWord === displayText ? "text-white/80" : "text-neutral-500"}`}
                  >
                    {item.arabic}
                  </div>
                  <Volume2
                    size={16}
                    className={`transition-all ${playingItem === displayText ? "text-white opacity-100 scale-125" : activeWord === displayText ? "text-white/60 opacity-100" : "opacity-0 group-hover:opacity-40 text-neutral-400"}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
