import React from "react";
import { Volume2, Split } from "lucide-react";
import type { DigraphItem, ExampleWord } from "./types";
import type { StudyItem } from "../../shared/StudyModule";

interface DigraphCardProps {
  readonly item: DigraphItem;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly studyItems: readonly StudyItem[];
  readonly onDigraphClick: (item: DigraphItem) => void;
  readonly onExampleClick: (e: React.MouseEvent, word: string) => void;
}

export function DigraphCard({
  item,
  activeWord,
  playingItem,
  studyItems,
  onDigraphClick,
  onExampleClick,
}: DigraphCardProps) {
  const getIndex = (word: string) =>
    String(studyItems.findIndex((s) => s.primary === word) + 1).padStart(2, "0");

  return (
    <div
      onClick={() => onDigraphClick(item)}
      className={`group flex flex-col bg-[#1e1e1e] border rounded-3xl p-8 transition-all hover:bg-[#252525] cursor-pointer relative ${
        activeWord === item.digraph
          ? "border-amber-500/50 bg-amber-500/10 shadow-xl scale-105 z-10"
          : "border-white/5 shadow-lg"
      }`}
    >
      <div className="absolute -top-2 -left-2 z-20">
        <div className={`flex items-center justify-center min-w-[32px] h-[20px] rounded-lg border shadow-xl transition-all ${activeWord === item.digraph ? "bg-amber-500 border-amber-400" : "bg-neutral-800 border-white/10"}`}>
          <span className={`text-[10px] font-black tracking-tighter leading-none ${activeWord === item.digraph ? "text-white" : "text-amber-500"}`}>
            #{getIndex(item.digraph)}
          </span>
        </div>
      </div>
      <div
        className={`text-5xl font-black mb-8 transition-all ${activeWord === item.digraph ? "text-amber-400 scale-110" : "text-white group-hover:text-amber-400"}`}
      >
        <div className="flex items-center justify-between w-full">
          {item.digraph}
          <Volume2
            size={24}
            className={`transition-all ${playingItem === item.digraph ? "text-amber-400 scale-125 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
          />
        </div>
      </div>

      <div className="mb-6 px-1 space-y-2">
        {item.pronunciation && (
          <div className="text-xl text-amber-400 font-arabic font-bold">
            {item.pronunciation}
          </div>
        )}
        {item.note && (
          <div className="text-sm text-neutral-400 italic font-medium">
            {item.note}
          </div>
        )}
      </div>

      <div className="w-full space-y-2.5 relative z-10">
        {item.examples.map((ex: ExampleWord) => (
          <button
            key={ex.text}
            onClick={(e) => onExampleClick(e, ex.text)}
            className={`w-full rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-between transition-all border relative group/ex ${
              activeWord === ex.text
                ? "bg-amber-500/20 border-amber-500/50 text-white scale-[1.05] shadow-lg z-20"
                : "bg-black/40 text-neutral-300 border-transparent hover:bg-white/10 hover:border-white/5"
            }`}
          >
            <div className="absolute -top-2 -left-2 z-20">
              <div className={`flex items-center justify-center min-w-[28px] h-[16px] rounded-md border shadow-md transition-all ${activeWord === ex.text ? "bg-amber-500 border-amber-400" : "bg-neutral-800 border-white/10"}`}>
                <span className={`text-[9px] font-black tracking-tighter leading-none ${activeWord === ex.text ? "text-white" : "text-amber-500"}`}>
                  #{getIndex(ex.text)}
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="capitalize">{ex.text}</span>
              <span
                className={`text-[10px] font-arabic leading-none mt-1 ${activeWord === ex.text ? "text-white/80" : "text-neutral-500"}`}
              >
                {ex.translation}
              </span>
            </div>
            <Volume2
              size={14}
              className={`transition-all ${playingItem === ex.text ? "text-white scale-125 opacity-100" : activeWord === ex.text ? "text-white/60 opacity-100" : "opacity-0 group-hover/ex:opacity-40"}`}
            />
          </button>
        ))}
      </div>

      <div
        className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${activeWord === item.digraph ? "text-amber-400 opacity-20" : ""}`}
      >
        <Split size={120} />
      </div>
    </div>
  );
}
