import { Volume2 } from "lucide-react";

interface Example {
  readonly word: string;
  readonly translation: string;
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
  const activeBgClass = isVoiceless ? "bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-lg shadow-rose-500/5" : "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/5";
  const volumeClass = isVoiceless ? "text-rose-400" : "text-emerald-400";

  return (
    <div className="bg-[#1a1a1a] border border-white/5 p-6 rounded-3xl space-y-4 hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className={`text-2xl font-black ${colorClass}`}>{item.sound}</span>
        <span className="text-neutral-500 text-[10px] uppercase font-black tracking-widest bg-white/5 px-2 py-0.5 rounded-md">
          {item.type}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {item.examples.map((ex) => (
          <button
            key={ex.word}
            onClick={() => onClick(ex.word)}
            className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between group relative ${
              activeWord === ex.word
                ? activeBgClass
                : "bg-white/2 border-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            <div className="flex flex-col items-start leading-none gap-1.5">
              <span className="font-bold text-lg">{ex.word}</span>
              <span className={`text-xs font-arabic transition-colors font-medium ${activeWord === ex.word ? "text-white" : "text-neutral-400"}`}>
                {ex.translation}
              </span>
            </div>
            <Volume2
              size={16}
              className={`transition-all ${playingItem === ex.word ? `scale-125 ${volumeClass}` : "opacity-0 group-hover:opacity-100 text-neutral-600"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
