import { useNavigate } from "react-router-dom";
import { GraduationCap, Target, Brain } from "lucide-react";
import { useLevel } from "../../context/LevelContext";
import { HeroSection } from "./HeroSection";
import { LevelGrid } from "./LevelGrid";

export function LandingPage() {
  const { availableLevels, setLevel } = useLevel();
  const navigate = useNavigate();

  const handleLevelSelect = (levelId: string) => {
    setLevel(levelId);
    navigate(`/${levelId}/home`);
  };

  return (
    <div className="min-h-screen py-12 md:py-20 space-y-24 animate-in fade-in duration-1000">
      <HeroSection />
      <LevelGrid levels={availableLevels as any} onSelect={handleLevelSelect} />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
        {[
          { icon: Target, label: "Guided Paths", value: "5 Levels" },
          { icon: GraduationCap, label: "Total Lessons", value: "100+ Topics" },
          { icon: Brain, label: "Practice Tests", value: "Dynamic Quiz" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/2 border border-white/5 rounded-3xl p-8 flex items-center gap-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-neutral-400"><stat.icon size={28} /></div>
            <div>
              <p className="text-xs font-black text-neutral-600 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
