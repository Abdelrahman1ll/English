import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "./types";

interface JobCardProps {
  readonly item: VocabularyItem;
  readonly index: number;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly onClick: (item: VocabularyItem) => void;
}

export function JobCard({
  item,
  index,
  isActive,
  isPlaying,
  onClick,
}: JobCardProps) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`group relative flex items-center justify-between p-5 rounded-2xl border transition-all text-left overflow-hidden ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 scale-[1.02] shadow-xl shadow-blue-500/10 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
      }`}
    >
      <div className="absolute -top-1.5 -left-1.5 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex-1 mt-1">
        <div
          className={`font-bold transition-colors ${isActive ? "text-blue-400" : "text-neutral-200"}`}
        >
          {item.text}
        </div>
        {item.translation && (
          <div
            className={`text-sm font-arabic mt-1 ${isActive ? "text-white/80" : "text-neutral-500"}`}
          >
            {item.translation}
          </div>
        )}
      </div>
      <Volume2
        size={16}
        className={`transition-all ${isPlaying ? "text-blue-400 opacity-100 scale-125" : isActive ? "text-blue-400/60 opacity-100" : "text-neutral-400 opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );
}
