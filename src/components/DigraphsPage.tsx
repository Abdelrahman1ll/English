import { useState } from "react";
import { Volume2 } from "lucide-react";

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
    const text = `${item.digraph}. ${item.examples.join(", ")}`;
    speak(text, item.digraph);
  };

  const currentData =
    activeTab === "consonants" ? CONSONANT_DIGRAPHS : VOWEL_DIGRAPHS;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Digraphs
          </h1>
          <p className="text-neutral-400 mt-2">Two letters making one sound.</p>
        </div>

        <div className="flex bg-[#1e1e1e] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab("consonants")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "consonants"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Consonants
          </button>
          <button
            onClick={() => setActiveTab("vowels")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "vowels"
                ? "bg-rose-600 text-white shadow-lg"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Vowels
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentData.map((item) => (
          <button
            key={item.digraph}
            onClick={() => handleDigraphClick(item)}
            className={`group flex flex-col items-center bg-[#1e1e1e] border border-white/5 rounded-2xl p-6 transition-all hover:bg-[#2a2a2a] hover:scale-105 active:scale-95 text-left ${
              playingItem === item.digraph
                ? "ring-2 ring-amber-500 bg-[#252525]"
                : ""
            }`}
          >
            <div className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-neutral-400 mb-4 group-hover:from-amber-400 group-hover:to-orange-400 transition-all">
              {item.digraph}
            </div>

            <div className="w-full space-y-2">
              {item.examples.map((ex, i) => (
                <div
                  key={ex}
                  className="bg-white/5 rounded-lg px-3 py-1.5 text-neutral-300 text-sm font-medium flex items-center justify-between group-hover:bg-white/10"
                >
                  <span>{ex}</span>
                  {i === 0 && (
                    <Volume2
                      size={14}
                      className="opacity-0 group-hover:opacity-50"
                    />
                  )}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
