import { Trophy, RefreshCcw } from "lucide-react";

interface TestResultProps {
  readonly score: number;
  readonly total: number;
  readonly onRestart: () => void;
  readonly onBack: () => void;
}

export function TestResult({
  score,
  total,
  onRestart,
  onBack,
}: TestResultProps) {
  return (
    <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
        <Trophy className="relative text-blue-400 mx-auto" size={120} />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-white">Test Complete!</h2>
        <p className="text-xl text-neutral-400">
          You scored <span className="text-blue-400 font-bold">{score}</span>{" "}
          out of <span className="text-white font-bold">{total}</span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10"
        >
          Back to Tests
        </button>
      </div>
    </div>
  );
}
