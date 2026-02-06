import { Link } from "react-router-dom";
import { BookOpen, Headphones, PenTool, Mic } from "lucide-react";

export function HomePage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-neutral-400">
          Continue your journey to mastering English.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Reading",
            icon: BookOpen,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            link: "/reading",
          },
          {
            title: "Listening",
            icon: Headphones,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            link: "/listening",
          },
          {
            title: "Writing",
            icon: PenTool,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            link: "/writing",
          },
          {
            title: "Speaking",
            icon: Mic,
            color: "text-rose-400",
            bg: "bg-rose-400/10",
            link: "/speaking",
          },
        ].map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="p-6 rounded-2xl border border-white/5 bg-[#242424] hover:border-white/10 transition-all hover:scale-105 active:scale-95 group"
          >
            <div
              className={`p-3 rounded-lg w-fit ${item.bg} ${item.color} mb-4 group-hover:bg-opacity-20 transition-all`}
            >
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-neutral-500 mt-1">Start practicing</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
