import { useState } from "react";
import { useParams } from "react-router-dom";
import { Volume2, BookOpen, Brain, Zap } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";
import type { LevelData } from "../data/levels";
import type { PartsOfSpeechItem } from "../data/levels/A2/partsOfSpeech";

export function PartsOfSpeechPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA[levelId] as LevelData) : null;
  
  const partsOfSpeech = (levelData?.vocabulary?.PARTS_OF_SPEECH_DATA as PartsOfSpeechItem[]) || [];

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleWordClick = (word: string) => {
    speak(word, () => setPlayingItem(null));
    setPlayingItem(word);
    setPracticeWord(word);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <BookOpen className="text-amber-400" size={32} /> Parts of Speech
        </h1>
        <p className="text-neutral-400 mt-3 text-lg">
          Master the building blocks of English sentences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partsOfSpeech.map((item) => (
          <div
            key={item.id}
            className="group bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden hover:border-amber-400/30 transition-all relative"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={80} className="text-amber-400" />
            </div>

            <button
              onClick={() => handleWordClick(item.name)}
              className="w-full text-left p-8 pb-4 flex items-center justify-between group/header"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400 font-black text-xl">
                  {item.id}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-black text-white">{item.name}</h2>
                  <span className="text-lg font-arabic text-amber-400/80">{item.arabicName}</span>
                </div>
              </div>
              <Volume2
                size={24}
                className={`transition-all ${
                  playingItem === item.name
                    ? "text-amber-400 opacity-100 scale-125"
                    : "text-neutral-700 opacity-0 group-hover/header:opacity-100"
                }`}
              />
            </button>

            <div className="px-8 pb-8 space-y-6">
              <p className="text-neutral-400 text-lg leading-relaxed">
                {item.definition}
              </p>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                  <Brain size={14} /> Examples
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => handleWordClick(ex)}
                      className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition-all group/btn ${
                        activeWord === ex
                          ? "bg-amber-400/10 border-amber-400/50 text-amber-400"
                          : "bg-white/2 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <span className="font-bold">{ex}</span>
                      <Volume2 
                        size={14} 
                        className={`transition-all ${playingItem === ex ? "scale-125 text-amber-400" : "opacity-0 group-hover/btn:opacity-100"}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
