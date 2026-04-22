import { Book } from "lucide-react";

export function GrammarInstructionCard() {
  return (
    <div className="bg-[#1e1e1e] p-8 sm:p-12 rounded-4xl sm:rounded-[4rem] border border-white/5 shadow-2xl text-center space-y-8 relative overflow-hidden group mt-16">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-500 via-blue-500 to-rose-500 opacity-40" />
      <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-500">
        <Book className="text-blue-400" size={32} />
      </div>
      <h3 className="font-black text-white uppercase tracking-[0.4em] text-sm opacity-50">
        Grammar Immersion
      </h3>
      <p className="text-neutral-300 max-w-2xl mx-auto text-2xl leading-relaxed font-light">
        English rules are sets of patterns. Click on any pattern, sentence, or word to trigger the **Practice System**. <br /> Mastery comes through repetitive interaction.
      </p>
    </div>
  );
}
