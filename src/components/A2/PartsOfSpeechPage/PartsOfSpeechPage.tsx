import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { SpeechPartCard } from "./SpeechPartCard";

export function PartsOfSpeechPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const partsOfSpeech = useMemo(() => (levelData?.vocabulary?.PARTS_OF_SPEECH_DATA as any[]) || [], [levelData]);

  const handleWordClick = (word: string) => { speak(word, () => setPlayingItem(null)); setPlayingItem(word); setPracticeWord(word); };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><BookOpen className="text-amber-400" size={32} /> Parts of Speech <span className="text-amber-400/50 font-arabic text-2xl">(أجزاء الكلام)</span></h1>
        <div className="text-right mt-4" dir="rtl">
          <p className="text-neutral-300 text-lg">تعلم المكونات الأساسية التي تتكون منها الجمل في اللغة الإنجليزية.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partsOfSpeech.map(item => <SpeechPartCard key={item.id} item={item} activeWord={activeWord} playingItem={playingItem} onClick={handleWordClick} />)}
      </div>
    </div>
  );
}
