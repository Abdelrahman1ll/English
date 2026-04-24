import { NumberCard } from "./NumberCard";
import type { NumberItem } from "./types";
import type { StudyItem } from "../../shared/StudyModule";

interface NumberSectionProps {
  readonly title: string;
  readonly color: string;
  readonly items: readonly NumberItem[];
  readonly studyItems: readonly StudyItem[];
  readonly activeWord: string | null;
  readonly gridClass: string;
  readonly onCardClick: (item: NumberItem) => void;
}

export function NumberSection({
  title,
  color,
  items,
  studyItems,
  activeWord,
  gridClass,
  onCardClick,
}: NumberSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className={`font-bold text-white pl-4 border-l-4 border-${color}-500 uppercase tracking-widest text-sm`}>
        {title}
      </h2>
      <div className={`grid ${gridClass} gap-4`}>
        {items.map((item) => (
          <NumberCard
            key={item.digit}
            item={item}
            isActive={activeWord === item.word}
            onCardClick={onCardClick}
            index={studyItems.findIndex((s) => s.primary === item.word)}
          />
        ))}
      </div>
    </div>
  );
}
