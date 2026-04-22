import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface PhraseCardProps {
  readonly item: VocabularyItem;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (item: VocabularyItem) => void;
}

export function PhraseCard({
  item,
  isActive,
  isPlaying,
  studyItems,
  onClick,
}: PhraseCardProps) {
  const index = studyItems.findIndex((s) => s.primary === item.text);

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative p-6 rounded-3xl border text-left transition-all bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg overflow-hidden"
    >
      <div className="absolute -top-1.5 -left-1.5 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div
        className={`font-black text-lg mb-2 transition-colors ${isActive ? "text-amber-400" : "text-white"}`}
      >
        "{item.text}"
      </div>
      {item.translation && (
        <div
          className={`font-arabic mb-4 ${isActive ? "text-white/90" : "text-neutral-400"}`}
        >
          {item.translation}
        </div>
      )}
      <div
        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${isPlaying ? "text-amber-400 opacity-100 scale-110" : isActive ? "text-amber-400/60 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
      >
        <Volume2 size={12} />
        Practice
      </div>
    </button>
  );
}
