import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, Volume2, Brain, Sparkles, Filter } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

type SearchItem = {
  text: string;
  translation: string;
  source: string;
};

export function SearchPage() {
  const { levelId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { speak } = useSpeech();
  const { setPracticeWord } = usePractice();

  const allItems = useMemo(() => {
    const items: SearchItem[] = [];
    if (!levelId || !LEVEL_DATA[levelId]) return items;

    const currentLevel = LEVEL_DATA[levelId];

    // Helper to extract items from diverse structures
    const processData = (data: any, source: string) => {
      if (!data) return;

      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (!item) return;

          const text =
            item.word ||
            item.text ||
            item.name ||
            item.singular ||
            item.en ||
            item.english;
          const translation =
            item.arabic || item.translation || item.ar || item.plural;

          if (text && translation) {
            items.push({ text, translation, source });
          }

          // Handle nested arrays like 'examples' or 'items' within an item
          if (item.examples && Array.isArray(item.examples)) {
            processData(item.examples, source);
          }
          if (item.items && Array.isArray(item.items)) {
            processData(item.items, source);
          }
          if (item.dialogue && Array.isArray(item.dialogue)) {
            processData(item.dialogue, `${source} - Dialogue`);
          }
        });
      } else if (typeof data === "object") {
        Object.keys(data).forEach((key) => {
          // Skip known non-data keys or recursion-heavy keys if any
          if (typeof data[key] === "function") return;
          processData(data[key], `${source}`);
        });
      }
    };

    // Index Vocabulary
    if (currentLevel.vocabulary) {
      Object.keys(currentLevel.vocabulary).forEach((key) => {
        processData(currentLevel.vocabulary[key], key.replace("_DATA", ""));
      });
    }

    // Index Sentences
    if (currentLevel.sentences) {
      processData(currentLevel.sentences, "Sentences");
    }

    // Index Grammar
    if (currentLevel.grammar) {
      processData(currentLevel.grammar, "Grammar");
    }

    // Index Conversations
    if (currentLevel.conversations) {
      processData(currentLevel.conversations, "Conversations");
    }

    return items;
  }, [levelId]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];

    return allItems
      .filter(
        (item: SearchItem) =>
          item.text?.toLowerCase().includes(term) ||
          item.translation?.toLowerCase().includes(term),
      )
      .slice(0, 50);
  }, [searchTerm, allItems]);

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
              className="bg-[#1e1e1e] border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/5 hover:border-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {item.text}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-black text-neutral-500 uppercase tracking-wider">
                    {item.source}
                  </span>
                </div>
                <p className="text-lg text-neutral-500 font-arabic">
                  {item.translation}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speak(item.text)}
                  className="p-3 bg-white/5 hover:bg-blue-600/20 text-neutral-400 hover:text-blue-400 rounded-2xl transition-all hover:scale-110 active:scale-90"
                  title="Listen"
                >
                  <Volume2 size={24} />
                </button>
                <button
                  onClick={() => setPracticeWord(item.text)}
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
    </div>
  );
}
