import { Volume2, Brain, Zap } from "lucide-react";

interface Example {
  readonly en: string;
  readonly ar: string;
}

interface PartsOfSpeechItem {
  readonly id: number;
  readonly name: string;
  readonly arabicName: string;
  readonly definition: string;
  readonly arabicDefinition: string;
  readonly examples: readonly Example[];
}

interface SpeechPartCardProps {
  readonly item: PartsOfSpeechItem;
  readonly activeWord: string | null;
  readonly playingItem: string | null;
  readonly onClick: (text: string) => void;
  readonly startIndex: number;
}

export function SpeechPartCard({
  item,
  activeWord,
  playingItem,
  onClick,
  startIndex,
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
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400 font-black text-xl shadow-inner">
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
          <div className="flex flex-wrap gap-4 pt-2">
            {item.examples.map((ex, idx) => (
              <button
                key={ex.en}
                onClick={() => onClick(ex.en)}
                className={`px-6 py-3 rounded-2xl border flex items-center gap-4 transition-all group/btn relative ${
                  activeWord === ex.en
                    ? "bg-amber-400/10 border-amber-400/50 text-amber-400"
                    : "bg-white/2 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                {/* Premium "Pop-out" Badge */}
                <div className="absolute -top-2 -left-2 z-20">
                  <div className={`px-2 py-0.5 rounded-lg border text-[8px] font-black tabular-nums shadow-2xl transition-all transform group-hover/btn:scale-110 ${
                    activeWord === ex.en 
                      ? "bg-amber-400 border-amber-300 text-black shadow-amber-400/20" 
                      : "bg-neutral-900 border-white/10 text-neutral-400 shadow-black/40"
                  }`}>
                    #{String(startIndex + idx + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="flex flex-col items-start leading-none gap-1.5">
                  <span className="font-bold text-base">{ex.en}</span>
                  <span className={`text-xs font-arabic transition-colors ${activeWord === ex.en ? "text-amber-200" : "text-amber-500/70"}`}>
                    {ex.ar}
                  </span>
                </div>
                <Volume2
                  size={14}
                  className={`transition-all ${playingItem === ex.en ? "scale-125 text-amber-400" : "opacity-0 group-hover/btn:opacity-100"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
