import { useState } from "react";
import { Volume2, Split } from "lucide-react";
import { usePractice } from "../context/PracticeContext";

type DigraphData = {
  digraph: string;
  examples: string[];
};

const CONSONANT_DIGRAPHS: DigraphData[] = [
  { digraph: "ch", examples: ["chair", "chore", "each", "much"] },
  { digraph: "ck", examples: ["back", "duck", "neck", "rock"] },
  { digraph: "gh", examples: ["cough", "laugh", "rough", "tough"] },
  { digraph: "kn", examples: ["knee", "knife", "knot", "know"] },
  { digraph: "ll", examples: ["all", "ball", "fall", "wall"] },
  { digraph: "ng", examples: ["king", "ring", "sing", "wing"] },
  { digraph: "ph", examples: ["phone", "photo", "graph", "gopher"] },
  { digraph: "qu", examples: ["quack", "queen", "quiet", "quiz"] },
  { digraph: "sh", examples: ["dish", "fish", "ship", "shoe"] },
  { digraph: "th", examples: ["bath", "both", "than", "thing"] },
  { digraph: "wh", examples: ["whale", "what", "when", "white"] },
  { digraph: "wr", examples: ["wrap", "wrist", "write", "wreath"] },
];

const VOWEL_DIGRAPHS: DigraphData[] = [
  { digraph: "ai", examples: ["main", "paint", "rain", "train"] },
  { digraph: "ay", examples: ["day", "play", "stay", "today"] },
  { digraph: "ea", examples: ["eat", "read", "seat", "team"] },
  { digraph: "ee", examples: ["bee", "free", "see", "tree"] },
  { digraph: "oa", examples: ["boat", "coat", "road", "soap"] },
  { digraph: "ue", examples: ["blue", "clue", "glue", "true"] },
];

export function DigraphsPage() {
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">(
    "consonants",
  );
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord } = usePractice();

  const speak = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setPlayingItem(id);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDigraphClick = (item: DigraphData) => {
    speak(item.digraph, item.digraph);
    setPracticeWord(item.digraph);
  };

  const handleExampleClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    speak(word, word);
    setPracticeWord(word);
  };

  const currentData =
    activeTab === "consonants" ? CONSONANT_DIGRAPHS : VOWEL_DIGRAPHS;

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

        <div className="flex bg-[#1e1e1e] p-1.5 rounded-2xl border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveTab("consonants")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "consonants"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Consonants
          </button>
          <button
            onClick={() => setActiveTab("vowels")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "vowels"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-500/20"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            Vowels
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item) => (
          <div
            key={item.digraph}
            onClick={() => handleDigraphClick(item)}
            className={`group flex flex-col bg-[#1e1e1e] border rounded-3xl p-8 transition-all hover:bg-[#252525] cursor-pointer relative overflow-hidden ${
              activeWord === item.digraph
                ? "border-amber-500/50 bg-amber-500/10 shadow-xl shadow-amber-500/5 scale-105 z-10"
                : "border-white/5 shadow-lg"
            }`}
          >
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

            <div className="w-full space-y-2.5 relative z-10">
              {item.examples.map((ex) => (
                <button
                  key={ex}
                  onClick={(e) => handleExampleClick(e, ex)}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-between transition-all border ${
                    activeWord === ex
                      ? "bg-amber-500/20 border-amber-500/50 text-white scale-[1.05] shadow-lg z-20"
                      : "bg-black/40 text-neutral-300 border-transparent hover:bg-white/10 hover:border-white/5"
                  }`}
                >
                  <span className="capitalize">{ex}</span>
                  <Volume2
                    size={14}
                    className={`transition-all ${playingItem === ex ? "text-white scale-125 opacity-100" : activeWord === ex ? "text-white/60 opacity-100" : "opacity-0 group-hover:opacity-40"}`}
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

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="font-bold text-white uppercase tracking-widest text-sm opacity-50">
          Practice Mode
        </h3>
        <p className="text-neutral-300 max-w-md mx-auto text-lg">
          Click on a digraph or any example word to practice **Writing** or
          **Speaking**.
        </p>
      </div>
    </div>
  );
}
