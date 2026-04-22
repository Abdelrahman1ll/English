/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Briefcase,
  Building2,
  MessageCircle,
  Volume2,
  Search,
  LayoutGrid,
  Focus,
} from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

interface VocabularyItem {
  text: string;
  translation?: string;
}

interface JobsData {
  PROFESSIONS: VocabularyItem[];
  PLACES: VocabularyItem[];
  PHRASES: VocabularyItem[];
}

export function JobsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const rawJobsData = (levelData?.vocabulary?.JOBS_DATA as JobsData) || {
    PROFESSIONS: [],
    PLACES: [],
    PHRASES: [],
  };

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawJobsData.PROFESSIONS?.forEach((i) =>
      items.push({
        primary: i.text,
        secondary: i.translation || "",
        category: "Professions",
      }),
    );
    rawJobsData.PLACES?.forEach((i) =>
      items.push({
        primary: i.text,
        secondary: i.translation || "",
        category: "Workplaces",
      }),
    );
    rawJobsData.PHRASES?.forEach((i) =>
      items.push({
        primary: i.text,
        secondary: i.translation || "",
        category: "Phrases",
      }),
    );
    return items;
  }, [rawJobsData]);

  const filteredJobsData = useMemo(() => {
    const filter = (items: VocabularyItem[]) =>
      items.filter(
        (item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.translation?.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return {
      PROFESSIONS: filter(rawJobsData.PROFESSIONS || []),
      PLACES: filter(rawJobsData.PLACES || []),
      PHRASES: filter(rawJobsData.PHRASES || []),
    };
  }, [rawJobsData, searchQuery]);

  const JOBS_DATA = filteredJobsData;

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleItemClick = (item: VocabularyItem) => {
    speak(item.text, () => setPlayingItem(null));
    setPlayingItem(item.text);
    setPracticeWord(item.text);
  };

  const SectionTitle = ({
    icon: Icon,
    title,
    color = "text-blue-400",
  }: {
    icon: React.ComponentType<{ size?: number }>;
    title: string;
    color?: string;
  }) => (
    <div className="flex items-center gap-3 text-white mb-6 border-b border-white/5 pb-3">
      <div className={`p-2.5 bg-white/5 rounded-xl ${color}`}>
        <Icon size={20} />
      </div>
      <h2 className="font-black uppercase tracking-widest text-sm opacity-70">
        {title}
      </h2>
    </div>
  );

  const ItemCard = ({ item, index }: { item: VocabularyItem; index: number }) => (
    <button
      onClick={() => handleItemClick(item)}
      className={`group relative flex items-center justify-between p-5 rounded-2xl border transition-all text-left overflow-hidden ${
        activeWord === item.text
          ? "bg-blue-500/10 border-blue-500/50 scale-[1.02] shadow-xl shadow-blue-500/10 z-10"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
      }`}
    >
      <div className="absolute -top-1.5 -left-1.5 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex-1 mt-1">
        <div
          className={`font-bold transition-colors ${activeWord === item.text ? "text-blue-400" : "text-neutral-200"}`}
        >
          {item.text}
        </div>
        {item.translation && (
          <div
            className={`text-sm font-arabic mt-1 ${activeWord === item.text ? "text-white/80" : "text-neutral-500"}`}
          >
            {item.translation}
          </div>
        )}
      </div>
      <Volume2
        size={16}
        className={`transition-all ${playingItem === item.text ? "text-blue-400 opacity-100 scale-125" : activeWord === item.text ? "text-blue-400/60 opacity-100" : "text-neutral-400 opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Briefcase className="text-blue-400" /> Jobs & Workplaces
        </h1>
        <p className="text-neutral-400 mt-2">
          Master the vocabulary of professions and where people work.
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
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
                size={24}
              />
              <input
                type="text"
                placeholder="Search jobs, places or phrases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Jobs Section */}
            <div>
              <SectionTitle
                icon={Briefcase}
                title="Professions"
                color="text-blue-400"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {JOBS_DATA.PROFESSIONS.map((job) => (
                  <ItemCard key={job.text} item={job} index={studyItems.findIndex(s => s.primary === job.text)} />
                ))}
              </div>
            </div>

            {/* Places Section */}
            <div>
              <SectionTitle
                icon={Building2}
                title="Workplaces"
                color="text-emerald-400"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {JOBS_DATA.PLACES.map((place) => (
                  <ItemCard
                    key={place.text}
                    item={place}
                    index={studyItems.findIndex(s => s.primary === place.text)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Phrases Section */}
          <div className="space-y-8 mt-12">
            <SectionTitle
              icon={MessageCircle}
              title="Useful Phrases"
              color="text-amber-400"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JOBS_DATA.PHRASES.map((phrase) => (
                <button
                  key={phrase.text}
                  onClick={() => handleItemClick(phrase)}
                  className="group relative p-6 rounded-3xl border text-left transition-all bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg overflow-hidden"
                >
                  <div className="absolute -top-1.5 -left-1.5 z-20">
                    <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                      <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                        #{String(studyItems.findIndex(s => s.primary === phrase.text) + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`font-black text-lg mb-2 transition-colors ${activeWord === phrase.text ? "text-amber-400" : "text-white"}`}
                  >
                    "{phrase.text}"
                  </div>
                  {phrase.translation && (
                    <div
                      className={`font-arabic mb-4 ${activeWord === phrase.text ? "text-white/90" : "text-neutral-400"}`}
                    >
                      {phrase.translation}
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${playingItem === phrase.text ? "text-amber-400 opacity-100 scale-110" : activeWord === phrase.text ? "text-amber-400/60 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                  >
                    <Volume2 size={12} />
                    Practice
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="font-bold text-white uppercase tracking-widest text-sm opacity-50">
          Practice Mode
        </h3>
        <p className="text-neutral-300 max-w-md mx-auto text-lg">
          Click on any job, place, or phrase to hear it, then use the floating
          menu to practice **Writing** or **Speaking**.
        </p>
      </div>
    </div>
  );
}
