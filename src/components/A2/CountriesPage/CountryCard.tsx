import { Volume2 } from "lucide-react";
import type { CountryItem } from "./types";

interface CountryCardProps {
  readonly item: CountryItem;
  readonly index: number;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly onClick: (text: string) => void;
}

export function CountryCard({
  item,
  index,
  activeWord,
  playingItem,
  onClick,
}: CountryCardProps) {
  return (
    <div
      className={`rounded-3xl border transition-all relative overflow-hidden flex flex-col ${
        activeWord === item.country
          ? "bg-sky-500/10 border-sky-500/50 shadow-lg z-10"
          : "bg-[#1e1e1e] border-white/5"
      }`}
    >
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <button
        onClick={() => onClick(item.country)}
        className="p-6 pb-4 w-full text-left flex flex-col gap-4 group/card relative mt-2"
      >
        <div className="flex justify-between items-start w-full">
          <span className="text-4xl">{item.flag}</span>
          <Volume2
            size={20}
            className={`transition-all ${
              playingItem === item.country
                ? "text-sky-400 opacity-100 scale-125"
                : "text-neutral-700 opacity-0 group-hover/card:opacity-100"
            }`}
          />
        </div>

        <div className="flex items-baseline justify-between w-full">
          <span className="text-xl font-black text-white">{item.country}</span>
          <span className="text-lg font-arabic text-neutral-400">
            {item.arabicCountry}
          </span>
        </div>
      </button>

      <button
        onClick={() => onClick(item.nationality)}
        className="px-6 py-4 w-full border-t border-white/5 flex items-baseline justify-between group/nat hover:bg-white/2 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sky-400 font-bold">{item.nationality}</span>
          <Volume2
            size={14}
            className={`transition-all ${
              playingItem === item.nationality
                ? "text-sky-400 opacity-100"
                : "opacity-0 group-hover/nat:opacity-100 text-neutral-600"
            }`}
          />
        </div>
        <span className="text-neutral-500 font-arabic">
          {item.arabicNationality}
        </span>
      </button>
    </div>
  );
}
