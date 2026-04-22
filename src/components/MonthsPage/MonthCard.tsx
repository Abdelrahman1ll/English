import { Volume2 } from "lucide-react";
import type { MonthItem } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface MonthCardProps {
  readonly month: MonthItem;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (word: string) => void;
}

export function MonthCard({
  month,
  isActive,
  isPlaying,
  studyItems,
  onClick,
}: MonthCardProps) {
  return (
    <button
      onClick={() => onClick(month.name)}
      className={`p-4 sm:p-6 rounded-xl border transition-all text-center relative group/card ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg scale-105 z-10"
          : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(studyItems.findIndex((s) => s.primary === month.name) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-lg sm:text-xl font-bold block">{month.name}</span>
      <span className="text-[9px] sm:text-[10px] text-neutral-500 block mt-1 font-medium font-arabic line-clamp-1">
        {month.arabic}
      </span>
      {isPlaying && (
        <Volume2
          size={14}
          className="absolute top-2 right-2 animate-pulse text-blue-400"
        />
      )}
    </button>
  );
}
