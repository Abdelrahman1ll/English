import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LEVEL_DATA } from "../../data/levels/index";
import { TestSelection } from "./TestSelection";
import { TestTaking } from "./TestTaking";
import { TestResult } from "./TestResult";
import type { Test } from "./types";

export function ExercisesPage() {
  const { levelId, category, testId } = useParams();
  const navigate = useNavigate();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;

  const categoryTests = useMemo(() => {
    if (category === "grammar") return levelData?.exercises?.GRAMMAR_TESTS || [];
    if (category === "vocab") return levelData?.exercises?.VOCAB_TESTS || [];
    return [];
  }, [levelData, category]);

  const currentTest = useMemo(() => categoryTests.find((t: any) => t.id === testId) as Test | undefined, [categoryTests, testId]);

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null || !currentTest) return;
    setSelectedOption(option);
    const q = currentTest.questions[currentStep];
    const correct = !q.answer || option.toLowerCase().trim() === q.answer.toLowerCase().trim();
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentStep < currentTest.questions.length - 1) {
        setCurrentStep(s => s + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restart = () => { setCurrentStep(0); setScore(0); setShowResult(false); setSelectedOption(null); setIsCorrect(null); };

  if (showResult && currentTest) return <TestResult score={score} total={currentTest.questions.length} onRestart={restart} onBack={() => navigate(`/${levelId}/exercises/${category}`)} />;

  if (!testId) return <TestSelection category={category || ""} tests={categoryTests as any} onSelect={id => navigate(`/${levelId}/exercises/${category}/${id}`)} />;

  if (!currentTest) return <div className="text-center py-20 text-white">Test Not Found</div>;

  return <TestTaking test={currentTest} currentStep={currentStep} score={score} selectedOption={selectedOption} isCorrect={isCorrect} onOptionClick={handleOptionClick} onBack={() => navigate(`/${levelId}/exercises/${category}`)} />;
}
