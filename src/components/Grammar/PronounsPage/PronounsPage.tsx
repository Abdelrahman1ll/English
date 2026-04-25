import { GrammarTemplate } from "../shared/GrammarTemplate";
import { PronounsQuiz } from "./PronounsQuiz";
import type { StudyItem } from "../../shared/StudyModule";
import { useState } from "react";
import { useSpeech } from "../../../hooks/useSpeech";

export function PronounsPage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const { speak } = useSpeech();

  return (
    <GrammarTemplate
      topicId="pronouns"
      getStudyItems={(grammar) => {
        const items: StudyItem[] = [];
        const quiz = grammar.PRONOUNS_QUIZ || [];
        quiz.forEach((q: any) =>
          items.push({
            primary: q.question.replace(/[()]/g, "").replace(/_{3,}/g, q.answer),
            secondary: q.translation || `Ans: ${q.answer}`,
            category: "Pronouns",
          })
        );
        return items;
      }}
      renderGrid={({ grammar, studyItems }) => (
        <PronounsQuiz
          quizData={grammar.PRONOUNS_QUIZ || []}
          quizAnswers={quizAnswers}
          studyItems={studyItems}
          onOptionClick={(idx, opt) => {
            speak(
              opt === (grammar.PRONOUNS_QUIZ || [])[idx].answer
                ? "Correct!"
                : "Try again."
            );
            setQuizAnswers((p) => ({ ...p, [idx]: opt }));
          }}
        />
      )}
    />
  );
}
