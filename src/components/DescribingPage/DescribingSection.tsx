import { DescribingCard } from "./DescribingCard";
import type { Category } from "../../data/levels";
import type { StudyItem } from "../shared/StudyModule";

interface DescribingSectionProps {
  readonly category: Category;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly studyItems: readonly StudyItem[];
  readonly onCardClick: (text: string) => void;
}

export function DescribingSection({
  category,
  activeWord,
  playingItem,
  studyItems,
  onCardClick,
}: DescribingSectionProps) {
  return (
    <div className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl">
      <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-4">
        <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-400 shadow-inner">
          <category.icon size={20} />
        </div>
        <h3 className="text-xl font-black text-white tracking-tight">
          {category.title}
        </h3>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {category.items.map((item) => (
          <DescribingCard
            key={item.text}
            item={item}
            isActive={activeWord === item.text}
            isPlaying={playingItem === item.text}
            studyItems={studyItems}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}
