import { ALPHABET_DATA, ALPHABET } from "./AlphabetData";

interface AlphabetCardProps {
  letter: string;
  isActive: boolean;
  onClick: (letter: string) => void;
}

export function AlphabetCard({ letter, isActive, onClick }: AlphabetCardProps) {
  return (
    <button
      onClick={() => onClick(letter)}
      className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative overflow-hidden group border ${
        isActive
          ? "bg-blue-500/10 border-blue-500/50 text-blue-400 sm:scale-110 sm:z-10 shadow-xl shadow-blue-500/10"
          : "bg-[#1e1e1e] text-neutral-300 border-white/5 hover:bg-[#2a2a2a]"
      }`}
    >
      {/* Matte Index Badge */}
      <div className="absolute -top-1 -left-1 z-20">
        <div className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
          <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
            #{String(ALPHABET.indexOf(letter) + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-xl sm:text-2xl md:text-3xl font-bold">
        {letter}
        {letter.toLowerCase()}
      </span>
      {isActive && (
        <div className="text-xs mt-1 font-medium opacity-80">
          {ALPHABET_DATA[letter].sound}
        </div>
      )}
    </button>
  );
}
