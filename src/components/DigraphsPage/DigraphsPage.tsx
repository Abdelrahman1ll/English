import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Split, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { InstructionCard } from "../shared/InstructionCard";
import { DigraphCard } from "./DigraphCard";
import type { DigraphData, DigraphItem } from "./types";

export function DigraphsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">("consonants");
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.vocabulary?.DIGRAPHS_DATA as DigraphData) || { CONSONANTS: [], VOWELS: [] }, [levelData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filter = (items: readonly DigraphItem[]) => items.filter(i => i.digraph.toLowerCase().includes(term) || i.examples.some(ex => ex.text.toLowerCase().includes(term) || ex.translation.includes(searchQuery)));
    return { CONSONANTS: filter(rawData.CONSONANTS), VOWELS: filter(rawData.VOWELS) };
  }, [rawData, searchQuery]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    const all = [...rawData.CONSONANTS, ...rawData.VOWELS];
    all.forEach(d => {
      items.push({ primary: d.digraph, secondary: d.pronunciation || d.sound || "", category: "Digraph Sound" });
      d.examples.forEach(ex => items.push({ primary: ex.text, secondary: ex.translation, category: `Examples for ${d.digraph}` }));
    });
    return items;
  }, [rawData]);

  const handleDigraphClick = (item: DigraphItem) => {
    const text = `${item.sound || item.digraph}, ${item.examples[0]?.text || ""}`;
    speak(text, () => setPlayingItem(null));
    setPlayingItem(item.digraph);
    setPracticeWord(item.digraph);
  };

  const handleExampleClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    speak(word, () => setPlayingItem(null));
    setPlayingItem(word);
    setPracticeWord(word);
  };

  const currentData = activeTab === "consonants" ? filteredData.CONSONANTS : filteredData.VOWELS;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><Split className="text-blue-400" /> Digraphs</h1>
          <p className="text-neutral-400 mt-2">Two letters making one unique sound.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-hidden font-arabic shadow-xl" />
          </div>
          <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner shrink-0">
            <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><LayoutGrid size={18} /><span className="font-bold">Grid View</span></button>
            <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}><Focus size={18} /><span className="font-bold">Study Mode</span></button>
          </div>
          {!isStudyMode && (
            <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner shrink-0">
              <button onClick={() => setActiveTab("consonants")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "consonants" ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg" : "text-neutral-500 hover:text-white"}`}>Consonants</button>
              <button onClick={() => setActiveTab("vowels")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${activeTab === "vowels" ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg" : "border-transparent text-neutral-500 hover:text-white"}`}>Vowels</button>
            </div>
          )}
        </div>
      </header>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map(item => <DigraphCard key={item.digraph} item={item} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onDigraphClick={handleDigraphClick} onExampleClick={handleExampleClick} />)}
        </div>
      )}
      <InstructionCard />
    </div>
  );
}
