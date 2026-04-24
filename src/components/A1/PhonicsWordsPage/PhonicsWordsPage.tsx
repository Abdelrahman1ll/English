import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Ghost, Sparkles, Search, Focus, LayoutGrid } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";
import { MagicECard } from "./MagicECard";
import { SilentLetterCard } from "./SilentLetterCard";
import { PhonicsExplanations } from "./PhonicsExplanations";
import type { PhonicsDataStructure, SilentLetterItem } from "./types";

export function PhonicsWordsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const { activeWord, setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const rawPhonicsData = useMemo(
    () =>
      (levelData?.vocabulary?.PHONICS_DATA as PhonicsDataStructure) || {
        MAGIC_E: [],
        SILENT_LETTERS: {},
      },
    [levelData],
  );

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    rawPhonicsData.MAGIC_E.forEach((p) => {
      items.push({
        primary: p.short,
        secondary: p.shortAr,
        category: "Magic E (Short)",
      });
      items.push({
        primary: p.long,
        secondary: p.longAr,
        category: "Magic E (Long)",
      });
    });
    Object.entries(rawPhonicsData.SILENT_LETTERS).forEach(([letter, words]) =>
      words.forEach((i) =>
        items.push({
          primary: i.word,
          secondary: i.arabic,
          category: `Silent ${letter}`,
        }),
      ),
    );
    return items;
  }, [rawPhonicsData]);

  const filteredData = useMemo(() => {
    const term = searchQuery.toLowerCase();
    const filteredMagicE = rawPhonicsData.MAGIC_E.filter(
      (p) =>
        p.short.toLowerCase().includes(term) ||
        p.long.toLowerCase().includes(term) ||
        p.shortAr.includes(searchQuery) ||
        p.longAr.includes(searchQuery),
    );
    const filteredSilent: Record<string, SilentLetterItem[]> = {};
    Object.entries(rawPhonicsData.SILENT_LETTERS).forEach(([letter, words]) => {
      const match = words.filter(
        (i) =>
          i.word.toLowerCase().includes(term) || i.arabic.includes(searchQuery),
      );
      if (match.length > 0) filteredSilent[letter] = match;
    });
    return { MAGIC_E: filteredMagicE, SILENT_LETTERS: filteredSilent };
  }, [rawPhonicsData, searchQuery]);

  const handleWordClick = (word: string) => {
    speak(word, () => setPlayingWord(null));
    setPlayingWord(word);
    setPracticeWord(word);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5">
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}
          >
            <LayoutGrid size={20} />{" "}
            <span className="font-bold">Grid View</span>
          </button>
          <button
            onClick={() => setIsStudyMode(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400 hover:bg-white/5"}`}
          >
            <Focus size={20} /> <span className="font-bold">Study Mode</span>
          </button>
        </div>
      </header>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          <PhonicsExplanations />
          <div className="relative group max-w-2xl">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-4 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all font-arabic shadow-2xl"
            />
          </div>

          {filteredData.MAGIC_E.length > 0 && (
            <section className="space-y-6 bg-[#121212] p-6 rounded-[2rem] border border-amber-500/10">
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-amber-400 flex items-center gap-2 uppercase tracking-widest pl-4 border-l-4 border-amber-500/50">
                  <Sparkles size={24} /> Magic E
                </h2>
                <p className="text-neutral-300 text-sm font-arabic pr-4 pl-4 leading-relaxed bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 max-w-3xl">
                  <span className="text-amber-400 font-bold block mb-1 text-base">💡 إزاي ننطقها؟ </span>
                  حرف الـ <span className="font-black text-white text-base">e</span> في آخر الكلمة صامت (مش بيتنطق)، لكن سحره إنه بيطوّل الحرف المتحرك اللي قبله ويخلينا ننطقه زي اسمه في الحروف الأبجدية بالظبط (A, I, O, U).
                  <br />
                  <span className="text-neutral-400 text-xs mt-2 inline-block border-t border-amber-500/10 pt-2 w-full">
                    <strong className="text-amber-400/70">مثال للتوضيح:</strong> كلمة <span className="text-white font-mono">mat</span> نطقها قصير (مات)، لكن لما ضفنالها سحر الـ e بقت <span className="text-amber-400 font-mono">mate</span> ونطقنا الـ A زي اسمها (مِيت).
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredData.MAGIC_E.map((pair, idx) => (
                  <MagicECard
                    key={idx}
                    pair={pair}
                    activeWord={activeWord}
                    playingWord={playingWord}
                    studyItems={studyItems}
                    onClick={handleWordClick}
                  />
                ))}
              </div>
            </section>
          )}

          {Object.entries(filteredData.SILENT_LETTERS).map(
            ([letter, words]) => (
              <section key={letter} className="space-y-6 bg-[#121212] p-6 rounded-[2rem] border border-rose-500/10">
                <div className="space-y-3">
                  <h2 className="text-2xl font-black text-rose-400 flex items-center gap-2 uppercase tracking-widest pl-4 border-l-4 border-rose-500/50">
                    <Ghost size={24} /> Silent {letter}
                  </h2>
                  <p className="text-neutral-300 text-sm font-arabic pr-4 pl-4 leading-relaxed bg-rose-500/5 p-3 rounded-xl border border-rose-500/10 max-w-2xl">
                    <span className="text-rose-400 font-bold">💡 ببساطة: </span>
                    حرف الـ <span className="font-black text-white text-base uppercase">{letter}</span> في الكلمات دي بنكتبه بس مش بننطقه (صامت).
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {words.map((item) => (
                    <SilentLetterCard
                      key={item.word}
                      item={item}
                      silentLetter={letter}
                      activeWord={activeWord}
                      playingWord={playingWord}
                      studyItems={studyItems}
                      onClick={handleWordClick}
                    />
                  ))}
                </div>
              </section>
            ),
          )}
        </>
      )}
    </div>
  );
}
