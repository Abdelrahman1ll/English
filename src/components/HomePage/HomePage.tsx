import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Volume2, Filter, Sparkles, ChevronRight } from "lucide-react";
import { useLevel } from "../../context/LevelContext";
import { useSearch, type SearchItem } from "../../hooks/useSearch";
import { useSpeech } from "../../hooks/useSpeech";
import { usePractice } from "../../context/PracticeContext";
import { SearchOverlay } from "../SearchOverlay";
import { LevelBanner } from "./LevelBanner";
import { ModuleCard } from "./ModuleCard";

export function HomePage() {
  const { currentLevel } = useLevel();
  const { searchTerm, setSearchTerm, filteredItems } = useSearch();
  const { speak } = useSpeech();
  const { setPracticeWord, activeWord } = usePractice();
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  const categories = useMemo(() => [
    { key: "words", label: "Words & Letters" },
    { key: "sentences", label: "Sentences" },
    { key: "grammar", label: "Grammar" },
    { key: "tests", label: "Tests" },
  ] as const, []);

  const hasModules = currentLevel?.modules && currentLevel.modules.length > 0;

  return (
    <div className="space-y-16 pt-8 pb-32 animate-in fade-in duration-700">
      {currentLevel && <LevelBanner level={currentLevel as any} />}

      {hasModules ? (
        <>
          <section className="space-y-8">
            <div className="flex items-center gap-4"><h3 className="text-sm font-black text-neutral-600 uppercase tracking-[0.2em]">OmniSearch</h3><div className="h-px flex-1 bg-white/5" /></div>
            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-4xl blur-xl opacity-10 focus-within:opacity-40" />
              <div className="relative bg-[#1a1a1a] rounded-4xl p-2 flex items-center gap-4 border border-white/5 focus-within:border-blue-500/50 shadow-3xl">
                <div className="pl-6 text-neutral-500"><Search size={28} /></div>
                <input type="text" placeholder={`Search all ${currentLevel?.id} lessons...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 outline-hidden text-2xl py-5 pr-6 text-white font-bold" />
              </div>
            </div>
            {searchTerm && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-top-4">
                {filteredItems.length > 0 ? filteredItems.map((item, idx) => (
                  <div key={`${item.text}-${idx}`} onClick={() => setSelectedItem(item)} className={`bg-[#1e1e1e] border p-6 rounded-3xl flex items-center justify-between group cursor-pointer ${activeWord === item.text ? "border-blue-500/50 bg-blue-500/10 shadow-xl" : "border-white/5 hover:bg-white/5"}`}>
                    <div className="space-y-1.5 overflow-hidden flex-1"><div className="flex items-center gap-2"><span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black text-neutral-600 uppercase tracking-wider">{item.source}</span><h3 className={`text-xl font-black ${activeWord === item.text ? "text-blue-400" : "text-white group-hover:text-blue-400"} truncate`}>{item.text}</h3></div><p className="text-base text-neutral-500 font-arabic truncate">{item.translation}</p></div>
                    <button onClick={(e) => { e.stopPropagation(); speak(item.text); }} className="p-2.5 bg-white/5 hover:bg-blue-600/20 text-neutral-500 hover:text-blue-400 rounded-xl"><Volume2 size={20} /></button>
                  </div>
                )) : <div className="col-span-full py-16 text-center space-y-4 bg-white/2 rounded-[3rem] border border-dashed border-white/5"><Filter size={32} className="mx-auto text-neutral-700" /><p className="text-neutral-500 font-medium">No results for "{searchTerm}"</p></div>}
              </div>
            )}
          </section>

          {!searchTerm && (
            <div className="space-y-20">
              {categories.map((category) => {
                const modules = currentLevel.modules.filter((m: any) => m.category === category.key);
                if (modules.length === 0) return null;
                return (
                  <section key={category.key} className="space-y-10">
                    <div className="flex items-center gap-6"><h3 className="text-lg font-black text-neutral-500 uppercase tracking-[0.3em]">{category.label}</h3><div className="h-px flex-1 bg-white/5" /></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                      {modules.map((module: any) => <ModuleCard key={module.to} module={module} />)}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <section className="py-20 text-center space-y-12 animate-in fade-in zoom-in">
          <div className="relative inline-block"><div className={`absolute -inset-4 bg-linear-to-r ${currentLevel?.color} opacity-20 blur-2xl rounded-full`} /><div className={`relative w-32 h-32 bg-linear-to-br ${currentLevel?.color} rounded-4xl flex items-center justify-center text-white shadow-3xl`}><Sparkles size={64} /></div></div>
          <div className="space-y-4 max-w-2xl mx-auto"><h3 className="text-4xl font-black text-white tracking-tight">Coming Soon to {currentLevel?.id}</h3><p className="text-xl text-neutral-500 font-medium">We're crafting lessons for {currentLevel?.title}. Stay tuned!</p></div>
          <Link to="/" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all">Choose Another Level <ChevronRight size={20} /></Link>
        </section>
      )}
      {selectedItem && <SearchOverlay item={selectedItem} onClose={() => setSelectedItem(null)} onSpeak={speak} onPractice={setPracticeWord} />}
    </div>
  );
}
