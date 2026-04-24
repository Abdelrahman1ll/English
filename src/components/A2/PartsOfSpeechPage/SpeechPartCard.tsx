import { Volume2, Brain, Zap } from "lucide-react";

interface PartsOfSpeechItem {
  readonly id: number;
  readonly name: string;
  readonly arabicName: string;
  readonly definition: string;
  readonly arabicDefinition: string;
  readonly examples: readonly string[];
}

interface SpeechPartCardProps {
  readonly item: PartsOfSpeechItem;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly onClick: (text: string) => void;
}

export function SpeechPartCard({
  item,
  activeWord,
  playingItem,
  onClick,
}: SpeechPartCardProps) {
  return (
    <div className="group bg-[#1e1e1e] border border-white/5 rounded-3xl overflow-hidden hover:border-amber-400/30 transition-all relative">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Zap size={80} className="text-amber-400" />
      </div>

      <button
        onClick={() => onClick(item.name)}
        className="w-full text-left p-8 pb-4 flex items-center justify-between group/header"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400 font-black text-xl">
            {item.id}
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-white">{item.name}</h2>
            <span className="text-lg font-arabic text-amber-400/80">
              {item.arabicName}
            </span>
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

      <div className="px-8 pb-8 space-y-6 mt-4">
        <div className="space-y-3">
          <p className="text-neutral-300 text-lg leading-relaxed">
            {item.definition}
          </p>
          <div className="text-right" dir="rtl">
            <p className="text-neutral-500 font-arabic text-base leading-relaxed">
              {item.arabicDefinition}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            <Brain size={14} /> Examples
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.examples.map((ex) => (
              <button
                key={ex}
                onClick={() => onClick(ex)}
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
  );
}
