import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { User, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import type { SentenceItem } from "../../data/levels";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { DescribingSentenceCard } from "./DescribingSentenceCard";

export function DescribingSentencesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawSentences = useMemo(() => ((levelData?.sentences as any)?.SENTENCES_DATA || []) as SentenceItem[], [levelData]);

  const filteredSentences = useMemo(() => {
    const categories = ["Appearance Phrases", "Personality Phrases"];
    return rawSentences.filter(s => categories.includes(s.category) && (s.english.toLowerCase().includes(searchQuery.toLowerCase()) || s.arabic.includes(searchQuery)));
  }, [rawSentences, searchQuery]);

  const groupedSentences = useMemo(() => {
    const groups: Record<string, { icon: any; items: SentenceItem[] }> = {};
    filteredSentences.forEach(s => {
      if (!groups[s.category]) groups[s.category] = { icon: s.icon, items: [] };
      groups[s.category].items.push(s);
    });
    return groups;
  }, [filteredSentences]);

  const studyItems: StudyItem[] = useMemo(() => filteredSentences.map(s => ({ primary: s.english, secondary: s.arabic, category: s.category, note: s.note })), [filteredSentences]);

  const handleSpeak = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><div className="p-3 bg-pink-500/10 rounded-2xl"><User className="text-pink-400" size={32} /></div> Describing Phrases</h1>
        <p className="text-neutral-400 mt-4 text-lg">Practical sentences for describing how people look and act.</p>
      </header>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-pink-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-pink-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-pink-500/50 outline-hidden font-arabic" />
          </div>

          <div className="space-y-16">
            {Object.entries(groupedSentences).map(([category, { icon: Icon, items }]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  {Icon && <Icon className="text-pink-400" size={24} />}
                  <h2 className="text-2xl font-bold text-white tracking-tight">{category}</h2>
                  <div className="h-px bg-white/5 flex-1 ml-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((s, idx) => <DescribingSentenceCard key={`${category}-${idx}`} sentence={s} index={filteredSentences.indexOf(s)} isActive={activeWord === s.english} isPlaying={playingItem === s.english} onClick={handleSpeak} />)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
