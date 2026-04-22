import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Search, LayoutGrid, Coffee, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { ConversationDetail } from "./ConversationDetail";
import { ConversationCard } from "./ConversationCard";
import type { UnifiedConversation, Category } from "./types";

export function ConversationsPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedConv, setSelectedConv] = useState<UnifiedConversation | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const rawData = useMemo(() => (levelData?.conversations?.CONVERSATIONS_DATA || []) as readonly UnifiedConversation[], [levelData]);

  const categories: readonly Category[] = [
    { name: "Daily Life", icon: Coffee, color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "Travel & Shopping", icon: ShoppingBag, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { name: "Work & Study", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  const filteredConversations = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return rawData.filter(conv => {
      if (selectedCategory && conv.category !== selectedCategory) return false;
      const title = conv.title || conv.arabicTitle || "";
      const desc = conv.description || "";
      const textMatch = title.toLowerCase().includes(term) || desc.toLowerCase().includes(term);
      const dialogue = conv.dialogue || conv.messages || [];
      const dialMatch = dialogue.some(l => l.text.toLowerCase().includes(term) || (l.arabic || l.translation || "").includes(searchQuery));
      return textMatch || dialMatch;
    });
  }, [rawData, searchQuery, selectedCategory]);

  const handleSpeak = (text: string, index: number) => { speak(text, () => setPlayingIndex(null)); setPlayingIndex(index); setPracticeWord(text); };

  const playEntireConversation = async () => {
    if (!selectedConv) return;
    const dialogue = selectedConv.dialogue || selectedConv.messages || [];
    for (let i = 0; i < dialogue.length; i++) {
      setPlayingIndex(i);
      await new Promise<void>(res => speak(dialogue[i].text, () => res()));
    }
    setPlayingIndex(null);
  };

  if (selectedConv) return <ConversationDetail selectedConv={selectedConv} activeWord={activeWord} playingIndex={playingIndex} onBack={() => setSelectedConv(null)} onPlayAll={playEntireConversation} onSpeak={handleSpeak} />;

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3"><MessageSquare className="text-blue-400" /> Conversations</h1>
            <p className="text-neutral-400 mt-2">Listen and learn from real-life dialogue examples.</p>
          </div>
          {selectedCategory && <button onClick={() => { setSelectedCategory(null); setSearchQuery(""); }} className="text-neutral-500 hover:text-white flex items-center gap-2 font-bold transition-colors"><LayoutGrid size={18} /> All Categories</button>}
        </div>
      </header>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden font-arabic" />
      </div>

      {!selectedCategory && !searchQuery ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-[2.5rem] text-left hover:border-blue-500/30 transition-all hover:scale-[1.02] relative overflow-hidden">
              <div className={`w-16 h-16 ${cat.bg} rounded-2xl flex items-center justify-center ${cat.color} mb-6`}><cat.icon size={32} /></div>
              <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-neutral-500 text-sm">Explore dialogues related to {cat.name.toLowerCase()}.</p>
              <div className={`mt-6 flex items-center gap-2 text-sm font-bold ${cat.color} uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>View More <ArrowRight size={16} /></div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredConversations.map(conv => <ConversationCard key={conv.id} conv={conv} onClick={() => setSelectedConv(conv)} />)}
          </div>
          {filteredConversations.length === 0 && (
            <div className="text-center py-20 bg-[#1a1a1a] rounded-[3rem] border border-dashed border-white/10 max-w-2xl mx-auto">
              <Search className="mx-auto text-neutral-700 mb-6" size={64} />
              <p className="text-neutral-500 text-xl font-medium">No conversations found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
