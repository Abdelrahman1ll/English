import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Building2, MessageCircle, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { JobCard } from "./JobCard";
import { PhraseCard } from "./PhraseCard";
import type { VocabularyItem, JobsData } from "./types";

export function JobsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawJobsData = useMemo(() => (levelData?.vocabulary?.JOBS_DATA as JobsData) || { PROFESSIONS: [], PLACES: [], PHRASES: [] }, [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawJobsData.PROFESSIONS?.forEach(i => items.push({ primary: i.text, secondary: i.translation || "", category: "Professions" }));
    rawJobsData.PLACES?.forEach(i => items.push({ primary: i.text, secondary: i.translation || "", category: "Workplaces" }));
    rawJobsData.PHRASES?.forEach(i => items.push({ primary: i.text, secondary: i.translation || "", category: "Phrases" }));
    return items;
  }, [rawJobsData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filter = (items: readonly VocabularyItem[]) => items.filter(i => i.text.toLowerCase().includes(term) || i.translation?.toLowerCase().includes(term));
    return { PROFESSIONS: filter(rawJobsData.PROFESSIONS), PLACES: filter(rawJobsData.PLACES), PHRASES: filter(rawJobsData.PHRASES) };
  }, [rawJobsData, searchQuery]);

  const handleItemClick = (item: VocabularyItem) => {
    speak(item.text, () => setPlayingItem(null));
    setPlayingItem(item.text);
    setPracticeWord(item.text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><Briefcase className="text-blue-400" /> Jobs & Workplaces</h1>
        <p className="text-neutral-400 mt-2">Master the vocabulary of professions and where people work.</p>
      </header>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}><LayoutGrid size={20} /> <span className="font-bold">Grid View</span></button>
        <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}><Focus size={20} /> <span className="font-bold">Study Mode</span></button>
      </div>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all font-arabic" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <JobSection icon={Briefcase} title="Professions" color="blue" items={filteredData.PROFESSIONS} studyItems={studyItems} activeWord={activeWord} playingItem={playingItem} onItemClick={handleItemClick} />
            <JobSection icon={Building2} title="Workplaces" color="emerald" items={filteredData.PLACES} studyItems={studyItems} activeWord={activeWord} playingItem={playingItem} onItemClick={handleItemClick} />
          </div>

          <div className="space-y-8 mt-12">
            <SectionHeader icon={MessageCircle} title="Useful Phrases" color="amber" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.PHRASES.map(p => (
                <PhraseCard key={p.text} item={p} isActive={activeWord === p.text} isPlaying={playingItem === p.text} studyItems={studyItems} onClick={handleItemClick} />
              ))}
            </div>
          </div>
        </>
      )}
      <InstructionCard />
    </div>
  );
}

function SectionHeader({ icon: Icon, title, color }: any) {
  const colorMap: any = { blue: "text-blue-400", emerald: "text-emerald-400", amber: "text-amber-400" };
  return (
    <div className="flex items-center gap-3 text-white mb-6 border-b border-white/5 pb-3">
      <div className={`p-2.5 bg-white/5 rounded-xl ${colorMap[color]}`}><Icon size={20} /></div>
      <h2 className="font-black uppercase tracking-widest text-sm opacity-70">{title}</h2>
    </div>
  );
}

function JobSection({ icon, title, color, items, studyItems, activeWord, playingItem, onItemClick }: any) {
  return (
    <div>
      <SectionHeader icon={icon} title={title} color={color} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((job: any) => (
          <JobCard key={job.text} item={job} index={studyItems.findIndex((s: any) => s.primary === job.text)} isActive={activeWord === job.text} isPlaying={playingItem === job.text} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}
