import { useState } from "react";
import { Search, Sparkles, Filter } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { useSearch, type SearchItem } from "../../hooks/useSearch";
import { SearchOverlay } from "../SearchOverlay";
import { SearchResultCard } from "./SearchResultCard";

export function SearchPage() {
  const { searchTerm, setSearchTerm, filteredItems } = useSearch();
  const { speak } = useSpeech();
  const { setPracticeWord, activeWord } = usePractice();
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 text-blue-400 mb-4 animate-bounce-slow"><Sparkles size={32} /></div>
        <h1 className="text-5xl font-black text-white tracking-tight">Global <span className="text-blue-400">Search</span></h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto font-medium">Find any word or phrase across the entire curriculum.</p>
      </header>

      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
        <div className="relative bg-[#1a1a1a] rounded-4xl p-2 flex items-center gap-4 border border-white/5 focus-within:border-blue-500/50 transition-all shadow-2xl">
          <div className="pl-6 text-neutral-500 shrink-0"><Search size={24} /></div>
          <input type="text" placeholder="Search by English or Arabic..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 focus:outline-hidden text-xl py-4 pr-6 text-white placeholder:text-neutral-600 font-medium" autoFocus />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchTerm && filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => <SearchResultCard key={`${item.text}-${idx}`} item={item} isActive={activeWord === item.text} onSelect={() => setSelectedItem(item)} onSpeak={speak} onPractice={setPracticeWord} />)
        ) : searchTerm ? (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-neutral-700"><Filter size={40} /></div>
            <p className="text-neutral-500 text-xl font-medium">No results found for "{searchTerm}"</p>
          </div>
        ) : (
          <div className="col-span-full py-20 text-center space-y-4 bg-blue-500/5 rounded-[3rem] border border-dashed border-blue-500/20">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-400 mb-2"><Search size={40} /></div>
            <h2 className="text-2xl font-bold text-white">Start Searching</h2>
            <p className="text-neutral-400 max-w-sm mx-auto">Type at least one character to search through all lessons.</p>
          </div>
        )}
      </div>

      {selectedItem && <SearchOverlay item={selectedItem} onClose={() => setSelectedItem(null)} onSpeak={speak} onPractice={setPracticeWord} />}
    </div>
  );
}
