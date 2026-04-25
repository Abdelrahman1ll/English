import { AlertCircle } from "lucide-react";
import { GrammarCard } from "../../Grammar/shared/GrammarCard";
import type { VocabularyItem } from "../../../data/levels";
import type { StudyItem } from "../../shared/StudyModule";

interface ArticleSectionProps {
  title: string;
  rule: React.ReactNode;
  readonly items: readonly VocabularyItem[];
  readonly color: "emerald" | "amber" | "rose";
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly studyItems: readonly StudyItem[];
  onItemClick: (text: string) => void;
  vowels?: string[];
}

export function ArticleSection({
  title,
  rule,
  items,
  color,
  activeWord,
  playingItem,
  studyItems,
  onItemClick,
  vowels,
}: ArticleSectionProps) {
  if (items.length === 0) return null;

  const bgColors = {
    emerald: "bg-emerald-500/5 border-emerald-500/10",
    amber: "bg-amber-500/5 border-amber-500/10",
    rose: "bg-rose-500/5 border-rose-500/10",
  };

  const iconColors = {
    emerald: "bg-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/20 text-amber-400",
    rose: "bg-rose-500/20 text-rose-400",
  };

  return (
    <section className="space-y-8">
      <div className={`${bgColors[color]} p-8 rounded-4xl shadow-xl border`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${iconColors[color]}`}>
            <AlertCircle size={20} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            {title}
          </h2>
        </div>

        {vowels && (
          <div className="flex flex-wrap gap-3 mb-8">
            {vowels.map((vowel) => (
              <span
                key={vowel}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-amber-500 text-black font-black text-2xl shadow-lg shadow-amber-500/20"
              >
                {vowel}
              </span>
            ))}
          </div>
        )}

        <div className="text-neutral-300 text-xl leading-relaxed mb-8">
          {rule}
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${color === 'rose' ? 'md:grid-cols-3' : ''} gap-4`}>
          {items.map((item) => (
            <GrammarCard
              key={item.word || item.text}
              item={item}
              color={color}
              activeWord={activeWord}
              playingItem={playingItem}
              studyItems={studyItems}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
