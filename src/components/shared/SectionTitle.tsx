import type { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly color: "blue" | "amber" | "emerald" | "rose";
}

export function SectionTitle({ icon: Icon, title, color }: SectionTitleProps) {
  const colors = {
    blue: "bg-blue-500/20 text-blue-400",
    amber: "bg-amber-500/20 text-amber-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    rose: "bg-rose-500/20 text-rose-400",
  };

  return (
    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
      <div className={`p-2.5 rounded-xl ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-black text-white uppercase tracking-wider">
        {title}
      </h2>
    </div>
  );
}
