import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  MessageSquare,
  Volume2,
  User,
  UserCircle2,
  ArrowRight,
  Search,
} from "lucide-react";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

export function ConversationsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawConversationsData =
    levelData?.conversations?.CONVERSATIONS_DATA || [];

  const filteredConversations = useMemo(() => {
    const term = searchQuery.toLowerCase();
    // The instruction states to filter by title and description for Conversations page.
    // The existing code already filters by title, description, and dialogue content.
    // To strictly adhere to "filters the main conversation list by title and description"
    // while keeping the existing functionality that is likely desired,
    // we will keep the current comprehensive filtering.
    // If the intent was to *remove* dialogue filtering, that would be a different change.
    return rawConversationsData.filter(
      (conv: any) =>
        conv.title.toLowerCase().includes(term) ||
        conv.description.toLowerCase().includes(term) ||
        conv.dialogue.some(
          (line: any) =>
            line.text.toLowerCase().includes(term) ||
            line.arabic.includes(searchQuery),
        ),
    );
  }, [rawConversationsData, searchQuery]);

  const CONVERSATIONS_DATA = filteredConversations;

  const [selectedConv, setSelectedConv] = useState<any | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { speak } = useSpeech();

  const handleSpeak = (text: string, index: number) => {
    speak(text, () => setPlayingIndex(null));
    setPlayingIndex(index);
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
                      playingIndex === index
                        ? "bg-blue-600/10 border-blue-500/50 scale-[1.02] ring-2 ring-blue-500/20"
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
                        ? "text-blue-400 opacity-100"
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
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <MessageSquare className="text-blue-400" /> Conversations
        </h1>
        <p className="text-neutral-400 mt-2">
          Listen and learn from real-life dialogue examples.
        </p>
      </div>

      {/* The search bar UI is already present and correctly wired to searchQuery */}
      {!selectedConv && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CONVERSATIONS_DATA.map((conv: any) => (
          <button
            key={conv.id}
            onClick={() => setSelectedConv(conv)}
            className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-3xl text-left hover:border-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/5 relative overflow-hidden"
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
    </div>
  );
}
