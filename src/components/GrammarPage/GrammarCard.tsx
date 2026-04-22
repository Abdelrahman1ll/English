import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "../../data/levels";
import type { StudyItem } from "../shared/StudyModule";

interface GrammarCardProps {
  item: VocabularyItem;
  color: "emerald" | "amber" | "rose";
  activeWord: string | null;
  playingItem: string | null;
  studyItems: readonly StudyItem[];
  onItemClick: (text: string) => void;
}

export function GrammarCard({
  item,
  color,
  activeWord,
  playingItem,
  studyItems,
  onItemClick,
}: GrammarCardProps) {
  const word = item.word || item.text || "";
  const article = item.article || "none";
  const displayText = article === "none" ? word : `${article} ${word}`;

  const colorConfigs = {
    emerald: {
      active: "bg-emerald-500/10 border-emerald-500/50 shadow-emerald-500/5",
      icon: "text-emerald-400",
    },
    amber: {
      active: "bg-amber-500/10 border-amber-500/50 shadow-amber-500/5",
      icon: "text-amber-400",
    },
    rose: {
      active: "bg-rose-500/10 border-rose-500/50 shadow-rose-500/5",
      icon: "text-rose-400",
    },
  };

  const config = colorConfigs[color];

  return (
    <button
      onClick={() => onItemClick(displayText)}
      className={`p-6 rounded-3xl border transition-all text-left group relative overflow-hidden ${
        activeWord === displayText
          ? `${config.active} shadow-2xl scale-[1.02] z-10`
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
            #{String(studyItems.findIndex(s => s.primary === displayText) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start mb-2 mt-2">
        <span
          className={`text-2xl font-black ${activeWord === displayText ? (color === "emerald" ? "text-emerald-400" : color === "amber" ? "text-amber-400" : "text-rose-400") : config.icon}`}
        >
          {article !== "none" && (
            <span
              className={`mr-2 transition-colors ${activeWord === displayText ? "text-white/60" : "text-white/40"}`}
            >
              {article}
            </span>
          )}
          {word}
        </span>
        <Volume2
          size={20}
          className={`transition-all ${playingItem === displayText ? (color === "emerald" ? "text-emerald-400" : color === "amber" ? "text-amber-400" : "text-rose-400") : activeWord === displayText ? "opacity-100" : "opacity-0 group-hover:opacity-100 text-neutral-600"}`}
        />
      </div>
      <div
        className={`text-lg font-arabic ${activeWord === displayText ? "text-white/80" : "text-neutral-500"}`}
      >
        {item.arabic || item.ar || item.translation}
      </div>
    </button>
  );
}
