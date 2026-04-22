import { Sparkles, BookOpen, Trophy } from "lucide-react";

export function HeroSection() {
  const features = [
    { icon: BookOpen, text: "Comprehensive Lessons", color: "text-blue-400" },
    { icon: Sparkles, text: "Interactive Practice", color: "text-purple-400" },
    { icon: Trophy, text: "Achievement Tracking", color: "text-amber-400" },
  ];

  return (
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
  );
}
