import { Volume2 } from "lucide-react";
import type { Phrase } from "./types";
import type { StudyItem } from "../../shared/StudyModule";

interface PhraseCardProps {
  readonly phrase: Phrase;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly studyItems: readonly StudyItem[];
  readonly onClick: (text: string) => void;
}

export function PhraseCard({
  phrase,
  activeWord,
  playingItem,  
  studyItems,
  onClick,
}: PhraseCardProps) {
  return (
    <div className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
      <button
        onClick={() => onClick(phrase.question)}
        className="p-8 bg-white/5 border-b border-white/5 text-left group hover:bg-white/10 transition-all relative"
      >
        <div className="absolute -top-1 -left-1 z-20">
          <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
            <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
              #{String(studyItems.findIndex((s) => s.primary === phrase.question) + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start mb-2 mt-2">
          <span className="text-xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight max-w-[85%]">
            Q: {phrase.question}
          </span>
          <Volume2
            size={20}
            className={`transition-all ${playingItem === phrase.question ? "text-amber-400 scale-125" : activeWord === phrase.question ? "text-amber-400/60" : "text-neutral-600 group-hover:text-amber-400"}`}
          />
        </div>
        <div className="text-lg text-neutral-500 font-arabic italic">
          {phrase.translation}
        </div>
      </button>
      <div className="p-6 space-y-4">
        {phrase.answers?.map((ans, ansIdx) => (
          <button
            key={ansIdx}
            onClick={() => onClick(ans.text)}
            className={`w-full text-left p-6 rounded-3xl transition-all group border relative overflow-hidden ${
              activeWord === ans.text
                ? "bg-emerald-500/10 border-emerald-500/50 shadow-xl scale-[1.02] z-10"
                : "bg-black/20 hover:bg-black/40 border-white/5"
            }`}
          >
            <div className="absolute -top-1 -left-1 z-20">
              <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                  #{String(studyItems.findIndex((s) => s.primary === ans.text) + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className={`flex justify-between items-center mb-1`}>
              <span
                className={`text-lg font-bold ${activeWord === ans.text ? "text-emerald-400" : "text-white group-hover:text-emerald-400"}`}
              >
                A: {ans.text}
              </span>
              <Volume2
                size={16}
                className={`transition-all ${playingItem === ans.text ? "text-emerald-400 opacity-100 scale-125" : activeWord === ans.text ? "text-emerald-400/60 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
              />
            </div>
            <div
              className={`text-sm font-arabic mt-1 ${activeWord === ans.text ? "text-white/80" : "text-neutral-500"}`}
            >
              {ans.translation}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
