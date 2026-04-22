import { MessageSquare, ArrowRight } from "lucide-react";
import type { UnifiedConversation } from "./types";

interface ConversationCardProps {
  readonly conv: UnifiedConversation;
  readonly onClick: () => void;
}

export function ConversationCard({ conv, onClick }: ConversationCardProps) {
  return (
    <button
      onClick={onClick}
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
        <p className="text-neutral-400 mb-6 line-clamp-2">{conv.description}</p>
        <div className="flex items-center gap-2 text-sm font-bold text-blue-500 uppercase tracking-widest">
          Explore Dialogue <ArrowRight size={16} />
        </div>
      </div>
    </button>
  );
}
