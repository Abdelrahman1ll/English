import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "../../data/levels";
import type { StudyItem } from "../shared/StudyModule";

interface DescribingCardProps {
  readonly item: VocabularyItem;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (text: string) => void;
}

export function DescribingCard({
  item,
  isActive,
  isPlaying,
  studyItems,
  onClick,
}: DescribingCardProps) {
  const index = studyItems.findIndex((s) => s.primary === item.text);

  return (
    <button
      onClick={() => onClick(item.text || "")}
      className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group relative overflow-hidden ${
        isActive
          ? "bg-pink-500/10 border-pink-500/50 text-pink-400 scale-[1.02] shadow-lg z-10"
          : "bg-transparent border-transparent hover:bg-white/5 text-neutral-300 hover:text-white"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1 text-center min-w-[32px]">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <span className="font-bold text-lg">{item.text}</span>
        <span
          className={`text-sm font-arabic ${isActive ? "text-white/80" : "text-neutral-500"}`}
        >
          {item.translation}
        </span>
      </div>
      <Volume2
        size={16}
        className={`transition-all ${isPlaying ? "text-pink-400 opacity-100 scale-125" : isActive ? "text-pink-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );
}
