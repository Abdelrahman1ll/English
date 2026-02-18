import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { User, Volume2, Search, BookOpen } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function DescribingSentencesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const SENTENCES_DATA = levelData?.sentences?.SENTENCES_DATA || [];

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const filteredSentences = useMemo(() => {
    const categories = ["Appearance Phrases", "Personality Phrases"];
    return SENTENCES_DATA.filter(
      (s: any) =>
        categories.includes(s.category) &&
        (s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.arabic.includes(searchQuery)),
    );
  }, [SENTENCES_DATA, searchQuery]);

  const groupedSentences = useMemo(() => {
    const groups: Record<string, { icon: any; items: any[] }> = {};
    filteredSentences.forEach((s: any) => {
      if (!groups[s.category]) {
        groups[s.category] = { icon: s.icon, items: [] };
      }
      groups[s.category].items.push(s);
    });
    return groups;
  }, [filteredSentences]);

  const handleSpeak = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 rounded-2xl">
            <User className="text-pink-400" size={32} />
          </div>
          Describing Phrases
        </h1>
        <p className="text-neutral-400 mt-4 text-lg">
          Practical sentences for describing how people look and act.
        </p>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-pink-600 to-rose-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search phrases in English or Arabic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-pink-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      {Object.entries(groupedSentences).length > 0 ? (
        <div className="space-y-16">
          {Object.entries(groupedSentences).map(
            ([category, { icon: Icon, items }]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  {Icon && <Icon className="text-pink-400" size={24} />}
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {category}
                  </h2>
                  <div className="h-px bg-white/5 flex-1 ml-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((sentence: any, index: number) => (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => handleSpeak(sentence.english)}
                      className={`
                      group p-6 rounded-[2.5rem] border transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between
                      ${
                        activeWord === sentence.english
                          ? "bg-pink-600/10 border-pink-500/50 scale-[1.02] ring-2 ring-pink-500/20 shadow-xl z-10"
                          : "bg-[#1a1a1a]/50 border-white/5 hover:border-white/20 hover:scale-[1.01] hover:bg-[#1f1f1f]"
                      }
                    `}
                    >
                      <div className="flex justify-between items-start mb-4">
                        {sentence.note ? (
                          <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] px-3 py-1 bg-pink-500/10 rounded-full">
                            {sentence.note}
                          </span>
                        ) : (
                          <div />
                        )}
                        <Volume2
                          size={20}
                          className={`transition-all ${
                            playingItem === sentence.english
                              ? "text-pink-400 scale-125"
                              : activeWord === sentence.english
                                ? "text-pink-400/60"
                                : "text-neutral-600 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                      <div className="space-y-3">
                        <h3
                          className={`text-xl font-bold transition-colors leading-tight ${activeWord === sentence.english ? "text-pink-400" : "text-white group-hover:text-pink-400"}`}
                        >
                          {sentence.english}
                        </h3>
                        <p
                          className={`text-lg font-arabic dir-rtl ${activeWord === sentence.english ? "text-white/80" : "text-neutral-400"}`}
                        >
                          {sentence.arabic}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#1a1a1a] rounded-[3rem] border border-dashed border-white/10 max-w-2xl mx-auto">
          <BookOpen
            className="mx-auto text-neutral-700 mb-6 underline decoration-pink-500/20 decoration-8 underline-offset-8"
            size={64}
          />
          <p className="text-neutral-500 text-xl font-medium px-8">
            No phrases found matching "{searchQuery}".
          </p>
        </div>
      )}
    </div>
  );
}
