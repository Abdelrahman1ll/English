import { Volume2 } from "lucide-react";

interface Example {
  readonly word: string;
}

interface SoundItem {
  readonly sound: string;
  readonly type: "voiceless" | "voiced";
  readonly examples: readonly Example[];
}

interface PronunciationSoundCardProps {
  readonly item: SoundItem;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly onClick: (word: string) => void;
}

export function PronunciationSoundCard({
  item,
  activeWord,
  playingItem,
  onClick,
}: PronunciationSoundCardProps) {
  const isVoiceless = item.type === "voiceless";
  const colorClass = isVoiceless ? "text-rose-400" : "text-emerald-400";
  const activeBgClass = isVoiceless ? "bg-rose-500/10 border-rose-500/50 text-rose-400" : "bg-emerald-500/10 border-emerald-500/50 text-emerald-400";
  const volumeClass = isVoiceless ? "text-rose-400" : "text-emerald-400";

  return (
    <div className="bg-[#1e1e1e] border border-white/5 p-6 rounded-3xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className={`text-2xl font-black ${colorClass}`}>{item.sound}</span>
        <span className="text-neutral-500 text-xs uppercase font-bold tracking-tighter">
          {item.type}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {item.examples.map((ex) => (
          <button
            key={ex.word}
            onClick={() => onClick(ex.word)}
            className={`p-4 rounded-2xl border transition-all text-center flex items-center justify-between group ${
              activeWord === ex.word
                ? activeBgClass
                : "bg-white/2 border-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            <span className="font-bold">{ex.word}</span>
            <Volume2
              size={16}
              className={`transition-all ${playingItem === ex.word ? `animate-pulse ${volumeClass}` : "opacity-0 group-hover:opacity-100"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
