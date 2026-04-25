import { Quote, Sparkles, CheckCircle2 } from "lucide-react";
import type { QuizQuestion } from "../types";
import type { StudyItem } from "../../shared/StudyModule";

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
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Rule Summary Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-orange-900/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                The Verb "To Be"
              </h2>
            </div>
            <p className="text-orange-50 text-lg max-w-md font-medium leading-relaxed">
              Verb "to be" is used to describe people, things, and feelings.
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-right" dir="rtl">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-end gap-2">
              القاعدة الأساسية <CheckCircle2 size={18} className="text-orange-300" />
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <p className="text-white font-black text-xl">Am</p>
                <p className="text-orange-100 text-xs">مع I</p>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <p className="text-white font-black text-xl">Is</p>
                <p className="text-orange-100 text-xs">مفرد</p>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <p className="text-white font-black text-xl">Are</p>
                <p className="text-orange-100 text-xs">جمع</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 p-8 rounded-4xl shadow-xl space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VerbToBeTable title="Singular (واحد)" items={data.SINGULAR} activeWord={activeWord} studyItems={studyItems} onItemClick={onItemClick} />
          <VerbToBeTable title="Plural (جمع)" items={data.PLURAL} activeWord={activeWord} studyItems={studyItems} onItemClick={onItemClick} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400">
              <Quote size={20} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              Quiz: Am, Is, or Are?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.QUIZ.map((q, idx) => {
              const isAnswered = quizAnswers[idx] !== undefined;
              const isCorrect = quizAnswers[idx] === q.answer;

              return (
                <div key={idx} className="bg-neutral-900/50 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group relative">
                  <div className="absolute -top-2 -left-2 z-20">
                    <div className="flex items-center justify-center min-w-[28px] h-[18px] bg-orange-600 border border-orange-400 rounded-lg shadow-xl">
                      <span className="text-[10px] font-black text-white tracking-tighter leading-none tabular-nums">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-6 mt-4">
                    <p className="text-xl text-white font-bold">{q.question}</p>
                    {q.translation && (
                      <p className="text-neutral-500 font-arabic text-sm" dir="rtl">{q.translation}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => onQuizOptionClick(idx, option)}
                        disabled={isAnswered && isCorrect}
                        className={`px-6 py-2.5 rounded-xl font-black transition-all border-2 text-sm ${
                          quizAnswers[idx] === option
                            ? option === q.answer ? "bg-emerald-600 border-transparent text-white shadow-lg" : "bg-rose-600 border-transparent text-white"
                            : isAnswered && option === q.answer
                              ? "bg-emerald-600 border-transparent text-white"
                              : "bg-white/5 border-transparent text-neutral-400 hover:bg-white/10 hover:text-white"
                        }`}
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
  onItemClick,
}: VerbToBeTableProps) {
  return (
    <div className="bg-black/20 p-6 rounded-[2rem] border border-white/5 shadow-inner">
      <h4 className="text-xs font-black text-orange-500/60 uppercase tracking-[0.2em] mb-6">
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <button
            key={item.en}
            onClick={() => onItemClick(item.en)}
            className={`w-full text-left p-4 rounded-2xl transition-all border group relative flex items-center justify-between ${
              activeWord === item.en
                ? "bg-orange-600 border-orange-400 shadow-xl shadow-orange-600/10"
                : "bg-neutral-900 border-white/5 hover:bg-neutral-800"
            }`}
          >
            <div className="absolute -top-2 -left-2 z-20">
              <div className={`flex items-center justify-center min-w-[28px] h-[16px] rounded-md border shadow-lg backdrop-blur-md transition-all ${activeWord === item.en ? "bg-orange-600 border-orange-400" : "bg-neutral-800 border-white/10"}`}>
                <span className={`text-[9px] font-black tracking-tighter leading-none ${activeWord === item.en ? "text-white" : "text-orange-500"}`}>
                  #{String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
            <span className={`text-xl font-bold transition-colors ${activeWord === item.en ? "text-white" : "text-neutral-200"}`}>
              {item.en}
            </span>
            <span className={`text-sm font-arabic transition-colors ${activeWord === item.en ? "text-white/80" : "text-neutral-500"}`}>
              {item.ar}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
