import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Volume2,
  Filter,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useLevel } from "../context/LevelContext";
import { useSearch } from "../hooks/useSearch";
import type { SearchItem } from "../hooks/useSearch";
import { useSpeech } from "../hooks/useSpeech";
import { usePractice } from "../context/PracticeContext";
import { SearchOverlay } from "./SearchOverlay";

export function HomePage() {
  const { currentLevel } = useLevel();
  const { searchTerm, setSearchTerm, filteredItems } = useSearch();
  const { speak } = useSpeech();
  const { setPracticeWord, activeWord } = usePractice();
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  const categories = [
    { key: "words", label: "Words & Letters" },
    { key: "sentences", label: "Sentences" },
    { key: "grammar", label: "Grammar" },
    { key: "tests", label: "Tests" },
  ] as const;

  const getModuleStyle = (title: string) => {
    const styles: Record<string, { color: string; bg: string }> = {
      Alphabet: { color: "text-blue-400", bg: "bg-blue-400/10" },
      Basics: { color: "text-cyan-400", bg: "bg-cyan-400/10" },
      Numbers: { color: "text-orange-400", bg: "bg-orange-400/10" },
      Colors: { color: "text-rose-400", bg: "bg-rose-400/10" },
      Shapes: { color: "text-pink-400", bg: "bg-pink-400/10" },
      Calendar: { color: "text-lime-400", bg: "bg-lime-400/10" },
      Feelings: { color: "text-red-400", bg: "bg-red-400/10" },
      Jobs: { color: "text-yellow-400", bg: "bg-yellow-400/10" },
      Grammar: { color: "text-purple-400", bg: "bg-purple-400/10" },
      Exercises: { color: "text-indigo-400", bg: "bg-indigo-400/10" },
      Dialogues: { color: "text-amber-400", bg: "bg-amber-400/10" },
      "Word Bank": { color: "text-emerald-400", bg: "bg-emerald-400/10" },
      Phrases: { color: "text-pink-400", bg: "bg-pink-400/10" },
      "Daily Routines": { color: "text-blue-400", bg: "bg-blue-400/10" },
      "Basic Verbs": { color: "text-emerald-400", bg: "bg-emerald-400/10" },
    };
    return styles[title] || { color: "text-blue-400", bg: "bg-blue-400/10" };
  };

  return (
    <div className="space-y-16 py-8 animate-in fade-in duration-700">
      {/* Level Banner */}
      <header className="relative p-10 md:p-16 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
        <div
          className={`absolute inset-0 bg-linear-to-br ${currentLevel?.color} opacity-10`}
        />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r ${currentLevel?.color} text-white text-sm font-black uppercase tracking-widest`}
            >
              {currentLevel?.id} Dashboard
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Master{" "}
              <span className="text-blue-500">{currentLevel?.title}</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl font-medium leading-relaxed">
              {currentLevel?.description}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center space-y-2">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                Progress
              </p>
              <p className="text-3xl font-black text-white">45%</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center space-y-2">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                Points
              </p>
              <p className="text-3xl font-black text-blue-400">1,250</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conditional Content based on module availability */}
      {currentLevel?.modules && currentLevel.modules.length > 0 ? (
        <>
          {/* Global Search Interface */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-black text-neutral-600 uppercase tracking-[0.2em]">
                OmniSearch
              </h3>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-4xl blur-xl opacity-10 group-focus-within:opacity-40 transition-opacity" />
              <div className="relative bg-[#1a1a1a] rounded-4xl p-2 flex items-center gap-4 border border-white/5 focus-within:border-blue-500/50 transition-all shadow-3xl">
                <div className="pl-6 text-neutral-500 shrink-0">
                  <Search size={28} />
                </div>
                <input
                  type="text"
                  placeholder={`Quick search across all ${currentLevel?.id} lessons...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-2xl py-5 pr-6 text-white placeholder:text-neutral-700 font-bold"
                />
              </div>
            </div>

            {/* Search Results Area */}
            {searchTerm && (
              <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                      <div
                        key={`${item.text}-${idx}`}
                        onClick={() => setSelectedItem(item)}
                        className={`bg-[#1e1e1e] border p-6 rounded-3xl flex items-center justify-between group transition-all cursor-pointer ${
                          activeWord === item.text
                            ? "border-blue-500/50 bg-blue-500/10 shadow-xl scale-[1.02] z-10"
                            : "border-white/5 hover:bg-white/5 hover:border-blue-500/30 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                        }`}
                      >
                        <div className="space-y-1.5 overflow-hidden flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black text-neutral-600 uppercase tracking-wider shrink-0">
                              {item.source}
                            </span>
                            <h3
                              className={`text-xl font-black transition-colors ${
                                activeWord === item.text
                                  ? "text-blue-400"
                                  : "text-white group-hover:text-blue-400"
                              } truncate`}
                            >
                              {item.text}
                            </h3>
                          </div>
                          <p className="text-base text-neutral-500 font-arabic truncate">
                            {item.translation}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speak(item.text);
                            }}
                            className="p-2.5 bg-white/5 hover:bg-blue-600/20 text-neutral-500 hover:text-blue-400 rounded-xl transition-all"
                          >
                            <Volume2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center space-y-4 bg-white/2 rounded-[3rem] border border-dashed border-white/5">
                      <Filter size={32} className="mx-auto text-neutral-700" />
                      <p className="text-neutral-500 font-medium">
                        No results for "{searchTerm}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Categorized Lesson Grid */}
          {!searchTerm && (
            <div className="space-y-20">
              {categories.map((category) => {
                const modules = currentLevel.modules.filter(
                  (m) => m.category === category.key,
                );
                if (modules.length === 0) return null;

                return (
                  <section
                    key={category.key}
                    className="space-y-10 animate-in slide-in-from-bottom-4 duration-500"
                  >
                    <div className="flex items-center gap-6">
                      <h3 className="text-lg font-black text-neutral-500 uppercase tracking-[0.3em]">
                        {category.label}
                      </h3>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                      {modules.map((module) => {
                        const style = getModuleStyle(module.title);
                        return (
                          <Link
                            key={module.to}
                            to={module.to}
                            className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center gap-5 hover:border-blue-500/30 hover:scale-[1.05] transition-all duration-300 shadow-xl"
                          >
                            <div
                              className={`w-16 h-16 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}
                            >
                              <module.icon size={32} />
                            </div>
                            <span className="text-white font-black tracking-tight text-sm px-2">
                              {module.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <section className="py-20 text-center space-y-12 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
            <div
              className={`absolute -inset-4 bg-linear-to-r ${currentLevel?.color} opacity-20 blur-2xl rounded-full`}
            />
            <div
              className={`relative w-32 h-32 bg-linear-to-br ${currentLevel?.color} rounded-4xl flex items-center justify-center text-white shadow-3xl`}
            >
              <Sparkles size={64} />
            </div>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-4xl font-black text-white tracking-tight">
              Coming Soon to {currentLevel?.id}
            </h3>
            <p className="text-xl text-neutral-500 font-medium leading-relaxed">
              We're currently crafting expert lessons and interactive exercises
              for the {currentLevel?.title} level. Stay tuned!
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95"
          >
            Choose Another Level <ChevronRight size={20} />
          </Link>
        </section>
      )}

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
