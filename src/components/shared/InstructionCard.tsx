
export function InstructionCard() {
  return (
    <div className="bg-[#1e1e1e] p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 opacity-30" />
      <h3 className="font-black text-white uppercase tracking-[0.2em] text-sm opacity-50">
        Immersion Practice
      </h3>
      <p className="text-neutral-300 max-w-xl mx-auto text-xl leading-relaxed">
        Click on any letter to trigger the **Practice System**. <br />{" "}
        Use the floating tools to master your pronunciation and writing.
      </p>
    </div>
  );
}
