import { ChevronRight } from "lucide-react";

interface Level {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly color: string;
}

interface LevelGridProps {
  readonly levels: readonly Level[];
  readonly onSelect: (id: string) => void;
}

export function LevelGrid({ levels, onSelect }: LevelGridProps) {
  return (
    <section className="space-y-12">
      <div className="flex items-center gap-6 px-4">
        <div className="h-px flex-1 bg-white/5" />
        <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">
          Choose Your Level
        </h2>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className="group relative bg-[#111] border border-white/5 rounded-[2.5rem] p-10 text-left hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl overflow-hidden"
          >
            <div
              className={`absolute -right-20 -top-20 w-64 h-64 bg-linear-to-br ${level.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700`}
            />

            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div
                  className={`w-16 h-16 rounded-2xl bg-linear-to-br ${level.color} flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform`}
                >
                  {level.id}
                </div>
                <ChevronRight
                  className="text-neutral-800 group-hover:text-blue-500 transition-colors"
                  size={32}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {level.title}
                </h3>
                <p className="text-neutral-500 text-lg leading-relaxed font-medium">
                  {level.description}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-4 text-sm font-black text-blue-500 uppercase tracking-widest">
                Start Learning <div className="h-px flex-1 bg-blue-500/20" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
