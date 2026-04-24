import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Book, Search } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import type { VocabularyItem } from "../../../data/levels";
import { VerbCard } from "./VerbCard";

export function VerbsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.vocabulary?.BASIC_VERBS as readonly VocabularyItem[]) || [], [levelData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawData.filter(i => i.english?.toLowerCase().includes(term) || i.arabic?.includes(searchQuery));
  }, [rawData, searchQuery]);

  const handleCardClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Book className="text-emerald-400" size={32} /> Basic Verbs</h1>
        <p className="text-neutral-400 mt-3 text-lg">Master essential verbs for everyday communication.</p>
      </header>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
        <input type="text" placeholder="Search verbs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-emerald-500/50 outline-hidden font-arabic" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(item => <VerbCard key={item.english} item={item} isActive={activeWord === item.english} isPlaying={playingItem === item.english} onClick={handleCardClick} />)}
      </div>
    </div>
  );
}
