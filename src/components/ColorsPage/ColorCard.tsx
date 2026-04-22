import { Volume2 } from "lucide-react";
import type { Color } from "./types";

interface ColorCardProps {
  readonly color: Color;
  readonly index: number;
  readonly isActive: boolean;
  readonly isSpeaking: boolean;
  readonly onClick: (color: Color) => void;
}

export function ColorCard({
  color,
  index,
  isActive,
  isSpeaking,
  onClick,
}: ColorCardProps) {
  return (
    <button
      onClick={() => onClick(color)}
      className={`group relative h-48 rounded-3xl overflow-hidden shadow-lg transition-all border-2 ${
        isActive
          ? "scale-105 z-10 shadow-2xl"
          : "hover:scale-105 active:scale-95 border-white/10"
      }`}
      style={{
        backgroundColor: isActive ? "rgba(30, 30, 30, 1)" : color.hex,
        borderColor: isActive ? color.hex : "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Matte Index Badge */}
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {isActive && (
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: color.hex }}
        />
      )}

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-1 transition-colors ${
          isActive ? "text-white" : color.textClass || "text-white"
        }`}
      >
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {color.name}
          <Volume2
            size={20}
            className={`transition-all ${
              isSpeaking
                ? "animate-pulse scale-110 opacity-100"
                : isActive
                  ? "opacity-60"
                  : "opacity-0 group-hover:opacity-100"
            }`}
          />
        </div>
        <div className="text-lg opacity-80 font-arabic">{color.arabic}</div>
      </div>

      {isActive && (
        <div
          className="absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: color.hex }}
        />
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </button>
  );
}
