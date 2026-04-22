import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, Volume2, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

interface MonthItem {
  name: string;
  arabic: string;
}

interface DayItem {
  name: string;
  arabic: string;
  sentence?: string;
  sentenceTranslation?: string;
}

interface TimeVocabItem {
  text: string;
  translation: string;
}

interface TimeCategory {
  category: string;
  items: TimeVocabItem[];
}

interface CalendarDataStructure {
  MONTHS: MonthItem[];
  DAYS: DayItem[];
  TIME_VOCABULARY: TimeCategory[];
}

export function MonthsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const rawCalendarData = (levelData?.vocabulary
      ?.CALENDAR_DATA as CalendarDataStructure) || {
      MONTHS: [],
      DAYS: [],
      TIME_VOCABULARY: [],
    };

    const items: StudyItem[] = [];

    rawCalendarData.MONTHS.forEach((m) => {
      items.push({
        primary: m.name,
        secondary: m.arabic,
        category: "Months",
      });
    });

    rawCalendarData.DAYS.forEach((d) => {
      items.push({
        primary: d.name,
        secondary: d.arabic,
        category: "Days of the Week",
        note: d.sentence,
      });
    });

    rawCalendarData.TIME_VOCABULARY.forEach((cat) => {
      cat.items.forEach((i) => {
        items.push({
          primary: i.text,
          secondary: i.translation,
          category: cat.category,
        });
      });
    });

    return items;
  }, [levelData]);

  const filteredCalendarData = useMemo(() => {
    const rawCalendarData = (levelData?.vocabulary?.CALENDAR_DATA as CalendarDataStructure) || {
      MONTHS: [],
      DAYS: [],
      TIME_VOCABULARY: [],
    };
    const term = searchQuery.toLowerCase();

    const filterItems = <T extends MonthItem | DayItem | TimeVocabItem>(items: T[]) =>
      items.filter((item) => {
        const primaryText = "name" in item ? item.name : "text" in item ? item.text : "";
        const secondaryText = "arabic" in item ? item.arabic : "translation" in item ? item.translation : "";
        return (
          primaryText.toLowerCase().includes(term) ||
          secondaryText.includes(searchQuery)
        );
      });

    return {
      MONTHS: filterItems(rawCalendarData.MONTHS),
      DAYS: filterItems(rawCalendarData.DAYS),
      TIME_VOCABULARY: (rawCalendarData.TIME_VOCABULARY || []).map((cat: TimeCategory) => ({
        ...cat,
        items: filterItems(cat.items),
      })).filter((cat: TimeCategory) => cat.items.length > 0),
    };
  }, [levelData, searchQuery]);

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

      {/* Main Grid */}
      <div className="space-y-8">
          {activeTab === "months" && (
            <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {CALENDAR_DATA.MONTHS.map((month: MonthItem) => (
                  <button
                    key={month.name}
                    onClick={() => handleWordClick(month.name)}
                    className={`p-4 sm:p-6 rounded-xl border transition-all text-center relative group/card ${
                      activeWord === month.name
                        ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg scale-105 z-10"
                        : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <div className="absolute -top-1 -left-1 z-20">
                      <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                        <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                          #{String(studyItems.findIndex(s => s.primary === month.name) + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
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
                  {CALENDAR_DATA.DAYS.map((day: DayItem) => (
                    <button
                      key={day.name}
                      onClick={() => handleWordClick(day.name, day.sentence)}
                      className={`p-5 rounded-xl border transition-all text-left relative flex items-center justify-between group/card ${
                        activeWord === day.name
                          ? "bg-purple-500/10 border-purple-500/50 text-purple-400 shadow-lg scale-[1.02] z-10"
                          : "bg-[#2a2a2a] border-white/5 text-neutral-400 hover:border-white/20"
                      }`}
                    >
                      <div className="absolute -top-1 -left-1 z-20 transition-all group-hover/card:-translate-y-1">
                        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                            #{String(studyItems.findIndex(s => s.primary === day.name) + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col pl-4 transition-all">
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
                  {CALENDAR_DATA.TIME_VOCABULARY.map((category: TimeCategory) => (
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
                        {category.items.map((item: TimeVocabItem) => (
                          <button
                            key={item.text}
                            onClick={() => handleVocabClick(item.text)}
                            className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between group/row ${
                              activeWord === item.text
                                ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg z-10"
                                : "bg-transparent border-transparent hover:bg-white/5 text-neutral-300 hover:text-white"
                            }`}
                          >
                            <span className="font-bold flex items-center gap-2">
                              <span className="text-[9px] text-neutral-600 font-black min-w-[20px] tabular-nums">
                                #{String(studyItems.findIndex(s => s.primary === item.text) + 1).padStart(2, "0")}
                              </span>
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
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group mt-16">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any month, day, or time word to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
      </>
    )}
  </div>
);
}
