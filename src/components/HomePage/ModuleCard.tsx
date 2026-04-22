import { Link } from "react-router-dom";
import type { Module } from "./types";

interface ModuleCardProps {
  readonly module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const getModuleStyle = (title: string) => {
    const styles: Record<string, { color: string; bg: string }> = {
      Alphabet: { color: "text-blue-400", bg: "bg-blue-400/10" },
      Basics: { color: "text-cyan-400", bg: "bg-cyan-400/10" },
      Numbers: { color: "text-orange-400", bg: "bg-orange-400/10" },
      Colors: { color: "text-rose-400", bg: "bg-rose-400/10" },
      Shapes: { color: "text-pink-400", bg: "bg-pink-400/10" },
      Calendar: { color: "text-lime-400", bg: "bg-lime-400/10" },
      Feelings: { color: "text-red-400", bg: "bg-red-400/10" },
      Jobs: { color: "text-yellow-400", bg: "bg-yellow-400/10" },
      Grammar: { color: "text-purple-400", bg: "bg-purple-400/10" },
      Exercises: { color: "text-indigo-400", bg: "bg-indigo-400/10" },
      Dialogues: { color: "text-amber-400", bg: "bg-amber-400/10" },
      "Word Bank": { color: "text-emerald-400", bg: "bg-emerald-400/10" },
      Phrases: { color: "text-pink-400", bg: "bg-pink-400/10" },
      "Daily Routines": { color: "text-blue-400", bg: "bg-blue-400/10" },
      "Basic Verbs": { color: "text-emerald-400", bg: "bg-emerald-400/10" },
    };
    return styles[title] || { color: "text-blue-400", bg: "bg-blue-400/10" };
  };

  const style = getModuleStyle(module.title);

  return (
    <Link
      to={module.to}
      className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center gap-5 hover:border-blue-500/30 hover:scale-[1.05] transition-all duration-300 shadow-xl"
    >
      <div
        className={`w-16 h-16 ${style.bg} ${style.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}
      >
        <module.icon size={32} />
      </div>
      <span className="text-white font-black tracking-tight text-sm px-2">
        {module.title}
      </span>
    </Link>
  );
}
