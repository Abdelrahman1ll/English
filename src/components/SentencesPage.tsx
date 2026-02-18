import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Volume2, Search, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

interface SentenceItem {
  english: string;
  arabic: string;
  category: string;
  icon?: LucideIcon;
  note?: string;
}

export function SentencesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const SENTENCES_DATA = useMemo(
    () => (levelData?.sentences?.SENTENCES_DATA as SentenceItem[]) || [],
    [levelData],
  );

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const filteredSentences = useMemo(() => {
    return SENTENCES_DATA.filter(
      (s: SentenceItem) =>
        s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.arabic.includes(searchQuery),
    );
  }, [SENTENCES_DATA, searchQuery]);

  const groupedSentences = useMemo(() => {
    const groups: Record<string, { icon?: LucideIcon; items: SentenceItem[] }> = {};
    filteredSentences.forEach((s: SentenceItem) => {
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
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <MessageSquare className="text-blue-400" size={32} />
          </div>
          Everyday English & Sentences
        </h1>
        <p className="text-neutral-400 mt-4 text-lg">
          Master essential phrases, greetings, and common sentences for everyday
          life.
        </p>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
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
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      {Object.entries(groupedSentences).length > 0 ? (
        <div className="space-y-16">
          {Object.entries(groupedSentences).map(
            ([category, { icon: Icon, items }]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  {Icon && <Icon className="text-blue-400" size={24} />}
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {category}
                  </h2>
                  <div className="h-px bg-white/5 flex-1 ml-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((sentence: SentenceItem, index: number) => (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => handleSpeak(sentence.english)}
                      className={`
                      group p-6 rounded-[2.5rem] border transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between
                      ${
                        activeWord === sentence.english
                          ? "bg-blue-600/10 border-blue-500/50 scale-[1.02] ring-2 ring-blue-500/20 shadow-xl z-10"
                          : "bg-[#1a1a1a]/50 border-white/5 hover:border-white/20 hover:scale-[1.01] hover:bg-[#1f1f1f]"
                      }
                    `}
                    >
                      <div className="flex justify-between items-start mb-4">
                        {sentence.note ? (
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] px-3 py-1 bg-blue-500/10 rounded-full">
                            {sentence.note}
                          </span>
                        ) : (
                          <div />
                        )}
                        <Volume2
                          size={20}
                          className={`transition-all ${
                            playingItem === sentence.english
                              ? "text-blue-400 scale-125"
                              : activeWord === sentence.english
                                ? "text-blue-400/60"
                                : "text-neutral-600 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                      <div className="space-y-3">
                        <h3
                          className={`text-xl font-bold transition-colors leading-tight ${activeWord === sentence.english ? "text-blue-400" : "text-white group-hover:text-blue-400"}`}
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
            className="mx-auto text-neutral-700 mb-6 underline decoration-blue-500/20 decoration-8 underline-offset-8"
            size={64}
          />
          <p className="text-neutral-500 text-xl font-medium px-8">
            No phrases found matching "{searchQuery}".
          </p>
        </div>
      )}

      <div className="bg-linear-to-br from-[#1a1a1a] to-blue-900/10 border border-white/5 rounded-[3rem] p-10 text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <BookOpen size={120} />
        </div>
        <h3 className="font-black text-2xl text-white mb-4 tracking-tight">
          Learning Tip
        </h3>
        <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
          "You need to like the language you are learning to really want to
          speak it. Imagine yourself as a member of that language group."
        </p>
        <p className="text-neutral-500 mt-4 font-arabic text-lg">
          تخيل نفسك واحد من أهل اللغة دي عشان تحبها وتقدر تتكلمها بجد.
        </p>
        <p className="text-blue-400 mt-6 font-bold tracking-widest text-sm uppercase">
          — Steve Kaufmann
        </p>
      </div>
    </div>
  );
}
