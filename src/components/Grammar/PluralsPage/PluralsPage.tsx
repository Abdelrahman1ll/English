import { GrammarTemplate } from "../shared/GrammarTemplate";
import { PluralSection } from "./PluralSection";
import type { StudyItem } from "../../shared/StudyModule";

export function PluralsPage() {
  return (
    <GrammarTemplate
      topicId="plurals"
      getStudyItems={(grammar) => {
        const items: StudyItem[] = [];
        const examples = grammar.PLURAL_EXAMPLES || [];
        const rules = grammar.PLURAL_RULES || [];

        examples.forEach((i: any) =>
          items.push({
            primary: `${i.singular || ""} → ${i.plural || ""}`,
            secondary: i.arabic || "",
            category: "Plurals",
          })
        );
        rules.forEach((rule: any) => {
          rule.examples.forEach((i: any) => {
            items.push({
              primary: `${i.singular || ""} → ${i.plural || ""}`,
              secondary: i.arabic || "",
              category: `Plurals (${rule.title})`,
            });
          });
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
        <PluralSection
          items={grammar.PLURAL_EXAMPLES || []}
          rules={grammar.PLURAL_RULES || []}
          activeWord={activeWord}
          playingItem={playingItem}
          studyItems={studyItems}
          onItemClick={onItemClick}
        />
      )}
    />
  );
}
