import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Calendar, LayoutGrid, Focus, Search } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { MonthCard } from "./MonthCard";
import { DayCard } from "./DayCard";
import { TimeSection } from "./TimeSection";
import type { CalendarDataStructure } from "./types";

export function MonthsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"months" | "days">("months");
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak, cancel } = useSpeech();

  useEffect(() => { cancel(); }, [activeTab, cancel]);

  const rawData = useMemo(() => (levelData?.vocabulary?.CALENDAR_DATA as CalendarDataStructure) || { MONTHS: [], DAYS: [], TIME_VOCABULARY: [] }, [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawData.MONTHS.forEach(m => items.push({ primary: m.name, secondary: m.arabic, category: "Months" }));
    rawData.DAYS.forEach(d => items.push({ primary: d.name, secondary: d.arabic, category: "Days of the Week", note: d.sentence }));
    rawData.TIME_VOCABULARY.forEach(cat => cat.items.forEach(i => items.push({ primary: i.text, secondary: i.translation, category: cat.category })));
    return items;
  }, [rawData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filter = (arr: readonly any[]) => arr.filter(i => (i.name || i.text || "").toLowerCase().includes(term) || (i.arabic || i.translation || "").includes(searchQuery));
    return { MONTHS: filter(rawData.MONTHS), DAYS: filter(rawData.DAYS), TIME_VOCABULARY: rawData.TIME_VOCABULARY.map(cat => ({ ...cat, items: filter(cat.items) })).filter(cat => cat.items.length > 0) };
  }, [rawData, searchQuery]);

  const handleWordClick = (word: string, sentence?: string) => { speak(sentence || word, () => setPlayingItem(null)); setPlayingItem(sentence || word); setPracticeWord(word); };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><Calendar className="text-blue-400" /> Months & Calendar</h1>
          <p className="text-neutral-400 mt-2">Months, Days, and Date vocabulary.</p>
        </div>
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

          <div className="flex gap-4 border-b border-white/5 pb-1">
            <TabButton active={activeTab === "months"} onClick={() => setActiveTab("months")}>Months Practice</TabButton>
            <TabButton active={activeTab === "days"} onClick={() => setActiveTab("days")}>Days & Time</TabButton>
          </div>

          <div className="space-y-8">
            {activeTab === "months" && (
              <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredData.MONTHS.map(m => <MonthCard key={m.name} month={m} isActive={activeWord === m.name} isPlaying={playingItem === m.name} studyItems={studyItems} onClick={handleWordClick} />)}
                </div>
              </div>
            )}
            {activeTab === "days" && (
              <div className="space-y-12">
                <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 uppercase tracking-widest"><Calendar className="text-purple-400" size={20} /> Days of the Week</h2>
                  <div className="flex flex-col gap-3">
                    {filteredData.DAYS.map(d => <DayCard key={d.name} day={d} isActive={activeWord === d.name} isPlaying={playingItem === d.sentence} studyItems={studyItems} onClick={handleWordClick} />)}
                  </div>
                </div>
                <TimeSection data={filteredData.TIME_VOCABULARY} studyItems={studyItems} activeWord={activeWord} playingItem={playingItem} onVocabClick={t => handleWordClick(t)} />
              </div>
            )}
          </div>
        </>
      )}
      <InstructionCard />
    </div>
  );
}

function TabButton({ children, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`px-6 py-3 font-bold rounded-t-xl transition-all relative top-px ${active ? "bg-[#1e1e1e] text-white border-t border-x border-white/5" : "text-neutral-500 hover:text-neutral-300"}`}>
      {children}
    </button>
  );
}
