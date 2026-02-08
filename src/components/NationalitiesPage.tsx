import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Globe, Languages, MessageSquare, Volume2, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function NationalitiesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawNationalitiesData = levelData?.vocabulary?.NATIONALITIES_DATA || {
    LANGUAGES: [],
    PHRASES: [],
  };

  const filteredNationalitiesData = useMemo(() => {
    const filterTerm = searchQuery.toLowerCase();

    const filterLanguages = (items: any[]) =>
      items.filter(
        (item) =>
          item.text.toLowerCase().includes(filterTerm) ||
          item.translation.includes(searchQuery),
      );

    const filterPhrases = (items: any[]) =>
      items.filter(
        (item) =>
          item.question.toLowerCase().includes(filterTerm) ||
          item.translation.includes(searchQuery) ||
          item.answers?.some(
            (ans: any) =>
              ans.text.toLowerCase().includes(filterTerm) ||
              ans.translation.includes(searchQuery),
          ),
      );

    return {
      LANGUAGES: filterLanguages(rawNationalitiesData.LANGUAGES || []),
      PHRASES: filterPhrases(rawNationalitiesData.PHRASES || []),
    };
  }, [rawNationalitiesData, searchQuery]);

  const NATIONALITIES_DATA = filteredNationalitiesData;

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleItemClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <Globe className="text-emerald-400" size={32} /> Languages & Countries
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Explore global languages, countries, and diverse nationalities.
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
            placeholder="Search countries, languages or phrases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
            <Languages size={24} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            World Languages
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {NATIONALITIES_DATA.LANGUAGES?.map((lang: any) => (
            <button
              key={lang.text}
              onClick={() => handleItemClick(lang.text)}
              className={`p-6 rounded-3xl border transition-all text-center group relative overflow-hidden ${
                activeWord === lang.text
                  ? "bg-blue-500/10 border-blue-500/50 shadow-2xl scale-105 z-10"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
              }`}
            >
              <div
                className={`text-xl font-black transition-colors ${activeWord === lang.text ? "text-white" : "text-blue-400"}`}
              >
                {lang.text}
              </div>
              <div
                className={`text-sm font-arabic mt-2 ${activeWord === lang.text ? "text-white/80" : "text-neutral-500 group-hover:text-neutral-400"}`}
              >
                {lang.translation}
              </div>

              <div
                className={`absolute top-2 right-2 transition-all ${playingItem === lang.text ? "opacity-100 scale-125" : activeWord === lang.text ? "opacity-60" : "opacity-0"}`}
              >
                <Volume2 size={12} className="text-white" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Conversation Practice
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NATIONALITIES_DATA.PHRASES?.map((phrase: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
            >
              <button
                onClick={() => handleItemClick(phrase.question)}
                className="p-8 bg-white/5 border-b border-white/5 text-left group hover:bg-white/10 transition-all relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight max-w-[85%]">
                    Q: {phrase.question}
                  </span>
                  <Volume2
                    size={20}
                    className={`transition-all ${playingItem === phrase.question ? "text-amber-400 scale-125" : activeWord === phrase.question ? "text-amber-400/60" : "text-neutral-600 group-hover:text-amber-400"}`}
                  />
                </div>
                <div className="text-lg text-neutral-500 font-arabic italic">
                  {phrase.translation}
                </div>
              </button>
              <div className="p-6 space-y-4">
                {phrase.answers?.map((ans: any, ansIdx: number) => (
                  <button
                    key={ansIdx}
                    onClick={() => handleItemClick(ans.text)}
                    className={`w-full text-left p-6 rounded-3xl transition-all group border ${
                      activeWord === ans.text
                        ? "bg-emerald-500/10 border-emerald-500/50 shadow-xl scale-[1.02] z-10"
                        : "bg-black/20 hover:bg-black/40 border-white/5"
                    }`}
                  >
                    <div className={`flex justify-between items-center mb-1`}>
                      <span
                        className={`text-lg font-bold ${activeWord === ans.text ? "text-emerald-400" : "text-white group-hover:text-emerald-400"}`}
                      >
                        A: {ans.text}
                      </span>
                      <Volume2
                        size={16}
                        className={`transition-all ${playingItem === ans.text ? "text-emerald-400 opacity-100 scale-125" : activeWord === ans.text ? "text-emerald-400/60 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                      />
                    </div>
                    <div
                      className={`text-sm font-arabic mt-1 ${activeWord === ans.text ? "text-white/80" : "text-neutral-500"}`}
                    >
                      {ans.translation}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Egyptian Pride Section */}
      <div className="bg-linear-to-br from-red-600/10 via-white/5 to-black/20 border border-white/10 rounded-[3rem] p-12 flex flex-col items-center text-center space-y-6 shadow-2xl group relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-white/20 to-neutral-900 group-hover:opacity-100 opacity-50 transition-opacity" />
        <div className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
          🇪🇬
        </div>
        <h3 className="text-3xl font-black text-white tracking-widest uppercase">
          My Beautiful Egypt
        </h3>
        <button
          onClick={() =>
            handleItemClick(
              "Egypt is my country. I am Egyptian and my language is Arabic.",
            )
          }
          className="text-neutral-300 max-w-lg space-y-4 hover:text-white transition-colors"
        >
          <p className="text-2xl font-serif italic">
            "Egypt is my country. I am Egyptian and my language is Arabic."
          </p>
          <span className="font-arabic text-2xl text-emerald-400 mt-4 block dir-rtl">
            مصر هي بلدي. أنا مصري ولغتي هي العربية.
          </span>
        </button>
      </div>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 via-blue-500 to-amber-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Language Mastery
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any language or sentence to activate the **Global Practice
          System**. <br /> Master international vocabulary through immersive
          exercises.
        </p>
      </div>
    </div>
  );
}
