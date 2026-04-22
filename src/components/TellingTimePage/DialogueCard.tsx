import { Volume2 } from "lucide-react";
import type { Dialogue } from "./types";

interface DialogueCardProps {
  readonly dialogue: Dialogue;
  readonly onClick: (text: string) => void;
}

export function DialogueCard({ dialogue, onClick }: DialogueCardProps) {
  return (
    <div className="bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
      <h3 className="text-xl font-black text-white border-b border-white/5 pb-4">
        {dialogue.title}
      </h3>
      <div className="space-y-4">
        {dialogue.dialogue.map((line, idx) => (
          <button
            key={idx}
            onClick={() => onClick(line.text)}
            className="w-full text-left group flex flex-col gap-1 p-3 rounded-2xl hover:bg-white/5 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-blue-400 uppercase tracking-widest">
                {line.speaker}
              </span>
              <Volume2
                size={14}
                className="opacity-0 group-hover:opacity-40 text-neutral-400"
              />
            </div>
            <p className="text-lg text-white font-medium">{line.text}</p>
            <p className="text-sm font-arabic text-neutral-500">{line.arabic}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
