import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Ghost, Sparkles, Search, Focus, LayoutGrid } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { MagicECard } from "./MagicECard";
import { SilentLetterCard } from "./SilentLetterCard";
import type { PhonicsDataStructure, SilentLetterItem } from "./types";

export function PhonicsWordsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  
  const { activeWord, setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const rawPhonicsData = useMemo(() => (levelData?.vocabulary?.PHONICS_DATA as PhonicsDataStructure) || { MAGIC_E: [], SILENT_LETTERS: {} }, [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawPhonicsData.MAGIC_E.forEach(p => {
      items.push({ primary: p.short, secondary: p.shortAr, category: "Magic E (Short)" });
      items.push({ primary: p.long, secondary: p.longAr, category: "Magic E (Long)" });
    });
    Object.entries(rawPhonicsData.SILENT_LETTERS).forEach(([letter, words]) => words.forEach(i => items.push({ primary: i.word, secondary: i.arabic, category: `Silent ${letter}` })));
    return items;
  }, [rawPhonicsData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filteredMagicE = rawPhonicsData.MAGIC_E.filter(p => p.short.toLowerCase().includes(term) || p.long.toLowerCase().includes(term) || p.shortAr.includes(searchQuery) || p.longAr.includes(searchQuery));
    const filteredSilent: Record<string, SilentLetterItem[]> = {};
    Object.entries(rawPhonicsData.SILENT_LETTERS).forEach(([letter, words]) => {
      const match = words.filter(i => i.word.toLowerCase().includes(term) || i.arabic.includes(searchQuery));
      if (match.length > 0) filteredSilent[letter] = match;
    });
    return { MAGIC_E: filteredMagicE, SILENT_LETTERS: filteredSilent };
  }, [rawPhonicsData, searchQuery]);

  const handleWordClick = (word: string) => { speak(word, () => setPlayingWord(null)); setPlayingWord(word); setPracticeWord(word); };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><Search className="text-blue-400" /> Word Bank</h1>
          <p className="text-neutral-400 mt-2">Explore words with special sounds and rules.</p>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
          <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
          <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
        </div>
      </header>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-4 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all font-arabic shadow-2xl" />
          </div>

          {filteredData.MAGIC_E.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2 uppercase tracking-widest pl-4 border-l-4 border-amber-500/50"><Sparkles size={20} /> Magic E</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredData.MAGIC_E.map((pair, idx) => <MagicECard key={idx} pair={pair} activeWord={activeWord} playingWord={playingWord} studyItems={studyItems} onClick={handleWordClick} />)}
              </div>
            </section>
          )}

          {Object.entries(filteredData.SILENT_LETTERS).map(([letter, words]) => (
            <section key={letter} className="space-y-6">
              <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2 uppercase tracking-widest pl-4 border-l-4 border-rose-500/50"><Ghost size={20} /> Silent {letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {words.map(item => <SilentLetterCard key={item.word} item={item} activeWord={activeWord} playingWord={playingWord} studyItems={studyItems} onClick={handleWordClick} />)}
              </div>
            </section>
          ))}
        </>
      )}
      <InstructionCard />
    </div>
  );
}
