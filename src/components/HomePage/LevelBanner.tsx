import type { Level } from "./types";
import { Link } from "react-router-dom";
import { Map, Crown } from "lucide-react";

interface LevelBannerProps {
  readonly level: Level;
}

export function LevelBanner({ level }: LevelBannerProps) {
  return (
    <header className="relative p-10 md:p-16 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
      <div
        className={`absolute inset-0 bg-linear-to-br ${level.color} opacity-10`}
      />
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="space-y-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r ${level.color} text-white text-sm font-black uppercase tracking-widest`}
          >
            {level.id} Dashboard
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Master <span className="text-blue-500">{level.title}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl font-medium leading-relaxed">
            {level.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to={`/${level.id}/mindmap`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all w-fit"
            >
              <Map className="w-5 h-5" />
              Explore Mind Map
            </Link>
            <Link
              to={`/${level.id}/subscription`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 font-bold transition-all w-fit"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Premium
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center space-y-2">
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
              Modules
            </p>
            <p className="text-3xl font-black text-white">{level.modules.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center space-y-2">
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
              Tests
            </p>
            <p className="text-3xl font-black text-blue-400">
              {level.modules.filter(m => m.category === 'tests').length || 0}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
