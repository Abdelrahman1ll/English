import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, Volume2, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function MonthsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawCalendarData = levelData?.vocabulary?.CALENDAR_DATA || {
    MONTHS: [],
    DAYS: [],
    TIME_VOCABULARY: [],
  };

  const filteredCalendarData = useMemo(() => {
    const term = searchQuery.toLowerCase();

    const filterItems = (items: any[]) =>
      items.filter(
        (item) =>
          (item.name || item.text || "").toLowerCase().includes(term) ||
          (item.arabic || item.translation || "").includes(searchQuery),
      );

    return {
      MONTHS: filterItems(rawCalendarData.MONTHS),
      DAYS: filterItems(rawCalendarData.DAYS),
      TIME_VOCABULARY: rawCalendarData.TIME_VOCABULARY.map((cat: any) => ({
        ...cat,
        items: filterItems(cat.items),
      })).filter((cat: any) => cat.items.length > 0),
    };
  }, [rawCalendarData, searchQuery]);

  const CALENDAR_DATA = filteredCalendarData;

  const [activeTab, setActiveTab] = useState<"months" | "days">("months");
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak, cancel } = useSpeech();

  // Stop synthesis when switching tabs
  useEffect(() => {
    cancel();
  }, [activeTab, cancel]);

  const handleWordClick = (word: string, sentence?: string) => {
    speak(sentence || word, () => setPlayingItem(null));
    setPlayingItem(sentence || word);
    // For days, we practice the day name, but we can speak the whole sentence
    setPracticeWord(word);
  };

  const handleVocabClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Calendar className="text-blue-400" /> Months & Calendar
          </h1>
          <p className="text-neutral-400 mt-2">
            Months, Days, and Date vocabulary.
          </p>
        </div>
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
            placeholder="Search months, days or time..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/5 pb-1">
        <button
          onClick={() => setActiveTab("months")}
          className={`px-6 py-3 font-bold rounded-t-xl transition-all relative top-px ${activeTab === "months" ? "bg-[#1e1e1e] text-white border-t border-x border-white/5" : "text-neutral-500 hover:text-neutral-300"}`}
        >
          Months Practice
        </button>
        <button
          onClick={() => setActiveTab("days")}
          className={`px-6 py-3 font-bold rounded-t-xl transition-all relative top-px ${activeTab === "days" ? "bg-[#1e1e1e] text-white border-t border-x border-white/5" : "text-neutral-500 hover:text-neutral-300"}`}
        >
          Days & Time
        </button>
      </div>

      <div className="space-y-8">
        {/* Main Grid */}
        <div className="space-y-8">
          {activeTab === "months" && (
            <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {CALENDAR_DATA.MONTHS.map((month: any) => (
                  <button
                    key={month.name}
                    onClick={() => handleWordClick(month.name)}
                    className={`p-4 sm:p-6 rounded-xl border transition-all text-center relative ${
                      activeWord === month.name
                        ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg scale-105 z-10"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <span className="text-lg sm:text-xl font-bold block">
                      {month.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-500 block mt-1 font-medium font-arabic line-clamp-1">
                      {month.arabic}
                    </span>
                    {playingItem === month.name && (
                      <Volume2
                        size={14}
                        className="absolute top-2 right-2 animate-pulse text-blue-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "days" && (
            <div className="space-y-12">
              {/* Days Practice */}
              <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 uppercase tracking-widest">
                  <Calendar className="text-purple-400" size={20} /> Days of the
                  Week
                </h2>
                <div className="flex flex-col gap-3">
                  {CALENDAR_DATA.DAYS.map((day: any) => (
                    <button
                      key={day.name}
                      onClick={() => handleWordClick(day.name, day.sentence)}
                      className={`p-5 rounded-xl border transition-all text-left relative flex items-center justify-between group ${
                        activeWord === day.name
                          ? "bg-purple-500/10 border-purple-500/50 text-purple-400 shadow-lg scale-[1.02] z-10"
                          : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xl font-bold block">
                          {day.name}
                        </span>
                        <span className="text-sm text-neutral-500 block mt-1 font-medium font-arabic">
                          {day.arabic}
                        </span>
                      </div>
                      <div className="text-right max-w-md flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="text-sm opacity-90 italic">
                            "{day.sentence}"
                          </div>
                          <div className="text-[10px] text-purple-300/70 font-arabic mt-1">
                            {day.sentenceTranslation}
                          </div>
                        </div>
                        <Volume2
                          size={18}
                          className={`transition-all ${playingItem === day.sentence ? "animate-pulse scale-125 text-purple-400" : "opacity-0 group-hover:opacity-40"}`}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Vocabulary Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Clock className="text-amber-400" /> Time Vocabulary
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CALENDAR_DATA.TIME_VOCABULARY.map((category: any) => (
                    <div
                      key={category.category}
                      className="bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-xl"
                    >
                      <div className="p-5 bg-white/5 border-b border-white/5 flex items-center gap-3">
                        <h3 className="font-bold text-white uppercase tracking-wider text-sm">
                          {category.category}
                        </h3>
                      </div>
                      <div className="p-4 flex flex-col gap-2">
                        {category.items.map((item: any) => (
                          <button
                            key={item.text}
                            onClick={() => handleVocabClick(item.text)}
                            className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between group ${
                              activeWord === item.text
                                ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg z-10"
                                : "bg-transparent border-transparent hover:bg-white/5 text-neutral-300 hover:text-white"
                            }`}
                          >
                            <span className="font-bold flex items-center gap-2">
                              {item.text}
                              {playingItem === item.text ? (
                                <Volume2
                                  size={14}
                                  className="animate-pulse text-amber-500"
                                />
                              ) : activeWord === item.text ? (
                                <Volume2
                                  size={14}
                                  className="text-amber-500/60"
                                />
                              ) : null}
                            </span>
                            <span className="text-sm text-neutral-500 font-arabic group-hover:text-neutral-400">
                              {item.translation}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instruction Card */}
        <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Practice Mode</h3>
          <p className="text-neutral-400 max-w-md mx-auto">
            Click on any item, then use the floating menu on the right to
            practice **Writing** or **Speaking**.
          </p>
        </div>
      </div>
    </div>
  );
}
