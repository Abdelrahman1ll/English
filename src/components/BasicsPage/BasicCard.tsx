import { Quote, Volume2 } from "lucide-react";
import type { BasicItem } from "./types";

interface BasicCardProps {
  item: BasicItem;
  color: string;
  index: number;
  isActive: boolean;
  isSpeaking: boolean;
  onClick: (item: BasicItem) => void;
}

export function BasicCard({
  item,
  color,
  index,
  isActive,
  isSpeaking,
  onClick,
}: BasicCardProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/50 shadow-blue-500/20 text-blue-400",
    emerald:
      "bg-emerald-500/10 border-emerald-500/50 shadow-emerald-500/20 text-emerald-400",
    purple:
      "bg-purple-500/10 border-purple-500/50 shadow-purple-500/20 text-purple-400",
  };

  return (
    <button
      onClick={() => onClick(item)}
      className={`group relative flex flex-col p-6 rounded-3xl border transition-all text-left ${
        isActive
          ? `${colorClasses[color]} scale-[1.02] z-10 shadow-xl`
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
      }`}
    >
      <div className="absolute -top-3 -left-3 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start mb-2">
        <div className={`text-2xl font-black ${isActive ? "" : "text-white"}`}>
          {item.word}
        </div>
        <Volume2
          size={18}
          className={`transition-all ${isSpeaking ? "animate-pulse" : isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40 text-neutral-400"}`}
        />
      </div>
      <div
        className={`text-lg font-arabic mb-4 ${isActive ? "text-white/80" : "text-neutral-500"}`}
      >
        {item.arabic}
      </div>
      <div className="mt-auto space-y-1">
        <div className="flex items-start gap-2 text-xs text-neutral-400 font-medium">
          <Quote size={10} className="mt-1 opacity-50 rotate-180" />
          <p className="leading-relaxed">{item.example}</p>
        </div>
        <div className="text-[10px] font-arabic text-neutral-600 pl-4">
          {item.exampleArabic}
        </div>
      </div>
    </button>
  );
}
