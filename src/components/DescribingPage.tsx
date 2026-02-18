import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, User, Search, } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData, Category, VocabularyItem } from "../data/levels";

export function DescribingPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDescribingData = useMemo(() => {
    const rawData = (levelData?.vocabulary?.DESCRIBING_DATA as {
      PHYSICAL: VocabularyItem[];
      CHARACTER_SENTENCES: VocabularyItem[];
      VOCABULARY: Category[];
    }) || {
      PHYSICAL: [],
      CHARACTER_SENTENCES: [],
      VOCABULARY: [],
    };

    const term = searchQuery.toLowerCase();

    const filter = (items: VocabularyItem[]) =>
      items.filter(
        (item: VocabularyItem) =>
          item.text?.toLowerCase().includes(term) ||
          item.translation?.includes(searchQuery),
      );

    return {
      PHYSICAL: filter(rawData.PHYSICAL),
      CHARACTER_SENTENCES: filter(rawData.CHARACTER_SENTENCES),
      VOCABULARY: rawData.VOCABULARY.map((cat: Category) => ({
        ...cat,
        items: filter(cat.items),
      })).filter((cat: Category) => cat.items.length > 0),
    };
  }, [levelData, searchQuery]);

  const DESCRIBING_DATA = filteredDescribingData;

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
          <User className="text-pink-400" size={32} /> Describing People
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Master the art of describing appearances and personalities.
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
            placeholder="Search descriptions, traits or words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      {/* Vocabulary Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
            <Search size={24} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Vocabulary Essentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESCRIBING_DATA.VOCABULARY.map((category: Category) => (
            <div
              key={category.title}
              className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl"
            >
              <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-4">
                <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-400 shadow-inner">
                  <category.icon size={20} />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {category.title}
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {category.items.map((item: VocabularyItem) => (
                  <button
                    key={item.text}
                    onClick={() => handleCardClick(item.text || "")}
                    className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group ${
                      activeWord === item.text
                        ? "bg-pink-500/10 border-pink-500/50 text-pink-400 scale-[1.02] shadow-lg z-10"
                        : "bg-transparent border-transparent hover:bg-white/5 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{item.text}</span>
                      <span
                        className={`text-sm font-arabic ${activeWord === item.text ? "text-white/80" : "text-neutral-500"}`}
                      >
                        {item.translation}
                      </span>
                    </div>
                    <Volume2
                      size={16}
                      className={`transition-all ${playingItem === item.text ? "text-pink-400 opacity-100 scale-125" : activeWord === item.text ? "text-pink-400/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-yellow-500 to-blue-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any phrase or word to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
