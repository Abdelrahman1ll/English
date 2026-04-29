import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Award, Send, FileText } from "lucide-react";
import { examPages } from "./ExamData";

export const ComprehensiveExamPage: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<any[]>([]);
  const [showWrongOnly, setShowWrongOnly] = useState(false);

  const currentPage = examPages[currentPageIndex];

  const handleInputChange = (
    questionId: string,
    value: string,
    index?: number,
  ) => {
    if (index !== undefined) {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = [...currentAnswers];
      newAnswers[index] = value;
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const handleMultipleChoiceChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const calculateScore = () => {
    let totalScore = 0;
    let totalCount = 0;
    const wrong: any[] = [];

    examPages.forEach((page) => {
      page.sections.forEach((section) => {
        section.questions.forEach((q) => {
          totalCount++;
          const userAnswer = answers[q.id];
          let isCorrect = false;

          if (q.type === "fill-in") {
            if (Array.isArray(q.correctAnswer)) {
              isCorrect = q.correctAnswer.every(
                (correct, idx) =>
                  userAnswer?.[idx]?.trim().toLowerCase() ===
                  correct.toLowerCase(),
              );
            } else {
              isCorrect =
                userAnswer?.trim().toLowerCase() ===
                (q.correctAnswer as string).toLowerCase();
            }
          } else {
            isCorrect = userAnswer === q.correctAnswer;
          }

          if (isCorrect) {
            totalScore++;
          } else {
            wrong.push({
              ...q,
              userAnswer: userAnswer,
            });
          }
        });
      });
    });

    setScore(totalScore);
    setTotalQuestions(totalCount);
    setWrongQuestions(wrong);
    setIsSubmitted(true);
  };

  const nextSection = () => {
    if (currentPageIndex < examPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  if (isSubmitted) {
    const percentage = (score / totalQuestions) * 100;

    if (showWrongOnly) {
      return (
        <div className="min-h-screen bg-white dark:bg-black py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">
                Review Mistakes
              </h2>
              <button
                onClick={() => setShowWrongOnly(false)}
                className="px-6 py-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                Back to Results
              </button>
            </div>

            <div className="space-y-6">
              {wrongQuestions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-neutral-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/5">
                  <Award className="w-16 h-16 mx-auto mb-4 text-emerald-500 opacity-20" />
                  <p className="text-xl font-bold text-slate-400">
                    Perfect Score! No mistakes to review.
                  </p>
                </div>
              ) : (
                wrongQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-slate-50 dark:bg-neutral-900 p-5 md:p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-rose-500" />
                    <div className="flex gap-4 mb-6">
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </span>
                      <div className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                        {renderQuestionText(q.question)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-12">
                      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10">
                        <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-2">
                          Your Answer
                        </p>
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                          {Array.isArray(q.userAnswer)
                            ? q.userAnswer.join(", ")
                            : q.userAnswer || "(Empty)"}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                        <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2">
                          Correct Answer
                        </p>
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                          {Array.isArray(q.correctAnswer)
                            ? q.correctAnswer.join(", ")
                            : q.correctAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white dark:bg-black py-8 px-2 md:px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-50 dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/5">
          <div className="bg-blue-600 py-10 px-6 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
            <Award className="w-16 h-16 mx-auto mb-4 text-orange-400" />
            <h2 className="text-3xl font-black mb-1">Exam Results</h2>
            <p className="text-blue-100 text-sm font-medium">
              Level 1 Comprehensive Assessment
            </p>
          </div>
          <div className="p-6 md:p-8 text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-8 border-slate-100 dark:border-white/5 mb-6 shadow-inner">
              <span className="text-4xl font-black text-slate-800 dark:text-white">
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl">
                <p className="text-xs text-slate-500 dark:text-neutral-500 mb-1 font-bold">
                  CORRECT
                </p>
                <p className="text-2xl font-black text-slate-800 dark:text-white">
                  {score} / {totalQuestions}
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl">
                <p className="text-xs text-slate-500 dark:text-neutral-500 mb-1 font-bold">
                  STATUS
                </p>
                <p
                  className={`text-2xl font-black ${percentage >= 50 ? "text-emerald-500" : "text-rose-500"}`}
                >
                  {percentage >= 50 ? "PASSED" : "FAILED"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {wrongQuestions.length > 0 && (
                <button
                  onClick={() => setShowWrongOnly(true)}
                  className="w-full py-4 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black rounded-2xl transition-all hover:bg-rose-200 dark:hover:bg-rose-500/20 active:scale-95"
                >
                  REVIEW MISTAKES ({wrongQuestions.length})
                </button>
              )}
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentPageIndex(0);
                  setAnswers({});
                  setWrongQuestions([]);
                  setShowWrongOnly(false);
                }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                RETAKE EXAM
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full py-4 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white font-black rounded-2xl transition-all hover:bg-slate-300 dark:hover:bg-white/20 active:scale-95"
              >
                RETURN TO HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-6 pb-32 px-2 md:py-12 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-lg text-xs font-black tracking-widest">
                A1
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                COMPREHENSIVE EXAM
              </h1>
            </div>
            <p className="text-slate-400 dark:text-neutral-500 text-xs md:text-sm font-black uppercase tracking-[0.2em] ml-1">
              Level 1 Final Assessment
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              {examPages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentPageIndex
                      ? "bg-blue-600 w-12"
                      : idx < currentPageIndex
                        ? "bg-emerald-500 w-4"
                        : "bg-slate-200 dark:bg-neutral-800 w-4"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-black text-slate-400 dark:text-neutral-500 uppercase tracking-widest">
              Page <span className="text-blue-600">{currentPageIndex + 1}</span>{" "}
              of {examPages.length}
            </p>
          </div>
        </div>

        {/* Page Container */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-3xl border border-slate-200 dark:border-white/5 overflow-hidden relative">
          {/* Page Number Indicator */}
          <div className="absolute top-10 right-10 flex items-center gap-2 text-slate-400 dark:text-neutral-600 font-black text-xs opacity-50">
            <FileText size={14} />
            SECTION {currentPageIndex + 1}
          </div>

          <div className="p-5 md:p-14">
            {currentPage.sections.map((section, sIdx) => (
              <div key={sIdx} className={`${sIdx > 0 ? "mt-16" : ""}`}>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-lg md:text-xl font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                    {section.title}
                  </h2>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-white/5" />
                </div>

                <div className={`grid gap-x-12 gap-y-8 ${
                  section.title.toUpperCase().match(/LETTERS|NUMBER|SPELLING|FILL IN/)
                    ? "grid-cols-1 lg:grid-cols-2" 
                    : "grid-cols-1"
                }`}>
                  {section.questions.map((q, qIdx) => (
                    <div key={q.id} className="relative group">
                      <div className="flex flex-col gap-4 md:gap-6 p-2">
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black">
                            {qIdx + 1}
                          </span>
                          <div className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed pt-0.5">
                            {renderQuestionText(q.question)}
                          </div>
                        </div>

                        {q.type === "fill-in" && (
                          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3 items-center md:ml-12">
                            {Array.isArray(q.correctAnswer) ? (
                              q.correctAnswer.map((_, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  placeholder={`___`}
                                  className="px-3 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl border-2 border-slate-200 dark:border-neutral-800 bg-white dark:bg-black focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all w-full sm:w-32 text-center font-black text-base md:text-lg text-blue-600"
                                  value={answers[q.id]?.[idx] || ""}
                                  onChange={(e) =>
                                    handleInputChange(q.id, e.target.value, idx)
                                  }
                                />
                              ))
                            ) : (
                              <input
                                type="text"
                                placeholder="Type here..."
                                className="px-5 py-3 rounded-2xl border-2 border-slate-200 dark:border-neutral-800 bg-white dark:bg-black focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all w-64 text-center font-black text-lg text-blue-600"
                                value={answers[q.id] || ""}
                                onChange={(e) =>
                                  handleInputChange(q.id, e.target.value)
                                }
                              />
                            )}
                          </div>
                        )}

                        {(q.type === "multiple-choice" ||
                          q.type === "selection") && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:ml-12">
                            {q.options?.map((option) => (
                              <button
                                key={option}
                                onClick={() =>
                                  handleMultipleChoiceChange(q.id, option)
                                }
                                className={`flex items-center justify-between p-4 px-6 rounded-2xl border-2 transition-all text-left ${
                                  answers[q.id] === option
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 shadow-lg shadow-blue-500/10"
                                    : "border-slate-200 dark:border-neutral-800 bg-white dark:bg-black hover:border-blue-300 dark:hover:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-900"
                                }`}
                              >
                                <span className="font-bold text-base md:text-lg">
                                  {option}
                                </span>
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    answers[q.id] === option
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-slate-300 dark:border-neutral-700"
                                  }`}
                                >
                                  {answers[q.id] === option && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="p-4 md:p-10 bg-slate-100 dark:bg-neutral-900/50 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
            <button
              onClick={prevSection}
              disabled={currentPageIndex === 0}
              className="flex items-center gap-2 px-6 py-3 text-slate-500 dark:text-neutral-500 font-black disabled:opacity-30 hover:text-blue-600 transition-all text-sm uppercase tracking-widest rounded-xl hover:bg-slate-200 dark:hover:bg-white/5"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            {currentPageIndex < examPages.length - 1 ? (
              <button
                onClick={nextSection}
                className="flex items-center gap-3 px-10 py-3.5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-2xl shadow-blue-500/20 transition-all active:scale-95 text-sm uppercase tracking-widest"
              >
                Next Page
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={calculateScore}
                className="flex items-center gap-3 px-10 py-3.5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 text-sm uppercase tracking-widest"
              >
                Submit Exam
                <Send size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderQuestionText = (text: string) => {
  const parts = text.split(/\[blank\]/g);
  if (parts.length === 1) return text;

  return (
    <span>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="inline-block w-12 border-b-4 border-blue-500/30 mx-2 align-bottom h-6"></span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};
