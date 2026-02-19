import { useState } from "react";
import { useParams } from "react-router-dom";
import { Volume2, Brain } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";
import type { PronunciationItem } from "../data/levels/A2/pronunciation";

export function PronunciationPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  
  const pronunciationData = (levelData?.vocabulary?.PRONUNCIATION_DATA as PronunciationItem[]) || [];

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleWordClick = (word: string) => {
    speak(word, () => setPlayingItem(null));
    setPlayingItem(word);
    setPracticeWord(word);
  };

  const voicelessItems = pronunciationData.filter(i => i.type === "voiceless");
  const voicedItems = pronunciationData.filter(i => i.type === "voiced");

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <Brain className="text-purple-400" size={32} /> Pronunciation Tips
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Master the sounds of English consonants: Voiceless vs. Voiced.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Voiceless Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-l-4 border-rose-500 pl-4 uppercase tracking-wider">
            Voiceless Consonants
          </h2>
          <p className="text-neutral-500 text-sm">Vocal cords do not vibrate.</p>
          <div className="grid grid-cols-1 gap-4">
            {voicelessItems.map((item) => (
              <div key={item.sound} className="bg-[#1e1e1e] border border-white/5 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-2xl font-black text-rose-400">{item.sound}</span>
                  <span className="text-neutral-500 text-xs uppercase font-bold tracking-tighter">Voiceless</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {item.examples.map((ex) => (
                    <button
                      key={ex.word}
                      onClick={() => handleWordClick(ex.word)}
                      className={`p-4 rounded-2xl border transition-all text-center flex items-center justify-between group ${
                        activeWord === ex.word
                          ? "bg-rose-500/10 border-rose-500/50 text-rose-400"
                          : "bg-white/2 border-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="font-bold">{ex.word}</span>
                      <Volume2 size={16} className={`transition-all ${playingItem === ex.word ? "animate-pulse text-rose-400" : "opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voiced Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-l-4 border-emerald-500 pl-4 uppercase tracking-wider">
            Voiced Consonants
          </h2>
          <p className="text-neutral-500 text-sm">Vocal cords vibrate.</p>
          <div className="grid grid-cols-1 gap-4">
            {voicedItems.map((item) => (
              <div key={item.sound} className="bg-[#1e1e1e] border border-white/5 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-2xl font-black text-emerald-400">{item.sound}</span>
                  <span className="text-neutral-500 text-xs uppercase font-bold tracking-tighter">Voiced</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {item.examples.map((ex) => (
                    <button
                      key={ex.word}
                      onClick={() => handleWordClick(ex.word)}
                      className={`p-4 rounded-2xl border transition-all text-center flex items-center justify-between group ${
                        activeWord === ex.word
                          ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                          : "bg-white/2 border-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="font-bold">{ex.word}</span>
                      <Volume2 size={16} className={`transition-all ${playingItem === ex.word ? "animate-pulse text-emerald-400" : "opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
