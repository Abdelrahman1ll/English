import React from "react";
import { X, Volume2, Brain, Sparkles } from "lucide-react";
import type { SearchItem } from "../hooks/useSearch";

interface SearchOverlayProps {
  item: SearchItem;
  onClose: () => void;
  onSpeak: (text: string) => void;
  onPractice: (text: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  item,
  onClose,
  onSpeak,
  onPractice,
}) => {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

      <div
        className="relative w-full max-w-3xl bg-[#1e1e1e] border border-white/10 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 space-y-8 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-neutral-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={24} />
        </button>

        <div className="space-y-6 text-center sm:text-left">
          <div className="inline-flex px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-500/20">
            {item.source}
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight wrap-break-word">
              {item.text}
            </h2>
            <p className="text-2xl sm:text-3xl text-neutral-400 font-arabic leading-relaxed wrap-break-word">
              {item.translation}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
          <button
            onClick={() => onSpeak(item.text)}
            className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xl transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            <Volume2 size={28} /> Listen
          </button>
          <button
            onClick={() => {
              onPractice(item.text);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
          >
            <Brain size={28} /> Practice
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-neutral-600 text-sm font-bold uppercase tracking-widest italic pt-4">
          <Sparkles size={14} className="text-amber-500/50" />
          Click anywhere outside to close
        </div>
      </div>
    </div>
  );
};
