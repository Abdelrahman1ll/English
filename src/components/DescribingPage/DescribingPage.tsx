import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { User, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import type { VocabularyItem } from "../../data/levels";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { DescribingSection } from "./DescribingSection";
import type { DescribingData } from "./types";

export function DescribingPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.vocabulary?.DESCRIBING_DATA as DescribingData) || { PHYSICAL: [], CHARACTER_SENTENCES: [], VOCABULARY: [] }, [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawData.VOCABULARY.forEach(cat => cat.items.forEach(i => items.push({ primary: i.text || "", secondary: i.translation || "", category: cat.title })));
    rawData.PHYSICAL.forEach(i => items.push({ primary: i.text || "", secondary: i.translation || "", category: "Physical Appearance" }));
    return items;
  }, [rawData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filter = (arr: readonly VocabularyItem[]) => arr.filter(i => i.text?.toLowerCase().includes(term) || i.translation?.includes(searchQuery));
    return { PHYSICAL: filter(rawData.PHYSICAL), CHARACTER_SENTENCES: filter(rawData.CHARACTER_SENTENCES), VOCABULARY: rawData.VOCABULARY.map(cat => ({ ...cat, items: filter(cat.items) })).filter(cat => cat.items.length > 0) };
  }, [rawData, searchQuery]);

  const handleCardClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><User className="text-pink-400" size={32} /> Describing People</h1>
        <p className="text-neutral-400 mt-3 text-lg">Master the art of describing appearances and personalities.</p>
      </header>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden font-arabic" />
          </div>

          <section className="space-y-10">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400"><Search size={24} /></div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Vocabulary Essentials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.VOCABULARY.map(cat => (
                <DescribingSection key={cat.title} category={cat} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onCardClick={handleCardClick} />
              ))}
            </div>
          </section>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
