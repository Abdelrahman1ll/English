import { Volume2 } from "lucide-react";
import type { MagicEPair } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface MagicECardProps {
  readonly pair: MagicEPair;
  readonly activeWord: string | null;
  readonly playingWord: string | null;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (word: string) => void;
}

export function MagicECard({
  pair,
  activeWord,
  playingWord,
  studyItems,
  onClick,
}: MagicECardProps) {
  const getIndex = (word: string) =>
    String(studyItems.findIndex((s) => s.primary === word) + 1).padStart(2, "0");

  return (
    <div className="flex flex-col gap-2">
      {/* Short Sound */}
      <button
        onClick={() => onClick(pair.short)}
        className={`p-3 rounded-xl border transition-all text-center relative overflow-hidden group ${
          activeWord === pair.short
            ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg scale-105 z-10"
            : "bg-[#1e1e1e] border-white/5 text-neutral-400 hover:border-white/20"
        }`}
      >
        <div className="absolute -top-1 -left-1 z-20">
          <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
            <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
              #{getIndex(pair.short)}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-bold block opacity-50 uppercase mb-1 mt-2 font-arabic">
          {pair.shortAr}
        </span>
        <span className="text-lg font-bold">{pair.short}</span>
        <Volume2
          size={12}
          className={`absolute top-2 right-2 transition-opacity ${playingWord === pair.short ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"}`}
        />
      </button>

      {/* Long Sound */}
      <button
        onClick={() => onClick(pair.long)}
        className={`p-3 rounded-xl border transition-all text-center relative overflow-hidden group ${
          activeWord === pair.long
            ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg scale-105 z-10"
            : "bg-[#1e1e1e] border-white/5 text-neutral-400 hover:border-white/20"
        }`}
      >
        <div className="absolute -top-1 -left-1 z-20">
          <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
            <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
              #{getIndex(pair.long)}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-bold block opacity-50 uppercase mb-1 mt-2 font-arabic">
          {pair.longAr}
        </span>
        <span className="text-lg font-bold">{pair.long}</span>
        <Volume2
          size={12}
          className={`absolute top-2 right-2 transition-opacity ${playingWord === pair.long ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"}`}
        />
      </button>
    </div>
  );
}
