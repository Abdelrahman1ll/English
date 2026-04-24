import { Volume2 } from "lucide-react";
import type { ShapeItem } from "./types";
import type { StudyItem } from "../../shared/StudyModule";

interface ShapeCardProps {
  readonly item: ShapeItem;
  readonly isActive: boolean;
  readonly isSpeaking: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (item: ShapeItem) => void;
}

export function ShapeCard({
  item,
  isActive,
  isSpeaking,
  studyItems,
  onClick,
}: ShapeCardProps) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-3xl border transition-all overflow-hidden ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(studyItems.findIndex((s) => s.primary === item.name) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div
        className={`mb-4 transition-all group-hover:scale-110 mt-2 ${isActive ? "text-blue-400 scale-110" : "text-blue-400/80"}`}
      >
        {item.icon ? (
          <item.icon
            size={48}
            strokeWidth={1.5}
            className={isSpeaking ? "animate-pulse" : ""}
          />
        ) : (
          <div
            className={`border-2 border-current ${item.cssClass} ${isSpeaking ? "animate-pulse" : ""}`}
          />
        )}
      </div>

      <div
        className={`text-lg font-bold transition-colors ${isActive ? "text-blue-400" : "text-white"}`}
      >
        {item.name}
      </div>
      <div className="text-neutral-500 font-arabic mt-1">{item.arabic}</div>
      <div
        className={`mt-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-all ${isActive ? "text-blue-400 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
      >
        <Volume2 size={12} className={isSpeaking ? "animate-pulse" : ""} />
        Practice
      </div>
    </button>
  );
}
