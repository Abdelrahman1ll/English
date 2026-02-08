import { useState } from "react";
import { useParams } from "react-router-dom";
import { Brain, CheckCircle2, XCircle, RefreshCcw, Trophy } from "lucide-react";
import { LEVEL_DATA } from "../data/levels/index";

export function ExercisesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const EXERCISES_DATA = levelData?.exercises?.EXERCISES_DATA || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = EXERCISES_DATA[currentStep] || {};

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentStep < EXERCISES_DATA.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartExercises = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
          <Trophy className="relative text-blue-400 mx-auto" size={120} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white">Exercise Complete!</h2>
          <p className="text-xl text-neutral-400">
            You scored <span className="text-blue-400 font-bold">{score}</span>{" "}
            out of{" "}
            <span className="text-white font-bold">
              {EXERCISES_DATA.length}
            </span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={restartExercises}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCcw size={20} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Brain className="text-blue-400" /> Exercises
          </h1>
          <p className="text-neutral-400 mt-2">
            Test your knowledge of Level A1.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-1">
            Progress
          </div>
          <div className="text-2xl font-black text-white">
            {currentStep + 1}{" "}
            <span className="text-neutral-600">/ {EXERCISES_DATA.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / EXERCISES_DATA.length) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options?.map((option: any) => {
              const isSelected = selectedOption === option;
              const isCorrectOption = option === currentQuestion.answer;

              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
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
            })}
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
