import { Volume2 } from "lucide-react";
import type { Language } from "./types";
import type { StudyItem } from "../../shared/StudyModule";

interface LanguageCardProps {
  readonly lang: Language;
  readonly isActive: boolean;
  readonly isPlaying: boolean;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (text: string) => void;
}

export function LanguageCard({
  lang,
  isActive,
  isPlaying,
  studyItems,
  onClick,
}: LanguageCardProps) {
  return (
    <button
      onClick={() => onClick(lang.text)}
      className={`p-6 rounded-3xl border transition-all text-center group relative overflow-hidden ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 shadow-2xl scale-105 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(studyItems.findIndex((s) => s.primary === lang.text) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div
        className={`text-xl font-black mt-2 transition-colors ${isActive ? "text-white" : "text-blue-400"}`}
      >
        {lang.text}
      </div>
      <div
        className={`text-sm font-arabic mt-2 ${isActive ? "text-white/80" : "text-neutral-500 group-hover:text-neutral-400"}`}
      >
        {lang.translation}
      </div>

      <div
        className={`absolute top-2 right-2 transition-all ${isPlaying ? "opacity-100 scale-125" : isActive ? "opacity-60" : "opacity-0"}`}
      >
        <Volume2 size={12} className="text-white" />
      </div>
    </button>
  );
}
