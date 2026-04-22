import { Volume2 } from "lucide-react";
import type { SilentLetterItem } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface SilentLetterCardProps {
  readonly item: SilentLetterItem;
  readonly activeWord: string | null;
  readonly playingWord: string | null;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (word: string) => void;
}

export function SilentLetterCard({
  item,
  activeWord,
  playingWord,
  studyItems,
  onClick,
}: SilentLetterCardProps) {
  const index = String(studyItems.findIndex((s) => s.primary === item.word) + 1).padStart(2, "0");

  return (
    <button
      onClick={() => onClick(item.word)}
      className={`p-4 rounded-xl border transition-all text-center relative overflow-hidden group ${
        activeWord === item.word
          ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg scale-105 z-10"
          : "bg-[#1e1e1e] border-white/5 text-neutral-300 hover:bg-[#252525]"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
            #{index}
          </span>
        </div>
      </div>
      <span className="text-[10px] font-bold block opacity-50 uppercase mb-1 mt-2 font-arabic">
        {item.arabic}
      </span>
      <span className="text-lg font-bold">{item.word}</span>
      <Volume2
        size={12}
        className={`absolute top-2 right-2 transition-opacity ${playingWord === item.word ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );
}
