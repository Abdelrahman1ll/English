import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { LEVELS } from "../../../data/levels";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";

interface GrammarTemplateProps {
  topicId: string;
  renderGrid: (props: {
    grammar: any;
    activeWord: string | null;
    playingItem: string | null;
    studyItems: StudyItem[];
    onItemClick: (text: string) => void;
  }) => React.ReactNode;
  getStudyItems: (grammar: any) => StudyItem[];
}

export function GrammarTemplate({
  topicId,
  renderGrid,
  getStudyItems,
}: GrammarTemplateProps) {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const levelData = levelId ? (LEVEL_DATA as any)[levelId] : null;
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  useEffect(() => {
    if (levelId && !levelData?.grammar) {
      navigate(`/${levelId}/home`);
    }
  }, [levelId, levelData, navigate]);

  const studyItems = useMemo(() => {
    if (!levelData?.grammar) return [];
    return getStudyItems(levelData.grammar);
  }, [levelData, getStudyItems]);

  const handleItemClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  const currentModule = useMemo(() => {
    const levelConfig = LEVELS.find((l) => l.id === levelId);
    // Find module by matching the end of the path (since we'll remove /grammar prefix)
    return levelConfig?.modules.find(
      (m) => m.to.endsWith(`/${topicId}`),
    );
  }, [levelId, topicId]);

  if (!levelData) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
            <Book className="text-emerald-400" size={32} />{" "}
            {currentModule?.title || "Grammar Essentials"}
          </h1>
          <p className="text-neutral-400 mt-3 text-lg leading-relaxed">
            {currentModule?.description ||
              "Master the foundation of English grammar."}
          </p>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#1a1a1a] rounded-xl border border-white/5 w-fit">
          <button
            onClick={() => setIsStudyMode(false)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300"}`}
          >
            <LayoutGrid size={16} /> Grid View
          </button>
          <button
            onClick={() => setIsStudyMode(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-300"}`}
          >
            <Focus size={16} /> Study Mode
          </button>
        </div>
      </header>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        renderGrid({
          grammar: levelData.grammar,
          activeWord,
          playingItem,
          studyItems,
          onItemClick: handleItemClick,
        })
      )}
    </div>
  );
}
