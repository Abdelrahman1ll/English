import { GrammarTemplate } from "../shared/GrammarTemplate";
import { PrepositionsSection } from "./PrepositionsSection";
import { type StudyItem } from "../../shared/StudyModule";

export function PrepositionsPage() {
  return (
    <GrammarTemplate
      topicId="prepositions"
      getStudyItems={(grammar) => {
        const items: StudyItem[] = [];
        const data = grammar.PREPOSITIONS_DATA || {
          LIST: [],
          EXPLANATION_EXAMPLES: [],
        };
        data.LIST.forEach((p: any) =>
          items.push({
            primary: p.text || "",
            secondary: p.translation || "",
            category: "Prepositions",
          })
        );
        data.EXPLANATION_EXAMPLES.forEach((e: any) =>
          items.push({
            primary: e.en || "",
            secondary: e.ar || "",
            category: "Preposition Usage",
          })
        );
        return items;
      }}
      renderGrid={({
        grammar,
        activeWord,
        playingItem,
        studyItems,
        onItemClick,
      }) => (
        <PrepositionsSection
          data={grammar.PREPOSITIONS_DATA || { LIST: [], EXPLANATION_EXAMPLES: [] }}
          activeWord={activeWord}
          playingItem={playingItem}
          studyItems={studyItems}
          onItemClick={onItemClick}
        />
      )}
    />
  );
}
