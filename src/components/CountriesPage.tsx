import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Globe, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";
import type { CountryItem } from "../data/levels/A2/countries";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

export function CountriesPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const countries = (levelData?.vocabulary?.COUNTRIES_DATA as CountryItem[]) || [];
    return countries.map((item) => ({
      primary: item.country,
      secondary: item.arabicCountry,
      category: "Countries & Nationalities",
      phonetic: item.nationality, // Using nationality as a sub-text/phonetic place
    }));
  }, [levelData]);

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

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
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
            {filteredData.map((item, idx) => (
              <div
                key={item.country}
                className={`rounded-3xl border transition-all relative overflow-hidden flex flex-col ${
                  activeWord === item.country
                    ? "bg-sky-500/10 border-sky-500/50 shadow-lg z-10"
                    : "bg-[#1e1e1e] border-white/5"
                }`}
              >
                {/* Matte Index Badge */}
                <div className="absolute -top-1 -left-1 z-20">
                  <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                    <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Top section - Country Clickable */}
                <button
                  onClick={() => handleCardClick(item.country)}
                  className="p-6 pb-4 w-full text-left flex flex-col gap-4 group/card relative mt-2"
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
        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-blue-500 to-indigo-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any country or nationality to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
