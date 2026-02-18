import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  MessageSquare,
  Volume2,
  User,
  UserCircle2,
  ArrowRight,
  Search,
  LayoutGrid,
  Coffee,
  ShoppingBag,
  BookOpen,
} from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function ConversationsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const rawConversationsData =
    levelData?.conversations?.CONVERSATIONS_DATA || [];

  const categories = [
    {
      name: "Daily Life",
      icon: Coffee,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      name: "Travel & Shopping",
      icon: ShoppingBag,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      name: "Work & Study",
      icon: BookOpen,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  const filteredConversations = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawConversationsData.filter(
      (conv: any) =>
        (!selectedCategory || conv.category === selectedCategory) &&
        (conv.title.toLowerCase().includes(term) ||
          conv.description.toLowerCase().includes(term) ||
          conv.dialogue.some(
            (line: any) =>
              line.text.toLowerCase().includes(term) ||
              line.arabic.includes(searchQuery),
          )),
    );
  }, [rawConversationsData, searchQuery, selectedCategory]);

  const [selectedConv, setSelectedConv] = useState<any | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleSpeak = (text: string, index: number) => {
    speak(text, () => setPlayingIndex(null));
    setPlayingIndex(index);
    setPracticeWord(text);
  };

  const playEntireConversation = async () => {
    if (!selectedConv) return;

    for (let i = 0; i < selectedConv.dialogue.length; i++) {
      const line = selectedConv.dialogue[i];
      setPlayingIndex(i);
      await new Promise<void>((resolve) => {
        speak(line.text, () => resolve());
      });
    }
    setPlayingIndex(null);
  };

  if (selectedConv) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-500 pb-20">
        <button
          onClick={() => setSelectedConv(null)}
          className="text-neutral-400 hover:text-white flex items-center gap-2 font-bold transition-colors mb-4"
        >
          <ArrowRight className="rotate-180" size={20} /> Back to Conversations
        </button>

        <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedConv.title}
              </h2>
              <p className="text-neutral-400">{selectedConv.description}</p>
            </div>
            <button
              onClick={playEntireConversation}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Volume2 size={20} /> Listen All
            </button>
          </div>

          <div className="space-y-6">
            {selectedConv.dialogue.map((line: any, index: number) => (
              <div
                key={index}
                className={`flex gap-4 ${line.speaker === "A" ? "flex-row" : "flex-row-reverse"}`}
              >
                <div
                  className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    line.speaker === "A"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {line.speaker === "A" ? (
                    <User size={24} />
                  ) : (
                    <UserCircle2 size={24} />
                  )}
                </div>

                <button
                  onClick={() => handleSpeak(line.text, index)}
                  className={`
                    relative group p-6 rounded-3xl border text-left transition-all duration-300 max-w-[80%]
                    ${
                      activeWord === line.text
                        ? "bg-blue-600/10 border-blue-500/50 scale-[1.02] ring-2 ring-blue-500/20 shadow-xl z-10"
                        : "bg-[#141414] border-white/5 hover:border-white/10"
                    }
                  `}
                >
                  <p className="text-xl font-bold text-white mb-2 leading-relaxed">
                    {line.text}
                  </p>
                  <p className="text-lg text-neutral-400 font-arabic dir-rtl border-t border-white/5 pt-2 mt-2">
                    {line.arabic}
                  </p>
                  <Volume2
                    size={16}
                    className={`absolute right-4 top-4 transition-all ${
                      playingIndex === index
                        ? "text-blue-400 opacity-100 scale-125"
                        : activeWord === line.text
                          ? "text-blue-400/60 opacity-100"
                          : "opacity-0 group-hover:opacity-100 text-neutral-600"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="text-blue-400" /> Conversations
            </h1>
            <p className="text-neutral-400 mt-2">
              Listen and learn from real-life dialogue examples.
            </p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="text-neutral-500 hover:text-white flex items-center gap-2 font-bold mb-1 transition-colors"
            >
              <LayoutGrid size={18} /> All Categories
            </button>
          )}
        </div>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      {!selectedCategory && !searchQuery ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-[2.5rem] text-left hover:border-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
            >
              <div
                className={`w-16 h-16 ${cat.bg} rounded-2xl flex items-center justify-center ${cat.color} mb-6 group-hover:scale-110 transition-transform`}
              >
                <cat.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-neutral-500 text-sm">
                Explore dialogues related to {cat.name.toLowerCase()}.
              </p>
              <div
                className={`mt-6 flex items-center gap-2 text-sm font-bold ${cat.color} uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                View More <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {selectedCategory && (
            <div className="flex items-center gap-3">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-xs font-black text-neutral-500 uppercase tracking-[0.3em] px-4">
                {selectedCategory}
              </span>
              <div className="h-px bg-white/5 flex-1" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredConversations.map((conv: any) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-3xl text-left hover:border-blue-500/30 transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-neutral-800 group-hover:text-blue-500/20 transition-colors">
                  <MessageSquare size={80} />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {conv.title}
                  </h3>
                  <p className="text-neutral-400 mb-6">{conv.description}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-500 uppercase tracking-widest">
                    Explore Dialogue <ArrowRight size={16} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredConversations.length === 0 && (
            <div className="text-center py-20 bg-[#1a1a1a] rounded-[3rem] border border-dashed border-white/10 max-w-2xl mx-auto">
              <Search className="mx-auto text-neutral-700 mb-6" size={64} />
              <p className="text-neutral-500 text-xl font-medium">
                No conversations found matching your search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
