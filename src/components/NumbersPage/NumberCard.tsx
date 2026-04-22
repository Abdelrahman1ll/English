import { Volume2 } from "lucide-react";
import type { NumberItem } from "./types";

interface NumberCardProps {
  readonly item: NumberItem;
  readonly isActive: boolean;
  readonly index: number;
  readonly onCardClick: (item: NumberItem) => void;
}

export function NumberCard({
  item,
  isActive,
  index,
  onCardClick,
}: NumberCardProps) {
  return (
    <button
      type="button"
      onClick={() => onCardClick(item)}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
      }`}
    >
      <div className="absolute -top-1.5 -left-1.5 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div
        className={`text-4xl font-black mb-3 transition-colors mt-2 ${isActive ? "text-blue-400" : "text-blue-400/80"}`}
      >
        {item.digit}
      </div>
      <div
        className={`flex flex-col items-center gap-1 text-sm font-bold ${isActive ? "text-white/90" : "text-neutral-400"}`}
      >
        <div className="flex items-center gap-2">
          <span>{item.word}</span>
          <Volume2
            size={14}
            className={`transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          />
        </div>
        {item.arabic && (
          <span className="text-xs opacity-50 font-arabic italic">
            {item.arabic}
          </span>
        )}
      </div>
    </button>
  );
}
