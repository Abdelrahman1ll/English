
interface EgyptianPrideProps {
  readonly onClick: (text: string) => void;
}

export function EgyptianPride({ onClick }: EgyptianPrideProps) {
  return (
    <div className="bg-linear-to-br from-red-600/10 via-white/5 to-black/20 border border-white/10 rounded-[3rem] p-12 flex flex-col items-center text-center space-y-6 shadow-2xl group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-white/20 to-neutral-900 group-hover:opacity-100 opacity-50 transition-opacity" />
      <div className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
        🇪🇬
      </div>
      <h3 className="text-3xl font-black text-white tracking-widest uppercase">
        My Beautiful Egypt
      </h3>
      <button
        onClick={() =>
          onClick(
            "Egypt is my country. I am Egyptian and my language is Arabic."
          )
        }
        className="text-neutral-300 max-w-lg space-y-4 hover:text-white transition-colors"
      >
        <p className="text-2xl font-serif italic">
          "Egypt is my country. I am Egyptian and my language is Arabic."
        </p>
        <span className="font-arabic text-2xl text-emerald-400 mt-4 block dir-rtl">
          مصر هي بلدي. أنا مصري ولغتي هي العربية.
        </span>
      </button>
    </div>
  );
}
