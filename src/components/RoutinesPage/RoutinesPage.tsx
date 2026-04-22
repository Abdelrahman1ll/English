import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Clock, Search, BookOpen, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import type { VocabularyItem, SentenceItem } from "../../data/levels";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { RoutineCard } from "./RoutineCard";

export function RoutinesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawVocab = useMemo(() => (levelData?.vocabulary?.ROUTINES_VOCAB as readonly VocabularyItem[]) || [], [levelData]);
  const rawSentences = useMemo(() => (levelData?.sentences?.ROUTINES_SENTENCES as readonly SentenceItem[]) || [], [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawVocab.forEach(i => items.push({ primary: i.english || "", secondary: i.arabic || "", category: "Routine Vocabulary" }));
    rawSentences.forEach(i => items.push({ primary: i.english || "", secondary: i.arabic || "", category: "Routine Sentences" }));
    return items;
  }, [rawVocab, rawSentences]);

  const filteredVocab = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawVocab.filter(i => i.english?.toLowerCase().includes(term) || i.arabic?.includes(searchQuery));
  }, [rawVocab, searchQuery]);

  const filteredSentences = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawSentences.filter(i => i.english?.toLowerCase().includes(term) || i.arabic?.includes(searchQuery));
  }, [rawSentences, searchQuery]);

  const handleCardClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Clock className="text-blue-400" size={32} /> Daily Routines</h1>
        <p className="text-neutral-400 mt-3 text-lg">Learn vocabulary and phrases about your daily activities.</p>
      </header>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all font-arabic" />
          </div>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3"><BookOpen size={24} className="text-blue-400" /> Vocabulary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVocab.map(item => <RoutineCard key={item.english} english={item.english || ""} arabic={item.arabic || ""} index={studyItems.findIndex(s => s.primary === item.english)} isActive={activeWord === item.english} isPlaying={playingItem === item.english} activeColor="blue" studyItems={studyItems} onClick={handleCardClick} />)}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3"><Clock size={24} className="text-amber-400" /> Common Sentences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSentences.map(item => <RoutineCard key={item.english} english={item.english || ""} arabic={item.arabic || ""} index={studyItems.findIndex(s => s.primary === item.english)} isActive={activeWord === item.english} isPlaying={playingItem === item.english} activeColor="amber" studyItems={studyItems} onClick={handleCardClick} />)}
            </div>
          </section>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
