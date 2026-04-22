import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "../../data/levels";

interface FamilyMemberCardProps {
  readonly item: VocabularyItem;
  readonly index: number;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly onClick: (text: string) => void;
}

export function FamilyMemberCard({
  item,
  index,
  isActive,
  isPlaying,
  onClick,
}: FamilyMemberCardProps) {
  return (
    <button
      key={item.english}
      onClick={() => onClick(item.english || "")}
      className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 text-blue-400 scale-[1.02] shadow-lg z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <span className="font-bold text-xl">{item.english}</span>
        <span
          className={`text-lg font-arabic ${isActive ? "text-white/80" : "text-neutral-500"}`}
        >
          {item.arabic}
        </span>
      </div>
      <Volume2
        size={20}
        className={`transition-all ${isPlaying ? "text-blue-400 opacity-100 scale-125" : isActive ? "text-blue-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );
}
