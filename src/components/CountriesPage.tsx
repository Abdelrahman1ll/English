import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Globe, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";
import type { CountryItem } from "../data/levels/A2/countries";

export function CountriesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    const countries = (levelData?.vocabulary?.COUNTRIES_DATA as CountryItem[]) || [];
    const term = searchQuery.toLowerCase();
    return countries.filter(
      (item) =>
        item.country.toLowerCase().includes(term) ||
        item.nationality.toLowerCase().includes(term) ||
        item.arabicCountry.includes(searchQuery) ||
        item.arabicNationality.includes(searchQuery)
    );
  }, [levelData, searchQuery]);

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
          <Globe className="text-sky-400" size={32} /> Countries & Nationalities
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Learn about different countries and how to describe people from them.
        </p>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-sky-600 to-blue-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search countries or nationalities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-sky-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.country}
            className={`rounded-3xl border transition-all relative overflow-hidden flex flex-col ${
              activeWord === item.country
                ? "bg-sky-500/10 border-sky-500/50 shadow-lg z-10"
                : "bg-[#1e1e1e] border-white/5"
            }`}
          >
            {/* Top section - Country Clickable */}
            <button
              onClick={() => handleCardClick(item.country)}
              className="p-6 pb-4 w-full text-left flex flex-col gap-4 group/card"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-4xl">{item.flag}</span>
                <Volume2
                  size={20}
                  className={`transition-all ${
                    playingItem === item.country
                      ? "text-sky-400 opacity-100 scale-125"
                      : "text-neutral-700 opacity-0 group-hover/card:opacity-100"
                  }`}
                />
              </div>

              <div className="flex items-baseline justify-between w-full">
                <span className="text-xl font-black text-white">{item.country}</span>
                <span className="text-lg font-arabic text-neutral-400">{item.arabicCountry}</span>
              </div>
            </button>

            {/* Bottom section - Nationality Clickable */}
            <button
              onClick={() => handleCardClick(item.nationality)}
              className="px-6 py-4 w-full border-t border-white/5 flex items-baseline justify-between group/nat hover:bg-white/2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-bold">{item.nationality}</span>
                <Volume2
                  size={14}
                  className={`transition-all ${
                    playingItem === item.nationality
                      ? "text-sky-400 opacity-100"
                      : "opacity-0 group-hover/nat:opacity-100 text-neutral-600"
                  }`}
                />
              </div>
              <span className="text-neutral-500 font-arabic">{item.arabicNationality}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
