import { Volume2 } from "lucide-react";
import type { DayItem } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface DayCardProps {
  readonly day: DayItem;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (word: string, sentence?: string) => void;
}

export function DayCard({
  day,
  isActive, 
  isPlaying,
  studyItems,
  onClick,
}: DayCardProps) {
  return (
    <button
      onClick={() => onClick(day.name, day.sentence)}
      className={`p-5 rounded-xl border transition-all text-left relative flex items-center justify-between group/card ${
        isActive
          ? "bg-purple-500/10 border-purple-500/50 text-purple-400 shadow-lg scale-[1.02] z-10"
          : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20 transition-all group-hover/card:-translate-y-1">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(studyItems.findIndex((s) => s.primary === day.name) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-4 transition-all">
        <span className="text-xl font-bold block">{day.name}</span>
        <span className="text-sm text-neutral-500 block mt-1 font-medium font-arabic">
          {day.arabic}
        </span>
      </div>
      <div className="text-right max-w-md flex items-center gap-4">
        <div className="flex flex-col">
          <div className="text-sm opacity-90 italic">"{day.sentence}"</div>
          <div className="text-[10px] text-purple-300/70 font-arabic mt-1">
            {day.sentenceTranslation}
          </div>
        </div>
        <Volume2
          size={18}
          className={`transition-all ${isPlaying ? "animate-pulse scale-125 text-purple-400" : "opacity-0 group-hover:opacity-40"}`}
        />
      </div>
    </button>
  );
}
