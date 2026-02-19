import { useState } from "react";
import { Search, Volume2, Brain, Sparkles, Filter } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { useSearch } from "../hooks/useSearch";
import type { SearchItem } from "../hooks/useSearch";
import { SearchOverlay } from "./SearchOverlay";

export function SearchPage() {
  const { searchTerm, setSearchTerm, filteredItems } = useSearch();
  const { speak } = useSpeech();
  const { setPracticeWord, activeWord } = usePractice();
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 text-blue-400 mb-4 animate-bounce-slow">
          <Sparkles size={32} />
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight">
          Global <span className="text-blue-400">Search</span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto font-medium">
          Find any word or phrase across the entire curriculum and start
          practicing instantly.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
        <div className="relative bg-[#1a1a1a] rounded-4xl p-2 flex items-center gap-4 focus-within:border-blue-500/50 transition-all shadow-2xl">
          <div className="pl-6 text-neutral-500 shrink-0">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Search by English or Arabic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-xl py-4 pr-6 text-white placeholder:text-neutral-600 font-medium"
            autoFocus
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchTerm && filteredItems.length > 0 ? (
          filteredItems.map((item: SearchItem, idx: number) => (
            <div
              key={`${item.text}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className={`bg-[#1e1e1e] border p-6 rounded-3xl flex items-center justify-between group transition-all cursor-pointer ${
                activeWord === item.text
                  ? "border-blue-500/50 bg-blue-500/10 shadow-xl scale-[1.02] z-10"
                  : "border-white/5 hover:bg-white/5 hover:border-blue-500/30 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
              }`}
            >
              <div className="space-y-1.5 flex-1 overflow-hidden">
                <div className="flex items-center gap-3">
                  <h3
                    className={`text-2xl font-black transition-colors ${
                      activeWord === item.text
                        ? "text-blue-400"
                        : "text-white group-hover:text-blue-400"
                    } truncate`}
                  >
                    {item.text}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black text-neutral-500 uppercase tracking-wider shrink-0">
                    {item.source}
                  </span>
                </div>
                <p className="text-lg text-neutral-500 font-arabic">
                  {item.translation}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(item.text);
                  }}
                  className="p-3 bg-white/5 hover:bg-blue-600/20 text-neutral-400 hover:text-blue-400 rounded-2xl transition-all hover:scale-110 active:scale-90"
                  title="Listen"
                >
                  <Volume2 size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPracticeWord(item.text);
                  }}
                  className="p-3 bg-white/5 hover:bg-emerald-600/20 text-neutral-400 hover:text-emerald-400 rounded-2xl transition-all hover:scale-110 active:scale-90"
                  title="Practice"
                >
                  <Brain size={24} />
                </button>
              </div>
            </div>
          ))
        ) : searchTerm ? (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-neutral-700">
              <Filter size={40} />
            </div>
            <p className="text-neutral-500 text-xl font-medium">
              No results found for "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="col-span-full py-20 text-center space-y-4 bg-blue-500/5 rounded-[3rem] border border-dashed border-blue-500/20">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-400 mb-2">
              <Search size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white">Start Searching</h2>
            <p className="text-neutral-400 max-w-sm mx-auto">
              Type at least one character to search through all lessons,
              vocabulary, and phonetic patterns.
            </p>
          </div>
        )}
      </div>

      {selectedItem && (
        <SearchOverlay
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSpeak={speak}
          onPractice={setPracticeWord}
        />
      )}
    </div>
  );
}
