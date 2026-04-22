import { Brain, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import type { Test } from "./types";

interface TestTakingProps {
  readonly test: Test;
  readonly currentStep: number;
  readonly score: number;
  readonly selectedOption: string | null;
  readonly isCorrect: boolean | null;
  readonly onOptionClick: (option: string) => void;
  readonly onBack: () => void;
}

export function TestTaking({
  test,
  currentStep,
  score,
  selectedOption,
  isCorrect,
  onOptionClick,
  onBack,
}: TestTakingProps) {
  const questions = test.questions;
  const currentQuestion = questions[currentStep];
  const options =
    currentQuestion.options ||
    (test.type === "true-false" ? ["True", "False"] : []);

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6 flex justify-between items-end">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Brain className="text-blue-400" /> {test.title}
          </h1>
          <p className="text-neutral-400">{test.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-1">
            Progress
          </div>
          <div className="text-2xl font-black text-white">
            {currentStep + 1}{" "}
            <span className="text-neutral-600">/ {questions.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {currentQuestion.question}
          </h2>

          {currentQuestion.note && (
            <p className="text-blue-400 bg-blue-400/10 inline-block px-4 py-2 rounded-xl text-sm font-medium">
              Note: {currentQuestion.note}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4">
            {options.length > 0 ? (
              options.map((option: string) => {
                const isSelected = selectedOption === option;
                const isCorrectOption =
                  currentQuestion.answer &&
                  option.toLowerCase() === currentQuestion.answer.toLowerCase();

                return (
                  <button
                    key={option}
                    onClick={() => onOptionClick(option)}
                    disabled={selectedOption !== null}
                    className={`
                      w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between
                      ${
                        selectedOption === null
                          ? "bg-[#141414] border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5"
                          : isSelected
                            ? isCorrect
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                              : "bg-rose-500/10 border-rose-500 text-rose-400"
                            : isCorrectOption && selectedOption !== null
                              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400/50"
                              : "bg-[#141414] border-white/5 opacity-50"
                      }
                    `}
                  >
                    <span className="text-xl font-bold">{option}</span>
                    {selectedOption !== null &&
                      isSelected &&
                      (isCorrect ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <XCircle size={24} />
                      ))}
                  </button>
                );
              })
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  className="w-full bg-[#141414] border-2 border-white/5 rounded-2xl p-6 text-xl text-white focus:border-blue-500 focus:outline-hidden transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onOptionClick((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                  disabled={selectedOption !== null}
                />
                <button
                  onClick={(e) => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                    onOptionClick(input.value);
                    input.value = "";
                  }}
                  disabled={selectedOption !== null}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all disabled:opacity-50"
                >
                  Confirm Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
            Current Score
          </div>
          <div className="text-3xl font-black text-white">{score}</div>
        </div>
        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-6">
          <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
            Level Accuracy
          </div>
          <div className="text-3xl font-black text-white">
            {currentStep > 0 ? Math.round((score / currentStep) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
}
