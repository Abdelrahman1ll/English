import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Globe, Languages, MessageSquare, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { InstructionCard } from "../../shared/InstructionCard";
import { LanguageCard } from "./LanguageCard";
import { PhraseCard } from "./PhraseCard";
import { EgyptianPride } from "./EgyptianPride";
import { SectionTitle } from "../../shared/SectionTitle";
import type { NationalitiesData, Language, Phrase } from "./types";

export function NationalitiesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.vocabulary?.NATIONALITIES_DATA as NationalitiesData) || { LANGUAGES: [], PHRASES: [] }, [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawData.LANGUAGES?.forEach(l => items.push({ primary: l.text, secondary: l.translation, category: "Languages" }));
    rawData.PHRASES?.forEach(p => {
      items.push({ primary: p.question, secondary: p.translation, category: "Phrases (Q)" });
      p.answers?.forEach(a => items.push({ primary: a.text, secondary: a.translation, category: "Phrases (A)" }));
    });
    return items;
  }, [rawData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filterL = (arr: readonly Language[]) => arr.filter(i => i.text.toLowerCase().includes(term) || i.translation.includes(searchQuery));
    const filterP = (arr: readonly Phrase[]) => arr.filter(i => i.question.toLowerCase().includes(term) || i.translation.includes(searchQuery) || i.answers?.some(a => a.text.toLowerCase().includes(term) || a.translation.includes(searchQuery)));
    return { LANGUAGES: filterL(rawData.LANGUAGES || []), PHRASES: filterP(rawData.PHRASES || []) };
  }, [rawData, searchQuery]);

  const handleItemClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Globe className="text-emerald-400" size={32} /> Languages & Countries</h1>
        <p className="text-neutral-400 mt-3 text-lg">Explore global languages, countries, and diverse nationalities.</p>
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
            <SectionTitle icon={Languages} title="World Languages" color="blue" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredData.LANGUAGES.map(l => <LanguageCard key={l.text} lang={l} isActive={activeWord === l.text} isPlaying={playingItem === l.text} studyItems={studyItems} onClick={handleItemClick} />)}
            </div>
          </section>

          <section className="space-y-8">
            <SectionTitle icon={MessageSquare} title="Conversation Practice" color="amber" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredData.PHRASES.map((p, idx) => <PhraseCard key={idx} phrase={p} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onClick={handleItemClick} />)}
            </div>
          </section>
        </>
      )}
      <EgyptianPride onClick={handleItemClick} />
      <InstructionCard />
    </div>
  );
}

