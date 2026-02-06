import { useState } from "react";
import { Volume2 } from "lucide-react";

type ColorItem = {
  name: string;
  arabic: string;
  hex: string;
  textClass?: string; // For text color contrast
};

const COLORS: ColorItem[] = [
  { name: "Red", arabic: "أحمر", hex: "#ef4444" },
  { name: "White", arabic: "أبيض", hex: "#ffffff", textClass: "text-black" },
  { name: "Green", arabic: "أخضر", hex: "#22c55e" },
  { name: "Blue", arabic: "أزرق", hex: "#3b82f6" },
  { name: "Yellow", arabic: "أصفر", hex: "#eab308", textClass: "text-black" },
  { name: "Brown", arabic: "بني", hex: "#854d0e" },
  { name: "Black", arabic: "أسود", hex: "#000000" },
  { name: "Pink", arabic: "وردي", hex: "#ec4899" },
  { name: "Purple", arabic: "بنفسجي", hex: "#a855f7" },
  { name: "Orange", arabic: "برتقالي", hex: "#f97316" },
  { name: "Golden", arabic: "ذهبي", hex: "#fbbf24", textClass: "text-black" },
  { name: "Silver", arabic: "فضي", hex: "#9ca3af", textClass: "text-black" },
  { name: "Gray", arabic: "رمادي", hex: "#6b7280" },
  { name: "Navy", arabic: "كحلي", hex: "#1e3a8a" },
  { name: "Maroon", arabic: "نبيتي", hex: "#881337" },
  {
    name: "Turquoise",
    arabic: "فيروزي",
    hex: "#2dd4bf",
    textClass: "text-black",
  },
  { name: "Beige", arabic: "بيج", hex: "#f5f5dc", textClass: "text-black" },
  { name: "Olive", arabic: "زيتوني", hex: "#a3a300" },
];

export function ColorsPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setPlayingItem(text);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Colors</h1>
        <p className="text-neutral-400 mt-2">Learn the names of the colors.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => speak(color.name)}
            className="group relative h-48 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 active:scale-95 border border-white/10"
            style={{ backgroundColor: color.hex }}
          >
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-1 ${color.textClass || "text-white"}`}
            >
              <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
                {color.name}
                {playingItem === color.name && (
                  <Volume2 size={20} className="animate-pulse" />
                )}
              </div>
              <div className="text-lg opacity-80 font-arabic">
                {color.arabic}
              </div>
            </div>

            {/* Hover indication overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
