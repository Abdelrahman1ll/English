import { Volume2, Brain } from "lucide-react";
import type { SearchItem } from "../../hooks/useSearch";

interface SearchResultCardProps {
  readonly item: SearchItem;
  readonly isActive: boolean;
  readonly onSelect: () => void;
  readonly onSpeak: (text: string) => void;
  readonly onPractice: (text: string) => void;
}

export function SearchResultCard({
  item,
  isActive,
  onSelect,
  onSpeak,
  onPractice,
}: SearchResultCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-[#1e1e1e] border p-6 rounded-3xl flex items-center justify-between group transition-all cursor-pointer ${
        isActive
          ? "border-blue-500/50 bg-blue-500/10 shadow-xl scale-[1.02] z-10"
          : "border-white/5 hover:bg-white/5 hover:border-blue-500/30 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
      }`}
    >
      <div className="space-y-1.5 flex-1 overflow-hidden">
        <div className="flex items-center gap-3">
          <h3
            className={`text-2xl font-black transition-colors ${
              isActive ? "text-blue-400" : "text-white group-hover:text-blue-400"
            } truncate`}
          >
            {item.text}
          </h3>
          <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black text-neutral-500 uppercase tracking-wider shrink-0">
            {item.source}
          </span>
        </div>
        <p className="text-lg text-neutral-500 font-arabic">{item.translation}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSpeak(item.text);
          }}
          className="p-3 bg-white/5 hover:bg-blue-600/20 text-neutral-400 hover:text-blue-400 rounded-2xl transition-all hover:scale-110 active:scale-90"
        >
          <Volume2 size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPractice(item.text);
          }}
          className="p-3 bg-white/5 hover:bg-emerald-600/20 text-neutral-400 hover:text-emerald-400 rounded-2xl transition-all hover:scale-110 active:scale-90"
        >
          <Brain size={24} />
        </button>
      </div>
    </div>
  );
}
