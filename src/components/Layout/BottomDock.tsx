import { Mic, PenLine, ArrowLeft } from "lucide-react";

interface BottomDockProps {
  readonly activeWord: string | null;
  readonly practiceMode: "writing" | "speaking" | null;
  readonly onSetPracticeMode: (mode: "writing" | "speaking" | null) => void;
  readonly onBack: () => void;
}

export function BottomDock({
  activeWord,
  practiceMode,
  onSetPracticeMode,
  onBack,
}: BottomDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 bg-[#1a1a1a]/90 backdrop-blur-2xl border-2 border-white/10 z-50 flex items-center justify-around px-2 sm:px-4 rounded-full shadow-2xl shadow-black/50 transition-all duration-300 w-[90%] sm:w-[60%] lg:w-[25%] min-w-[280px]">
      <button
        onClick={() => onSetPracticeMode("writing")}
        className={`p-2.5 rounded-full transition-all flex-1 flex justify-center items-center ${
          practiceMode === "writing"
            ? "bg-amber-500 text-black shadow-lg scale-110"
            : activeWord
              ? "text-amber-500 hover:bg-white/5"
              : "text-neutral-700 opacity-40 cursor-not-allowed"
        }`}
        disabled={!activeWord}
      >
        <PenLine size={22} />
      </button>

      <button
        onClick={() => onSetPracticeMode("speaking")}
        className={`p-2.5 rounded-full transition-all flex-1 flex justify-center items-center ${
          practiceMode === "speaking"
            ? "bg-rose-500 text-white shadow-lg scale-110"
            : activeWord
              ? "text-rose-500 hover:bg-white/5"
              : "text-neutral-700 opacity-40 cursor-not-allowed"
        }`}
        disabled={!activeWord}
      >
        <Mic size={22} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <button
        onClick={onBack}
        className="p-2.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all flex-1 flex justify-center items-center"
      >
        <ArrowLeft size={22} />
      </button>
    </div>
  );
}
