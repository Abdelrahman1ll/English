import { GrammarTemplate } from "../shared/GrammarTemplate";
import { DemonstrativesSection } from "./DemonstrativesSection";
import type { StudyItem } from "../../shared/StudyModule";

export function DemonstrativesPage() {
  return (
    <GrammarTemplate
      topicId="demonstratives"
      getStudyItems={(grammar) => {
        const items: StudyItem[] = [];
        const data = grammar.DEMONSTRATIVES_DATA || [];
        data.forEach((g: any) => {
          g.items.forEach((i: any) =>
            items.push({
              primary: i.text || "",
              secondary: i.translation || "",
              category: "Demonstratives",
            })
          );
          g.examples.forEach((e: any) =>
            items.push({
              primary: e.text || "",
              secondary: e.translation || "",
              category: "Demonstrative Ex",
            })
          );
        });
        return items;
      }}
      renderGrid={({
        grammar,
        activeWord,
        playingItem,
        studyItems,
        onItemClick,
      }) => (
        <DemonstrativesSection
          data={grammar.DEMONSTRATIVES_DATA || []}
          activeWord={activeWord}
          playingItem={playingItem}
          studyItems={studyItems}
          onItemClick={onItemClick}
        />
      )}
    />
  );
}
