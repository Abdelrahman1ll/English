import { AlertCircle, Quote } from "lucide-react";
import type { QuizQuestion } from "./types";
import type { StudyItem } from "../shared/StudyModule";

interface VerbToBeSectionProps {
  readonly data: {
    readonly SINGULAR: readonly { readonly en: string; readonly ar: string }[];
    readonly PLURAL: readonly { readonly en: string; readonly ar: string }[];
    readonly QUIZ: readonly QuizQuestion[];
  };
  activeWord: string | null;
  quizAnswers: { [key: number]: string };
  readonly studyItems: readonly StudyItem[];
  onItemClick: (text: string) => void;
  onQuizOptionClick: (questionIndex: number, option: string) => void;
}

export function VerbToBeSection({
  data,
  activeWord,
  quizAnswers,
  studyItems,
  onItemClick,
  onQuizOptionClick,
}: VerbToBeSectionProps) {
  if (!data.SINGULAR.length) return null;

  return (
    <section className="space-y-8">
      <div className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-4xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
            <AlertCircle size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            6. The Verb "To Be"
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <VerbToBeTable title="Singular (واحد)" items={data.SINGULAR} activeWord={activeWord} studyItems={studyItems} onItemClick={onItemClick} />
          <VerbToBeTable title="Plural (جمع)" items={data.PLURAL} activeWord={activeWord} studyItems={studyItems} onItemClick={onItemClick} />
        </div>

        <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-2">
          <Quote size={18} className="text-orange-500" /> Quiz: Am, Is, or Are?
        </h3>
        <div className="space-y-4">
          {data.QUIZ.map((q, idx) => {
            const isAnswered = quizAnswers[idx] !== undefined;
            const isCorrect = quizAnswers[idx] === q.answer;

            return (
              <div key={idx} className="bg-[#1e1e1e] p-6 rounded-4xl border border-white/5 shadow-md relative overflow-hidden">
                <div className="absolute -top-1 -left-1 z-20">
                  <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                    <span className="text-[9px] font-black text-neutral-500 tracking-tighter tabular-nums">
                      #{String(studyItems.findIndex(s => s.primary === q.question) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <p className="text-xl text-white font-bold mb-6 flex items-center gap-4 mt-2">{q.question}</p>
                <div className="flex flex-wrap gap-3">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => onQuizOptionClick(idx, option)}
                      disabled={isAnswered && isCorrect}
                      className={`px-6 py-3 rounded-2xl font-black transition-all border-2 ${
                        quizAnswers[idx] === option
                          ? option === q.answer ? "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-500/20" : "bg-rose-600 border-transparent text-white"
                          : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                      } ${isAnswered && option === q.answer ? "bg-emerald-600 border-transparent text-white" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface VerbToBeTableProps {
  readonly title: string;
  readonly items: readonly { readonly en: string; readonly ar: string }[];
  readonly activeWord: string | null;
  readonly studyItems: readonly StudyItem[];
  readonly onItemClick: (text: string) => void;
}

function VerbToBeTable({
  title,
  items,
  activeWord,
  studyItems,
  onItemClick,
}: VerbToBeTableProps) {
  return (
    <div className="bg-black/20 p-5 sm:p-6 rounded-3xl border border-white/5">
      <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-4 px-1">
        {title}
      </h4>
      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.en}
            onClick={() => onItemClick(item.en)}
            className={`w-full text-left p-3 rounded-2xl transition-all border flex items-center justify-between group relative overflow-hidden ${
              activeWord === item.en
                ? "bg-orange-500/10 border-orange-500/50 shadow-lg"
                : "bg-white/2 border-transparent hover:bg-white/5"
            }`}
          >
            <div className="absolute -top-1 -left-1 z-20">
              <div className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded-lg shadow-xl translate-x-1 translate-y-1">
                <span className="text-[8px] font-black text-neutral-500 tracking-tighter tabular-nums">
                  #{String(
                    studyItems.findIndex((s) => s.primary === item.en) + 1,
                  ).padStart(2, "0")}
                </span>
              </div>
            </div>
            <span
              className={`text-xl font-bold transition-colors mt-1 ${activeWord === item.en ? "text-orange-400" : "text-white"}`}
            >
              {item.en}
            </span>
            <span
              className={`text-sm font-arabic transition-colors mt-1 ${activeWord === item.en ? "text-white/70" : "text-neutral-500"}`}
            >
              {item.ar}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
