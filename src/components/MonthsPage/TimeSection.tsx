import { Clock, Volume2 } from "lucide-react";
import type { TimeCategory } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface TimeSectionProps {
  readonly data: readonly TimeCategory[];
  readonly studyItems: readonly StudyItem[];
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly onVocabClick: (text: string) => void;
}

export function TimeSection({
  data,
  studyItems,
  activeWord, 
  playingItem,
  onVocabClick,
}: TimeSectionProps) {
  if (data.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="text-amber-400" /> Time Vocabulary
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((category) => (
          <div
            key={category.category}
            className="bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-xl"
          >
            <div className="p-5 bg-white/5 border-b border-white/5 flex items-center gap-3">
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">
                {category.category}
              </h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {category.items.map((item) => (
                <button
                  key={item.text}
                  onClick={() => onVocabClick(item.text)}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between group/row ${
                    activeWord === item.text
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg z-10"
                      : "bg-transparent border-transparent hover:bg-white/5 text-neutral-300 hover:text-white"
                  }`}
                >
                  <span className="font-bold flex items-center gap-2">
                    <span className="text-[9px] text-neutral-600 font-black min-w-[20px] tabular-nums">
                      #{String(studyItems.findIndex((s) => s.primary === item.text) + 1).padStart(2, "0")}
                    </span>
                    {item.text}
                    {playingItem === item.text ? (
                      <Volume2 size={14} className="animate-pulse text-amber-500" />
                    ) : activeWord === item.text ? (
                      <Volume2 size={14} className="text-amber-500/60" />
                    ) : null}
                  </span>
                  <span className="text-sm text-neutral-500 font-arabic group-hover:text-neutral-400">
                    {item.translation}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
