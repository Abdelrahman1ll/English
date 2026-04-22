
export function AlphabetHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The Alphabet
        </h1>
        <p className="text-neutral-400 mt-1 text-sm sm:text-base">
          Master the 26 letters.
        </p>
      </div>
    </div>
  );
}
