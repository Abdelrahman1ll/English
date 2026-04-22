import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Ghost, Sparkles, Volume2, Search, Focus, LayoutGrid } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

interface MagicEPair {
  short: string;
  long: string;
  shortAr: string;
  longAr: string;
}

interface SilentLetterItem {
  word: string;
  arabic: string;
}

interface PhonicsDataStructure {
  MAGIC_E: MagicEPair[];
  SILENT_LETTERS: Record<string, SilentLetterItem[]>;
}

export function PhonicsWordsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const { activeWord, setPracticeWord } = usePractice();
  const { speak } = useSpeech();
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const rawPhonicsData = (levelData?.vocabulary?.PHONICS_DATA as PhonicsDataStructure) || {
      MAGIC_E: [],
      SILENT_LETTERS: {},
    };
    const term = searchQuery.toLowerCase();

    const filteredMagicE = (rawPhonicsData.MAGIC_E || []).filter(
      (pair) =>
        pair.short.toLowerCase().includes(term) ||
        pair.long.toLowerCase().includes(term) ||
        pair.shortAr.includes(searchQuery) ||
        pair.longAr.includes(searchQuery),
    );

    const filteredSilent: Record<string, SilentLetterItem[]> = {};
    Object.entries(rawPhonicsData.SILENT_LETTERS || {}).forEach(
      ([letter, words]) => {
        const matchingWords = words.filter(
          (item) =>
            item.word.toLowerCase().includes(term) ||
            item.arabic.includes(searchQuery),
        );
        if (matchingWords.length > 0) {
          filteredSilent[letter] = matchingWords;
        }
      },
    );

    return {
      MAGIC_E: filteredMagicE,
      SILENT_LETTERS: filteredSilent,
    };
  }, [levelData, searchQuery]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    const rawPhonicsData = (levelData?.vocabulary?.PHONICS_DATA as PhonicsDataStructure) || {
      MAGIC_E: [],
      SILENT_LETTERS: {},
    };

    rawPhonicsData.MAGIC_E.forEach((pair) => {
      items.push({
        primary: pair.short,
        secondary: pair.shortAr,
        category: "Magic E (Short)",
      });
      items.push({
        primary: pair.long,
        secondary: pair.longAr,
        category: "Magic E (Long)",
      });
    });

    Object.entries(rawPhonicsData.SILENT_LETTERS).forEach(([letter, words]) => {
      words.forEach((item) => {
        items.push({
          primary: item.word,
          secondary: item.arabic,
          category: `Silent ${letter}`,
        });
      });
    });

    return items;
  }, [levelData]);

  const [isStudyMode, setIsStudyMode] = useState(false);

  const handleWordClick = (word: string) => {
    speak(word, () => setPlayingWord(null));
    setPlayingWord(word);
    setPracticeWord(word);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Search className="text-blue-400" /> Word Bank
          </h1>
          <p className="text-neutral-400 mt-2">
            Explore words with special sounds and rules.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
          <button
            onClick={() => setIsStudyMode(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              !isStudyMode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutGrid size={20} />
            <span className="font-bold">Grid View</span>
          </button>
          <button
            onClick={() => setIsStudyMode(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              isStudyMode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Focus size={20} />
            <span className="font-bold">Study Mode</span>
          </button>
        </div>
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          <div className="relative group max-w-2xl">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search words or translations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-4 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
              />
            </div>
          </div>

      {/* Magic E Section */}
      {filteredData.MAGIC_E.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2 uppercase tracking-widest pl-4 border-l-4 border-amber-500/50">
            <Sparkles size={20} /> Magic E (Silent E)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredData.MAGIC_E.map((pair, idx: number) => (
              <div key={idx} className="flex flex-col gap-2">
                <button
                  onClick={() => handleWordClick(pair.short)}
                  className={`p-3 rounded-xl border transition-all text-center relative overflow-hidden group ${
                    activeWord === pair.short
                      ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg scale-105 z-10"
                      : "bg-[#1e1e1e] border-white/5 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                      <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                        #{String(studyItems.findIndex(s => s.primary === pair.short) + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold block opacity-50 uppercase mb-1 mt-2">
                    {pair.shortAr}
                  </span>
                  <span className="text-lg font-bold">{pair.short}</span>
                  <Volume2
                    size={12}
                    className={`absolute top-2 right-2 transition-opacity ${playingWord === pair.short ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
                <button
                  onClick={() => handleWordClick(pair.long)}
                  className={`p-3 rounded-xl border transition-all text-center relative overflow-hidden group ${
                    activeWord === pair.long
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg scale-105 z-10"
                      : "bg-[#1e1e1e] border-white/5 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                      <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                        #{String(studyItems.findIndex(s => s.primary === pair.long) + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold block opacity-50 uppercase mb-1 mt-2">
                    {pair.longAr}
                  </span>
                  <span className="text-lg font-bold">{pair.long}</span>
                  <Volume2
                    size={12}
                    className={`absolute top-2 right-2 transition-opacity ${playingWord === pair.long ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Silent Letters Section */}
      {Object.keys(filteredData.SILENT_LETTERS).length > 0 && (
        <section className="space-y-10">
          <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2 uppercase tracking-widest pl-4 border-l-4 border-rose-500/50">
            <Ghost size={20} /> Silent Letters
          </h2>
          <div className="space-y-12">
            {Object.entries(filteredData.SILENT_LETTERS).map(
              ([letter, words]) => (
                <div key={letter} className="space-y-4">
                  <h3 className="text-lg font-bold text-white/40 flex items-center gap-2">
                    Silent {letter}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {words.map((item) => (
                      <button
                        key={item.word}
                        onClick={() => handleWordClick(item.word)}
                        className={`p-4 rounded-xl border transition-all text-center relative overflow-hidden group ${
                          activeWord === item.word
                            ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg scale-105 z-10"
                            : "bg-[#1e1e1e] border-white/5 text-neutral-300 hover:bg-[#252525]"
                        }`}
                      >
                        <div className="absolute -top-1 -left-1 z-20">
                          <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                            <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                              #{String(studyItems.findIndex(s => s.primary === item.word) + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold block opacity-50 uppercase mb-1 mt-2">
                          {item.arabic}
                        </span>
                        <span className="text-lg font-bold">{item.word}</span>
                        <Volume2
                          size={12}
                          className={`absolute top-2 right-2 transition-opacity ${playingWord === item.word ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredData.MAGIC_E.length === 0 &&
        Object.keys(filteredData.SILENT_LETTERS).length === 0 && (
          <div className="py-20 text-center space-y-4 opacity-50">
            <Search size={48} className="mx-auto text-neutral-600" />
            <p className="text-xl">No words found for "{searchQuery}"</p>
          </div>
        )}

        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group mt-16">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any word to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
