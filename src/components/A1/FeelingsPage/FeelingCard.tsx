import { Volume2 } from "lucide-react";
import type { FeelingItem } from "./types";
import type { StudyItem } from "../../shared/StudyModule";

interface FeelingCardProps {
  readonly item: FeelingItem;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (item: FeelingItem) => void;
}

export function FeelingCard({
  item,
  isActive,
  isPlaying,
  studyItems,
  onClick,
}: FeelingCardProps) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`group relative flex flex-col p-6 rounded-3xl border transition-all text-left overflow-hidden ${
        isActive
          ? "bg-pink-500/10 border-pink-500/50 scale-105 shadow-xl shadow-pink-500/20 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20 shadow-lg"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(studyItems.findIndex((s) => s.primary === item.word) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start w-full mb-2">
        <span
          className={`text-xl font-black transition-colors ${isActive ? "text-pink-400" : "text-white"}`}
        >
          {item.word}
        </span>
        <Volume2
          size={18}
          className={`transition-all ${isPlaying ? "opacity-100 text-white scale-125" : isActive ? "opacity-60 text-white" : "opacity-0 group-hover:opacity-100 text-neutral-400"}`}
        />
      </div>

      <div className="flex justify-between items-end w-full">
        <span
          className={`text-sm font-arabic font-medium ${isActive ? "text-white/90" : "text-neutral-400"}`}
        >
          {item.arabic}
        </span>
        {item.type && (
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-black/40 text-neutral-500"}`}
          >
            {item.type}
          </span>
        )}
      </div>
    </button>
  );
}
