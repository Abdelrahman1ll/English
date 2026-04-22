import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Split, Search, LayoutGrid, Focus } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import { StudyModule, type StudyItem } from "./shared/StudyModule";

interface ExampleWord {
  text: string;
  translation: string;
}

interface DigraphItem {
  digraph: string;
  sound?: string;
  pronunciation?: string;
  note?: string;
  examples: ExampleWord[];
}

interface DigraphData {
  CONSONANTS: DigraphItem[];
  VOWELS: DigraphItem[];
}

interface LevelDataShape {
  vocabulary?: {
    DIGRAPHS_DATA?: DigraphData;
  };
}

export function DigraphsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDigraphsData = useMemo(() => {
    const rawDigraphsData = ((levelData as unknown as LevelDataShape)?.vocabulary?.DIGRAPHS_DATA as DigraphData) || {
      CONSONANTS: [],
      VOWELS: [],
    };

    const term = searchQuery.toLowerCase();

    const filter = (items: DigraphItem[]) =>
      items.filter(
        (item) =>
          item.digraph.toLowerCase().includes(term) ||
          item.examples.some(
            (ex) =>
              ex.text.toLowerCase().includes(term) ||
              ex.translation.includes(searchQuery),
          ),
      );

    return {
      CONSONANTS: filter(rawDigraphsData.CONSONANTS || []),
      VOWELS: filter(rawDigraphsData.VOWELS || []),
    };
  }, [levelData, searchQuery]);

  const DIGRAPHS_DATA = filteredDigraphsData;

  const [isStudyMode, setIsStudyMode] = useState(false);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    const allDigraphs = [
      ...(filteredDigraphsData.CONSONANTS || []),
      ...(filteredDigraphsData.VOWELS || []),
    ];

    allDigraphs.forEach((d) => {
      // Add the digraph itself
      items.push({
        primary: d.digraph,
        secondary: d.pronunciation || d.sound || "",
        category: "Digraph Sound",
      });
      // Add its examples
      d.examples.forEach((ex) => {
        items.push({
          primary: ex.text,
          secondary: ex.translation,
          category: `Examples for ${d.digraph}`,
        });
      });
    });

    return items;
  }, [filteredDigraphsData]);

  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">(
    "consonants",
  );
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const handleDigraphClick = (item: DigraphItem) => {
    // Speak the sound, then the first example word for context
    const textToSpeak = `${item.sound || item.digraph}, ${item.examples[0]?.text || ""}`;
    speak(textToSpeak, () => setPlayingItem(null));
    setPlayingItem(item.digraph);
    setPracticeWord(item.digraph);
  };

  const handleExampleClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    speak(word, () => setPlayingItem(null));
    setPlayingItem(word);
    setPracticeWord(word);
  };

  const currentData =
    activeTab === "consonants"
      ? DIGRAPHS_DATA.CONSONANTS
      : DIGRAPHS_DATA.VOWELS;

  const { activeWord } = usePractice();

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Split className="text-blue-400" /> Digraphs
          </h1>
          <p className="text-neutral-400 mt-2">
            Two letters making one unique sound.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group w-full sm:w-80">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search digraphs or examples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-xl"
              />
            </div>
          </div>

          <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner shrink-0">
            <button
              onClick={() => setIsStudyMode(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                !isStudyMode
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutGrid size={18} />
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
              <Focus size={18} />
              <span className="font-bold">Study Mode</span>
            </button>
          </div>

          {!isStudyMode && (
            <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner shrink-0">
              <button
                onClick={() => setActiveTab("consonants")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "consonants"
                    ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/5"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                Consonants
              </button>
              <button
                onClick={() => setActiveTab("vowels")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  activeTab === "vowels"
                    ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg shadow-rose-500/5"
                    : "border-transparent text-neutral-500 hover:text-white"
                }`}
              >
                Vowels
              </button>
            </div>
          )}
        </div>
      </div>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item: DigraphItem) => (
          <div
            key={item.digraph}
            onClick={() => handleDigraphClick(item)}
            className={`group flex flex-col bg-[#1e1e1e] border rounded-3xl p-8 transition-all hover:bg-[#252525] cursor-pointer relative overflow-hidden ${
              activeWord === item.digraph
                ? "border-amber-500/50 bg-amber-500/10 shadow-xl shadow-amber-500/5 scale-105 z-10"
                : "border-white/5 shadow-lg"
            }`}
          >
            {/* Matte Index Badge */}
            <div className="absolute -top-1 -left-1 z-20">
              <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                  #{String(studyItems.findIndex(s => s.primary === item.digraph) + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div
              className={`text-5xl font-black mb-8 transition-all ${activeWord === item.digraph ? "text-amber-400 scale-110" : "text-white group-hover:text-amber-400"}`}
            >
              <div className="flex items-center justify-between w-full">
                {item.digraph}
                <Volume2
                  size={24}
                  className={`transition-all ${playingItem === item.digraph ? "text-amber-400 scale-125 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                />
              </div>
            </div>

            <div className="mb-6 px-1 space-y-2">
              {item.pronunciation && (
                <div className="text-xl text-amber-400 font-arabic font-bold">
                  {item.pronunciation}
                </div>
              )}
              {item.note && (
                <div className="text-sm text-neutral-400 italic font-medium">
                  {item.note}
                </div>
              )}
            </div>

            <div className="w-full space-y-2.5 relative z-10">
              {item.examples.map((ex: ExampleWord) => (
                <button
                  key={ex.text}
                  onClick={(e) => handleExampleClick(e, ex.text)}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-between transition-all border relative overflow-hidden group/ex ${
                    activeWord === ex.text
                      ? "bg-amber-500/20 border-amber-500/50 text-white scale-[1.05] shadow-lg z-20"
                      : "bg-black/40 text-neutral-300 border-transparent hover:bg-white/10 hover:border-white/5"
                  }`}
                >
                  {/* Badge for Example Word */}
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                      <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                        #{String(studyItems.findIndex(s => s.primary === ex.text) + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col text-left mt-1">
                    <span className="capitalize">{ex.text}</span>
                    <span
                      className={`text-[10px] font-arabic leading-none mt-1 ${activeWord === ex.text ? "text-white/80" : "text-neutral-500"}`}
                    >
                      {ex.translation}
                    </span>
                  </div>
                  <Volume2
                    size={14}
                    className={`transition-all ${playingItem === ex.text ? "text-white scale-125 opacity-100" : activeWord === ex.text ? "text-white/60 opacity-100" : "opacity-0 group-hover/ex:opacity-40"}`}
                  />
                </button>
              ))}
            </div>

            <div
              className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${activeWord === item.digraph ? "text-amber-400 opacity-20" : ""}`}
            >
              <Split size={120} />
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 via-orange-500 to-yellow-500 opacity-30" />
        <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
          Immersion Practice
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
          Click on any digraph or example word to trigger the **Practice System**. <br />{" "}
          Use the floating tools to master your pronunciation and writing.
        </p>
      </div>
    </div>
  );
}
