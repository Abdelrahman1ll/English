import { Volume2, User, UserCircle2, ArrowRight } from "lucide-react";
import type { UnifiedConversation, UnifiedDialogueLine } from "./types";

interface ConversationDetailProps {
  readonly selectedConv: UnifiedConversation;
  readonly activeWord: string | null;
  readonly playingIndex: number | null;
  readonly onBack: () => void;
  readonly onPlayAll: () => void;
  readonly onSpeak: (text: string, index: number) => void;
}

export function ConversationDetail({
  selectedConv,
  activeWord,
  playingIndex,
  onBack,
  onPlayAll,
  onSpeak,
}: ConversationDetailProps) {
  const dialogue = selectedConv.dialogue || selectedConv.messages || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <button
        onClick={onBack}
        className="text-neutral-400 hover:text-white flex items-center gap-2 font-bold transition-colors mb-4"
      >
        <ArrowRight className="rotate-180" size={20} /> Back to Conversations
      </button>

      <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedConv.title || selectedConv.arabicTitle}
            </h2>
            <p className="text-neutral-400">{selectedConv.description}</p>
          </div>
          <button
            onClick={onPlayAll}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Volume2 size={20} /> Listen All
          </button>
        </div>

        <div className="space-y-6">
          {dialogue.map((line: UnifiedDialogueLine, index: number) => (
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
                onClick={() => onSpeak(line.text, index)}
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
                  {line.arabic || line.translation}
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
