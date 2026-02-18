import { useState } from "react";
import { useParams } from "react-router-dom";
import { Hand, Volume2 } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function GreetingsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const GREETINGS_DATA = levelData?.sentences?.GREETINGS_DATA || [];

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: any) => {
    speak(item.text, () => setPlayingItem(null));
    setPlayingItem(item.text);
    // Clean up punctuation for practice if needed, though PracticeWidget handles it
    setPracticeWord(item.text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Hand className="text-blue-400" /> Greetings
        </h1>
        <p className="text-neutral-400 mt-2">
          Master common phrases and greetings for every situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GREETINGS_DATA.map((category: any) => (
          <div
            key={category.title}
            className="flex flex-col bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
                <category.icon size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">{category.title}</h2>
            </div>

            <div className="p-4 flex flex-col gap-2">
              {category.items.map((item: any) => (
                <button
                  key={item.text}
                  onClick={() => handleCardClick(item)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group ${
                    activeWord === item.text
                      ? "bg-blue-500/10 border-blue-500/50 scale-[1.02] shadow-xl shadow-blue-500/10 z-10"
                      : "bg-[#141414] border-transparent hover:bg-[#1a1a1a] hover:border-white/5"
                  }`}
                >
                  <div className="flex-1">
                    <div
                      className={`font-bold text-lg transition-colors ${activeWord === item.text ? "text-blue-400" : "text-neutral-200"}`}
                    >
                      {item.text}
                    </div>
                    {(item.translation || item.note) && (
                      <div
                        className={`text-sm mt-1 font-arabic ${activeWord === item.text ? "text-white/80" : "text-neutral-500"}`}
                      >
                        {item.translation}
                        {item.translation && item.note && " • "}
                        {item.note && (
                          <span className="italic">{item.note}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <Volume2
                    size={16}
                    className={`transition-all ${playingItem === item.text ? "text-blue-400 opacity-100 scale-125" : activeWord === item.text ? "text-blue-400/60 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-100"}`}
                  />
                </button>
              ))}
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
          Click on any phrase to hear it, then use the floating menu to practice
          **Writing** or **Speaking**.
        </p>
      </div>

      {/* Quote Section */}
      <div className="bg-linear-to-r from-blue-900/20 to-purple-900/20 border border-white/5 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-500 opacity-50" />
        <blockquote className="text-2xl md:text-3xl font-serif text-neutral-200 italic mb-8 leading-relaxed relative">
          <span className="absolute -left-4 -top-4 text-6xl text-white/5 font-serif">
            "
          </span>
          "You need to like the language you are learning to really want to
          speak it. Imagine yourself as a member of that language group."
          <span className="absolute -right-4 -bottom-4 text-6xl text-white/5 font-serif">
            "
          </span>
        </blockquote>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/20" />
            <cite className="text-white font-black not-italic text-xl tracking-tight uppercase">
              Steve Kaufmann
            </cite>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <div className="text-emerald-400 font-arabic text-xl tracking-wide dir-rtl bg-emerald-400/5 px-6 py-2 rounded-full border border-emerald-400/10">
            تحب اللغة اللي بتتعلمها عشان فعلاً تكون عايز تتكلمها. تخيل نفسك واحد
            من أهل اللغة دي.
          </div>
        </div>
      </div>
    </div>
  );
}
