import { AlertCircle } from "lucide-react";
import type { QuizQuestion } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface PronounsQuizProps {
  readonly quizData: readonly QuizQuestion[];
  readonly quizAnswers: { readonly [key: number]: string };
  readonly studyItems: readonly StudyItem[];
  readonly onOptionClick: (questionIndex: number, option: string) => void;
}

export function PronounsQuiz({
  quizData,
  quizAnswers,
  studyItems,
  onOptionClick,
}: PronounsQuizProps) {
  if (quizData.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="bg-purple-500/5 border border-purple-500/10 p-8 rounded-4xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            5. Subject Pronouns Quiz <span className="text-purple-400/50 font-arabic text-lg">(اختبار الضمائر)</span>
          </h2>
        </div>
        <p className="text-neutral-300 text-lg mb-8 bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <span>Choose the correct pronoun:{" "}
          <span className="font-black text-purple-400 px-2">
            He, She, It, They, We
          </span></span>
          <span className="font-arabic text-neutral-400" dir="rtl">اختر الضمير الصحيح.</span>
        </p>
        <div className="space-y-4">
          {quizData.map((q, idx) => {
            const isAnswered = quizAnswers[idx] !== undefined;
            const isCorrect = quizAnswers[idx] === q.answer;

            return (
              <div
                key={idx}
                className="bg-[#1e1e1e] p-6 rounded-4xl border border-white/5 shadow-md relative overflow-hidden"
              >
                <div className="absolute -top-1 -left-1 z-20">
                  <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                    <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                      #{String(studyItems.findIndex(s => s.primary === q.question) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <p className="text-xl text-white font-bold mb-6 flex items-center gap-4 mt-2">
                  {q.question}
                </p>
                <div className="flex flex-wrap gap-3">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => onOptionClick(idx, option)}
                      disabled={isAnswered && isCorrect}
                      className={`px-6 py-3 rounded-2xl font-black transition-all border-2 ${
                        quizAnswers[idx] === option
                          ? option === q.answer
                            ? "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-500/20 scale-105"
                            : "bg-rose-600 border-transparent text-white"
                          : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                      } ${isAnswered && option === q.answer ? "bg-emerald-600 border-transparent text-white" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
