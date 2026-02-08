import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Brain,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Trophy,
  ArrowLeft,
  Book,
  FileText,
  ChevronRight,
} from "lucide-react";
import { LEVEL_DATA } from "../data/levels/index";

export function ExercisesPage() {
  const { levelId, category, testId } = useParams();
  const navigate = useNavigate();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;

  const categoryTests = useMemo(() => {
    if (category === "grammar") {
      return levelData?.exercises?.GRAMMAR_TESTS || [];
    }
    if (category === "vocab") {
      return levelData?.exercises?.VOCAB_TESTS || [];
    }
    return [];
  }, [levelData, category]);

  const currentTest = useMemo(() => {
    return categoryTests.find((t: any) => t.id === testId);
  }, [categoryTests, testId]);

  const questions = currentTest?.questions || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentStep] || {};

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    const correct =
      option.toLowerCase() === currentQuestion.answer.toLowerCase();
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
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

  // 1. Result State
  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
          <Trophy className="relative text-blue-400 mx-auto" size={120} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white">Test Complete!</h2>
          <p className="text-xl text-neutral-400">
            You scored <span className="text-blue-400 font-bold">{score}</span>{" "}
            out of{" "}
            <span className="text-white font-bold">{questions.length}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={restartExercises}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCcw size={20} /> Try Again
          </button>
          <button
            onClick={() => navigate(`/${levelId}/exercises/${category}`)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // 2. Selection Mode (No testId)
  if (!testId) {
    const isGrammar = category === "grammar";
    const CategoryIcon = isGrammar ? Book : FileText;
    const categoryTitle = isGrammar ? "Grammar Tests" : "Vocabulary Tests";

    return (
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <CategoryIcon className="text-blue-400" /> {categoryTitle}
          </h1>
          <p className="text-neutral-400 mt-2">
            Choose a specific topic to practice and test your knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTests.map((test: any) => (
            <button
              key={test.id}
              onClick={() =>
                navigate(`/${levelId}/exercises/${category}/${test.id}`)
              }
              className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-4xl text-left hover:border-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-blue-500/10 transition-colors">
                <Brain size={80} />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-neutral-500 text-sm line-clamp-2">
                    {test.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-500 uppercase tracking-widest pt-2">
                  Start Test <ChevronRight size={16} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 3. Test Taking Mode
  const options =
    currentQuestion.options ||
    (currentTest.type === "true-false" ? ["True", "False"] : []);

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6 flex justify-between items-end">
        <div className="space-y-1">
          <button
            onClick={() => navigate(`/${levelId}/exercises/${category}`)}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={16} /> Back to {category}
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Brain className="text-blue-400" /> {currentTest.title}
          </h1>
          <p className="text-neutral-400">{currentTest.description}</p>
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

          <div className="grid grid-cols-1 gap-4">
            {options.map((option: any) => {
              const isSelected = selectedOption === option;
              const isCorrectOption =
                option.toLowerCase() === currentQuestion.answer.toLowerCase();

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
