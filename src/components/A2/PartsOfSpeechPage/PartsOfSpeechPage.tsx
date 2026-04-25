import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { SpeechPartCard } from "./SpeechPartCard";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";

export function PartsOfSpeechPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA as any)[levelId] : null;
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const partsOfSpeech = useMemo(() => (levelData?.vocabulary?.PARTS_OF_SPEECH_DATA as any[]) || [], [levelData]);

  const studyItems = useMemo(() => {
    const items: StudyItem[] = [];
    partsOfSpeech.forEach(part => {
      part.examples.forEach((ex: any) => {
        items.push({
          primary: ex.en,
          secondary: ex.ar,
          category: part.name
        });
      });
    });
    return items;
  }, [partsOfSpeech]);

  const handleWordClick = (word: string) => { 
    speak(word, () => setPlayingItem(null)); 
    setPlayingItem(word); 
    setPracticeWord(word); 
  };

  if (!levelData) return null;

  if (isStudyMode) {
    return (
      <div className="max-w-6xl mx-auto pb-20">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Focus className="text-amber-400" size={28} /> Study Mode
          </h1>
          <button 
            onClick={() => setIsStudyMode(false)}
            className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold transition-all border border-white/5"
          >
            Back to Lesson
          </button>
        </header>
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
            <BookOpen className="text-amber-400" size={32} /> Parts of Speech 
            <span className="text-amber-400/50 font-arabic text-2xl">(أجزاء الكلام)</span>
          </h1>
          <p className="text-neutral-400 mt-2 text-lg font-arabic" dir="rtl">
            تعلم المكونات الأساسية التي تتكون منها الجمل في اللغة الإنجليزية.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/10 w-fit h-fit">
          <button
            onClick={() => setIsStudyMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isStudyMode ? "bg-amber-400 text-black shadow-xl" : "text-white/60 hover:text-white"}`}
          >
            <LayoutGrid size={16} /> Grid
          </button>
          <button
            onClick={() => setIsStudyMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isStudyMode ? "bg-amber-400 text-black shadow-xl" : "text-white/60 hover:text-white"}`}
          >
            <Focus size={16} /> Study Mode
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partsOfSpeech.map((item, idx) => {
          // Calculate start index for this card
          const startIndex = partsOfSpeech
            .slice(0, idx)
            .reduce((sum, p) => sum + p.examples.length, 0);

          return (
            <SpeechPartCard 
              key={item.id} 
              item={item} 
              activeWord={activeWord} 
              playingItem={playingItem} 
              onClick={handleWordClick} 
              startIndex={startIndex}
            />
          );
        })}
      </div>
    </div>
  );
}
