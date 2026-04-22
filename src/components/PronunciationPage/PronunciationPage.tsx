import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Brain } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { PronunciationSoundCard } from "./PronunciationSoundCard";

export function PronunciationPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const pronunciationData = useMemo(() => (levelData?.vocabulary?.PRONUNCIATION_DATA as any[]) || [], [levelData]);

  const voicelessItems = useMemo(() => pronunciationData.filter(i => i.type === "voiceless"), [pronunciationData]);
  const voicedItems = useMemo(() => pronunciationData.filter(i => i.type === "voiced"), [pronunciationData]);

  const handleWordClick = (word: string) => { speak(word, () => setPlayingItem(null)); setPlayingItem(word); setPracticeWord(word); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Brain className="text-purple-400" size={32} /> Pronunciation Tips</h1>
        <p className="text-neutral-400 mt-3 text-lg">Master the sounds of English consonants: Voiceless vs. Voiced.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Section title="Voiceless Consonants" desc="Vocal cords do not vibrate." borderColor="border-rose-500">
          {voicelessItems.map(item => <PronunciationSoundCard key={item.sound} item={item} activeWord={activeWord} playingItem={playingItem} onClick={handleWordClick} />)}
        </Section>

        <Section title="Voiced Consonants" desc="Vocal cords vibrate." borderColor="border-emerald-500">
          {voicedItems.map(item => <PronunciationSoundCard key={item.sound} item={item} activeWord={activeWord} playingItem={playingItem} onClick={handleWordClick} />)}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, desc, borderColor, children }: any) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-white flex items-center gap-3 border-l-4 ${borderColor} pl-4 uppercase tracking-wider`}>{title}</h2>
      <p className="text-neutral-500 text-sm">{desc}</p>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
}
