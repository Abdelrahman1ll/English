import { Sparkles } from "lucide-react";
import type { Question } from "../../../data/levels";

interface QuizSectionProps {
  quizData: Question[];
  quizAnswers: { [key: number]: string };
  onOptionClick: (questionIndex: number, option: string) => void;
}

export function QuizSection({
  quizData,
  quizAnswers,
  onOptionClick,
}: QuizSectionProps) {
  return (
    <section className="space-y-8 pt-10 border-t border-white/5">
      <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
        <Sparkles size={24} className="text-amber-400" /> Quick Basics Quiz
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {quizData.map((q, idx) => {
          const isAnswered = quizAnswers[idx] !== undefined;
          const isCorrect =
            quizAnswers[idx]?.toLowerCase() === q.answer.toLowerCase();

          return (
            <div
              key={idx}
              className="bg-[#1e1e1e] p-6 rounded-4xl border border-white/5 shadow-md space-y-6"
            >
              <p className="text-xl text-white font-bold flex items-center gap-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-sm text-neutral-500">
                  {idx + 1}
                </span>
                {q.question}
              </p>

              {isAnswered && q.translation && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 animate-in fade-in slide-in-from-top-2">
                  <p className="text-blue-200 text-lg font-bold text-right" dir="rtl">
                    {q.translation}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => onOptionClick(idx, option)}
                    disabled={isAnswered && isCorrect}
                    className={`px-6 py-3 rounded-2xl font-black transition-all border-2 ${
                      quizAnswers[idx] === option
                        ? isCorrect
                          ? "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-500/20"
                          : "bg-rose-600 border-transparent text-white"
                        : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                    } ${isAnswered && option.toLowerCase() === q.answer.toLowerCase() ? "bg-emerald-600 border-transparent text-white" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
