import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Clock, Search, MessageSquare } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";

interface TimePhrase {
  english: string;
  arabic: string;
}

interface DialogueItem {
  speaker: string;
  text: string;
  arabic: string;
}

interface Dialogue {
  id: number;
  title: string;
  dialogue: DialogueItem[];
}

export function TellingTimePage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");

  const timePhrases = useMemo(() => {
    const rawData = (levelData?.sentences?.TELLING_TIME_PHRASES as TimePhrase[]) || [];
    const term = searchQuery.toLowerCase();
    return rawData.filter(
      (item) =>
        item.english?.toLowerCase().includes(term) ||
        item.arabic?.includes(searchQuery)
    );
  }, [levelData, searchQuery]);

  const dialogues = useMemo(() => {
    return (levelData?.sentences?.TIME_DIALOGUES as Dialogue[]) || [];
  }, [levelData]);

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <Clock className="text-amber-400" size={32} /> Telling Time
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Master how to ask for and tell the time in English.
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
            placeholder="Search time phrases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      {/* Time Phrases Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <Clock size={24} className="text-amber-400" /> Common Phrases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {timePhrases.map((item) => (
            <button
              key={item.english}
              onClick={() => handleCardClick(item.english)}
              className={`p-6 rounded-3xl border transition-all text-left flex items-center justify-between group relative overflow-hidden ${
                activeWord === item.english
                  ? "bg-amber-500/10 border-amber-500/50 text-amber-400 scale-[1.02] shadow-lg z-10"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-white/5 text-neutral-300 hover:text-white"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-bold text-xl">{item.english}</span>
                <span
                  className={`text-lg font-arabic ${activeWord === item.english ? "text-white/80" : "text-neutral-500"}`}
                >
                  {item.arabic}
                </span>
              </div>
              <Volume2
                size={20}
                className={`transition-all ${playingItem === item.english ? "text-amber-400 opacity-100 scale-125" : activeWord === item.english ? "text-amber-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Dialogues Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <MessageSquare size={24} className="text-blue-400" /> Time Dialogues
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dialogues.map((dialogue) => (
            <div
              key={dialogue.id}
              className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6"
            >
              <h3 className="text-xl font-black text-white border-b border-white/5 pb-4">
                {dialogue.title}
              </h3>
              <div className="space-y-4">
                {dialogue.dialogue.map((line, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCardClick(line.text)}
                    className="w-full text-left group flex flex-col gap-1 p-3 rounded-2xl hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-blue-400 uppercase tracking-widest">
                        {line.speaker}
                      </span>
                      <Volume2
                        size={14}
                        className="opacity-0 group-hover:opacity-40 text-neutral-400"
                      />
                    </div>
                    <p className="text-lg text-white font-medium">{line.text}</p>
                    <p className="text-sm font-arabic text-neutral-500">
                      {line.arabic}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
