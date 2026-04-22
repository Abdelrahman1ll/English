import { Volume2 } from "lucide-react";
import type { SentenceItem } from "../../data/levels";

interface SocialCardProps {
  readonly sentence: SentenceItem;
  readonly index: number;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly onClick: (text: string) => void;
}

export function SocialCard({
  sentence,
  index,
  isActive,
  isPlaying,
  onClick,
}: SocialCardProps) {
  return (
    <button
      onClick={() => onClick(sentence.english)}
      className={`
        group p-6 rounded-[2.5rem] border transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between
        ${
          isActive
            ? "bg-emerald-600/10 border-emerald-500/50 scale-[1.02] ring-2 ring-emerald-500/20 shadow-xl z-10"
            : "bg-[#1a1a1a]/50 border-white/5 hover:border-white/20 hover:scale-[1.01] hover:bg-[#1f1f1f]"
        }
      `}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1 text-center min-w-[32px]">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-start mb-4 mt-1">
        {sentence.note ? (
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-3 py-1 bg-emerald-500/10 rounded-full">
            {sentence.note}
          </span>
        ) : (
          <div />
        )}
        <Volume2
          size={20}
          className={`transition-all ${
            isPlaying
              ? "text-emerald-400 scale-125"
              : isActive
                ? "text-emerald-400/60"
                : "text-neutral-600 opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>
      <div className="space-y-3">
        <h3
          className={`text-xl font-bold transition-colors leading-tight ${isActive ? "text-emerald-400" : "text-white group-hover:text-emerald-400"}`}
        >
          {sentence.english}
        </h3>
        <p
          className={`text-lg font-arabic dir-rtl ${isActive ? "text-white/80" : "text-neutral-400"}`}
        >
          {sentence.arabic}
        </p>
      </div>
    </button>
  );
}
