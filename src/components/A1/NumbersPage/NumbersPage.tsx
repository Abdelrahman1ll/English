import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Hash, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { InstructionCard } from "../../shared/InstructionCard";
import { NumberSection } from "./NumberSection";
import type { NumbersDataStructure } from "./types";

export function NumbersPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);

  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawNumbersData = useMemo(
    () =>
      (levelData?.vocabulary?.NUMBERS_DATA as NumbersDataStructure) || {
        BASICS: [],
        TEENS: [],
        TENS: [],
        ORDINALS: [],
        BIG: [],
      },
    [levelData],
  );

  const studyItems: StudyItem[] = useMemo(() => {
    const all = [
      ...rawNumbersData.BASICS.map((i) => ({ ...i, category: "Basics" })),
      ...rawNumbersData.TEENS.map((i) => ({ ...i, category: "Teens" })),
      ...rawNumbersData.TENS.map((i) => ({ ...i, category: "Tens" })),
      ...rawNumbersData.ORDINALS.map((i) => ({ ...i, category: "Ordinals" })),
      ...rawNumbersData.BIG.map((i) => ({ ...i, category: "Big Numbers" })),
    ];
    return all.map((item) => ({
      primary: item.word,
      secondary: item.arabic || item.digit.toString(),
      category: item.category,
    }));
  }, [rawNumbersData]);

  const filteredNumbersData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filter = (items: any) =>
      items.filter(
        (i: any) =>
          i.word.toLowerCase().includes(term) ||
          (i.arabic && i.arabic.includes(searchQuery)) ||
          i.digit.toString().includes(term),
      );
    return {
      BASICS: filter(rawNumbersData.BASICS),
      TEENS: filter(rawNumbersData.TEENS),
      TENS: filter(rawNumbersData.TENS),
      ORDINALS: filter(rawNumbersData.ORDINALS),
      BIG: filter(rawNumbersData.BIG),
    };
  }, [rawNumbersData, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Hash className="text-blue-400" /> Numbers
          </h1>
          <p className="text-neutral-400 mt-2">
            Count from zero to a million and master ordinals.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
        <button
          onClick={() => setIsStudyMode(false)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
        >
          <LayoutGrid size={20} /> <span className="font-bold">Grid View</span>
        </button>
        <button
          onClick={() => setIsStudyMode(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
        >
          <Focus size={20} /> <span className="font-bold">Study Mode</span>
        </button>
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          <div className="relative group max-w-2xl">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-4 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden font-arabic"
            />
          </div>
          <NumberSection
            title="Basics (0-10)"
            color="blue"
            items={filteredNumbersData.BASICS}
            studyItems={studyItems}
            activeWord={activeWord}
            gridClass="grid-cols-2 sm:grid-cols-4 md:grid-cols-6"
            onCardClick={(i) => {
              speak(i.word);
              setPracticeWord(i.word);
            }}
          />
          <NumberSection
            title="The Teens (11-19)"
            color="purple"
            items={filteredNumbersData.TEENS}
            studyItems={studyItems}
            activeWord={activeWord}
            gridClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
            onCardClick={(i) => {
              speak(i.word);
              setPracticeWord(i.word);
            }}
          />
          <NumberSection
            title="The Tens"
            color="amber"
            items={filteredNumbersData.TENS}
            studyItems={studyItems}
            activeWord={activeWord}
            gridClass="grid-cols-2 sm:grid-cols-4 md:grid-cols-8"
            onCardClick={(i) => {
              speak(i.word);
              setPracticeWord(i.word);
            }}
          />
          <NumberSection
            title="Big Numbers"
            color="emerald"
            items={filteredNumbersData.BIG}
            studyItems={studyItems}
            activeWord={activeWord}
            gridClass="grid-cols-1 sm:grid-cols-3"
            onCardClick={(i) => {
              speak(i.word);
              setPracticeWord(i.word);
            }}
          />

          <NumberSection
            title="Ordinal Numbers"
            color="rose"
            items={filteredNumbersData.ORDINALS}
            studyItems={studyItems}
            activeWord={activeWord}
            gridClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
            onCardClick={(i) => {
              speak(i.word);
              setPracticeWord(i.word);
            }}
          />
        </>
      )}
      <InstructionCard />
    </div>
  );
}
