import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "../../../data/levels";

interface VerbCardProps {
  readonly item: VocabularyItem;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly onClick: (text: string) => void;
}

export function VerbCard({ item, isActive, isPlaying, onClick }: VerbCardProps) {
  return (
    <button
      onClick={() => onClick(item.english || "")}
      className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
        isActive
          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 scale-[1.02] shadow-lg z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
      }`}
    >
      <div className="flex flex-col">
        <span className="font-bold text-xl">{item.english}</span>
        <span
          className={`text-lg font-arabic ${isActive ? "text-white/80" : "text-neutral-500"}`}
        >
          {item.arabic}
        </span>
      </div>
      <Volume2
        size={20}
        className={`transition-all ${isPlaying ? "text-emerald-400 opacity-100 scale-125" : isActive ? "text-emerald-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );
}
