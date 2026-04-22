import { useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { BasicCard } from "./BasicCard";
import { QuizSection } from "./QuizSection";
import type { BasicItem, BasicsData } from "./types";

export function BasicsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const BASICS_DATA = (levelData?.vocabulary?.BASICS_DATA as BasicsData) || {
    ARTICLES: [], PRONOUNS: [], POSSESSIVES: [], QUIZ: [],
  };

  const { setPracticeWord, activeWord } = usePractice();
  const [speakingItem, setSpeakingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [isStudyMode, setIsStudyMode] = useState(false);
  const { speak } = useSpeech();
  const lastSpeechId = useRef<number>(0);

  const studyItems: StudyItem[] = useMemo(() => {
    const all = [...BASICS_DATA.ARTICLES, ...BASICS_DATA.PRONOUNS, ...BASICS_DATA.POSSESSIVES];
    return all.map((item) => ({
      primary: item.word, secondary: item.arabic, note: item.example, category: "Basics",
    }));
  }, [BASICS_DATA]);

  const handleItemClick = (item: BasicItem) => {
    setSpeakingItem(item.word);
    setPracticeWord(item.word);
    const currentId = Date.now();
    lastSpeechId.current = currentId;
    speak(item.word, () => {
      if (lastSpeechId.current === currentId) setSpeakingItem(null);
    });
  };

  const handleQuizOptionClick = (questionIndex: number, option: string) => {
    const isCorrect = option.toLowerCase() === BASICS_DATA.QUIZ[questionIndex].answer.toLowerCase();
    speak(isCorrect ? "Correct!" : "Try again.");
    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Sparkles className="text-blue-400" /> Basics
        </h1>
        <p className="text-neutral-400 mt-2">Essential building blocks: Articles, Pronouns, and Possessives.</p>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
          <LayoutGrid size={20} /> <span className="font-bold">Grid View</span>
        </button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
          <Focus size={20} /> <span className="font-bold">Study Mode</span>
        </button>
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          <Section title="Articles (أدوات التعريف والنكرة)" color="blue" items={BASICS_DATA.ARTICLES} studyItems={studyItems} activeWord={activeWord} speakingItem={speakingItem} onItemClick={handleItemClick} />
          <Section title="Subject Pronouns (ضمائر الفاعل)" color="emerald" items={BASICS_DATA.PRONOUNS} studyItems={studyItems} activeWord={activeWord} speakingItem={speakingItem} onItemClick={handleItemClick} />
          <Section title="Possessive Adjectives (صفات الملكية)" color="purple" items={BASICS_DATA.POSSESSIVES} studyItems={studyItems} activeWord={activeWord} speakingItem={speakingItem} onItemClick={handleItemClick} />
          <QuizSection quizData={BASICS_DATA.QUIZ} quizAnswers={quizAnswers} onOptionClick={handleQuizOptionClick} />
        </>
      )}
      <InstructionCard />
    </div>
  );
}

interface SectionProps {
  title: string;
  color: string;
  items: BasicItem[];
  studyItems: StudyItem[];
  activeWord: string | null;
  speakingItem: string | null;
  onItemClick: (item: BasicItem) => void;
}

function Section({
  title,
  color,
  items,
  studyItems,
  activeWord,
  speakingItem,
  onItemClick,
}: SectionProps) {
  return (
    <section className="space-y-6">
      <h2
        className={`font-bold text-white pl-4 border-l-4 border-${color}-500 uppercase tracking-widest text-sm`}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item: BasicItem) => (
          <BasicCard
            key={item.word}
            item={item}
            color={color}
            index={studyItems.findIndex((s) => s.primary === item.word)}
            isActive={activeWord === item.word}
            isSpeaking={speakingItem === item.word}
            onClick={onItemClick}
          />
        ))}
      </div>
    </section>
  );
}
