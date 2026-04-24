import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Clock, MessageSquare, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { InstructionCard } from "../../shared/InstructionCard";
import { TimePhraseCard } from "./TimePhraseCard";
import { DialogueCard } from "./DialogueCard";
import type { TimePhrase, Dialogue } from "./types";

export function TellingTimePage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawPhrases = useMemo(() => (levelData?.sentences?.TELLING_TIME_PHRASES as readonly TimePhrase[]) || [], [levelData]);
  const rawDialogues = useMemo(() => (levelData?.sentences?.TIME_DIALOGUES as readonly Dialogue[]) || [], [levelData]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawPhrases.forEach(p => items.push({ primary: p.english, secondary: p.arabic, category: "Time Phrases" }));
    rawDialogues.forEach(d => d.dialogue.forEach(line => items.push({ primary: line.text, secondary: line.arabic, category: `Dialogue: ${d.title}` })));
    return items;
  }, [rawPhrases, rawDialogues]);

  const filteredPhrases = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawPhrases.filter(i => i.english?.toLowerCase().includes(term) || i.arabic?.includes(searchQuery));
  }, [rawPhrases, searchQuery]);

  const handleCardClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Clock className="text-amber-400" size={32} /> Telling Time</h1>
        <p className="text-neutral-400 mt-3 text-lg">Master how to ask for and tell the time in English.</p>
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
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3"><Clock size={24} className="text-amber-400" /> Common Phrases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredPhrases.map((item, idx) => <TimePhraseCard key={item.english} item={item} index={idx} isActive={activeWord === item.english} isPlaying={playingItem === item.english} onClick={handleCardClick} />)}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3"><MessageSquare size={24} className="text-blue-400" /> Time Dialogues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rawDialogues.map(d => <DialogueCard key={d.id} dialogue={d} onClick={handleCardClick} />)}
            </div>
          </section>
        </>
      )}
      <InstructionCard />
    </div>
  );
}
