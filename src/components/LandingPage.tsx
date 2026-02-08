import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Trophy,
  Target,
  Brain,
} from "lucide-react";
import { useLevel } from "../context/LevelContext";

export function LandingPage() {
  const { availableLevels, setLevel } = useLevel();
  const navigate = useNavigate();

  const handleLevelSelect = (levelId: string) => {
    setLevel(levelId);
    navigate(`/${levelId}/home`);
  };

  const features = [
    { icon: BookOpen, text: "Comprehensive Lessons", color: "text-blue-400" },
    { icon: Sparkles, text: "Interactive Practice", color: "text-purple-400" },
    { icon: Trophy, text: "Achievement Tracking", color: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen py-12 md:py-20 space-y-24 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">
          <Sparkles size={16} /> Welcome to English Master
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight">
          Your Journey to <br />
          <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Fluency Starts Here
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed">
          The most interactive way to learn English. From basic greetings to
          advanced academic discussions, we prepare you for the real world.
        </p>

        <div className="flex flex-wrap justify-center gap-8 pt-8 text-neutral-500">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <f.icon className={f.color} size={24} />
              <span className="font-bold uppercase tracking-wider text-xs">
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Level Selection Section */}
      <section className="space-y-12">
        <div className="flex items-center gap-6 px-4">
          <div className="h-px flex-1 bg-white/5" />
          <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">
            Choose Your Level
          </h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              className="group relative bg-[#111] border border-white/5 rounded-[2.5rem] p-10 text-left hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl overflow-hidden"
            >
              {/* Background Glow */}
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

      {/* Quick Stats Footer */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
        {[
          { icon: Target, label: "Guided Paths", value: "5 Levels" },
          { icon: GraduationCap, label: "Total Lessons", value: "100+ Topics" },
          { icon: Brain, label: "Practice Tests", value: "Dynamic Quiz" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/2 border border-white/5 rounded-3xl p-8 flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-neutral-400">
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                {stat.label}
              </p>
              <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
