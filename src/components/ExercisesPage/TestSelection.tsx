import { Brain, Book, FileText, ChevronRight } from "lucide-react";
import type { Test } from "./types";

interface TestSelectionProps {
  readonly category: string;
  readonly tests: readonly Test[];
  readonly onSelect: (id: string) => void;
}

export function TestSelection({
  category,
  tests,
  onSelect,
}: TestSelectionProps) {
  const isGrammar = category === "grammar";
  const CategoryIcon = isGrammar ? Book : FileText;
  const categoryTitle = isGrammar ? "Grammar Tests" : "Vocabulary Tests";

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <CategoryIcon className="text-blue-400" /> {categoryTitle}
        </h1>
        <p className="text-neutral-400 mt-2">
          Choose a specific topic to practice and test your knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <button
            key={test.id}
            onClick={() => onSelect(test.id)}
            className="group bg-[#1a1a1a] border border-white/5 p-8 rounded-4xl text-left hover:border-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-blue-500/10 transition-colors">
              <Brain size={80} />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {test.title}
                </h3>
                <p className="text-neutral-500 text-sm line-clamp-2">
                  {test.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-500 uppercase tracking-widest pt-2">
                Start Test <ChevronRight size={16} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
