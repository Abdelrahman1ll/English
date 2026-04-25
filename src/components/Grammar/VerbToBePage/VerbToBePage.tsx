import { GrammarTemplate } from "../shared/GrammarTemplate";
import { VerbToBeSection } from "./VerbToBeSection";
import type { StudyItem } from "../../shared/StudyModule";
import { useState } from "react";
import { useSpeech } from "../../../hooks/useSpeech";

export function VerbToBePage() {
  const [toBeQuizAnswers, setToBeQuizAnswers] = useState<{
    [key: number]: string;
  }>({});
  const { speak } = useSpeech();

  return (
    <GrammarTemplate
      topicId="verb-to-be"
      getStudyItems={(grammar) => {
        const items: StudyItem[] = [];
        const data = grammar.VERB_TO_BE_DATA || {
          SINGULAR: [],
          PLURAL: [],
          QUIZ: [],
        };

        [...data.SINGULAR, ...data.PLURAL].forEach((i: any) =>
          items.push({
            primary: i.en || "",
            secondary: i.ar || "",
            category: "Verb To Be",
          })
        );
        data.QUIZ.forEach((q: any) =>
          items.push({
            primary: q.question.replace(/[()]/g, "").replace(/_{3,}/g, q.answer),
            secondary: q.translation || `Ans: ${q.answer}`,
            category: "Verb To Be Quiz",
          })
        );
        return items;
      }}
      renderGrid={({ grammar, activeWord, studyItems, onItemClick }) => (
        <VerbToBeSection
          data={
            grammar.VERB_TO_BE_DATA || { SINGULAR: [], PLURAL: [], QUIZ: [] }
          }
          activeWord={activeWord}
          quizAnswers={toBeQuizAnswers}
          studyItems={studyItems}
          onItemClick={onItemClick}
          onQuizOptionClick={(idx, opt) => {
            speak(
              opt === (grammar.VERB_TO_BE_DATA?.QUIZ || [])[idx].answer
                ? "Correct!"
                : "Try again."
            );
            setToBeQuizAnswers((p) => ({ ...p, [idx]: opt }));
          }}
        />
      )}
    />
  );
}
