import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const PAGE_1_QUESTIONS = [
  {
    id: 1,
    text: "The children is playing in the park at the moment.",
    wrong: "is",
    answer: "are",
  },
  {
    id: 2,
    text: "The teacher is writes on the whiteboard at present.",
    wrong: "writes",
    answer: "writing",
  },
  {
    id: 3,
    text: "Mr Ahmed are buying a new car now.",
    wrong: "are",
    answer: "is",
  },
  {
    id: 4,
    text: "Faten and Samy are reads a book in the corner now.",
    wrong: "reads",
    answer: "reading",
  },
  {
    id: 5,
    text: "Listen! the baby are crying for her mother.",
    wrong: "are",
    answer: "is",
  },
  {
    id: 6,
    text: "Look! the man is typed on his computer.",
    wrong: "typed",
    answer: "typing",
  },
  {
    id: 7,
    text: "My mom cooks dinner for her family now.",
    wrong: "cooks",
    answer: "is cooking",
  },
  {
    id: 8,
    text: "They is planted some flowers at the moment.",
    wrong: "is planted",
    answer: "are planting",
  },
  {
    id: 9,
    text: "Shady makes a new model now.",
    wrong: "makes",
    answer: "is making",
  },
  {
    id: 10,
    text: "He plays computer games at present.",
    wrong: "plays",
    answer: "is playing",
  },
  {
    id: 11,
    text: "The students sleeps in the class at the moment.",
    wrong: "sleeps",
    answer: "are sleeping",
  },
  {
    id: 12,
    text: "Now, Rasha writes a letter to her friend.",
    wrong: "writes",
    answer: "is writing",
  },
  {
    id: 13,
    text: "Ali talking to his friend on the phone now.",
    wrong: "talking",
    answer: "is talking",
  },
];

const PAGE_2_QUESTIONS = [
  { id: 1, text: "She ______ (eat) breakfast right now.", answer: "is eating" },
  {
    id: 2,
    text: "They ______ (play) football in the park.",
    answer: "are playing",
  },
  {
    id: 3,
    text: "I ______ (study) for my English test.",
    answer: "am studying",
  },
  {
    id: 4,
    text: "We ______ (watch) a movie at the moment.",
    answer: "are watching",
  },
  {
    id: 5,
    text: "He ______ (write) an email to his teacher.",
    answer: "is writing",
  },
  {
    id: 6,
    text: "The children ______ (make) a mess in the kitchen!",
    answer: "are making",
  },
  { id: 7, text: "You ______ (talk) too fast.", answer: "are talking" },
  { id: 8, text: "My dog ______ (sleep) on the sofa.", answer: "is sleeping" },
];

const PAGE_3_QUESTIONS = [
  {
    id: 1,
    type: "rewrite",
    text: "They swim in the pool.",
    answer: "They are swimming in the pool.",
  },
  {
    id: 2,
    type: "rewrite",
    text: "I clean my room.",
    answer: "I am cleaning my room.",
  },
  {
    id: 3,
    type: "rewrite",
    text: "He plays the guitar.",
    answer: "He is playing the guitar.",
  },
  {
    id: 4,
    type: "rewrite",
    text: "We walk to school.",
    answer: "We are walking to school.",
  },
  {
    id: 5,
    type: "question",
    text: "What / you / do?",
    answer: "What are you doing?",
  },
  {
    id: 6,
    type: "question",
    text: "Where / she / go?",
    answer: "Where is she going?",
  },
  {
    id: 7,
    type: "question",
    text: "Are / they / study?",
    answer: "Are they studying?",
  },
  {
    id: 8,
    type: "question",
    text: "Why / he / cry?",
    answer: "Why is he crying?",
  },
];

export function PresentContinuousWorksheetPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [answers1, setAnswers1] = useState<Record<number, string>>({});
  const [answers2, setAnswers2] = useState<Record<number, string>>({});
  const [answers3, setAnswers3] = useState<Record<number, string>>({});

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const checkAnswers1 = () => setChecked1(true);
  const checkAnswers2 = () => setChecked2(true);
  const checkAnswers3 = () => setChecked3(true);

  const renderInput = (
    value: string,
    onChange: (val: string) => void,
    correctAnswer: string,
    isChecked: boolean,
    placeholder = "Type answer...",
  ) => {
    const isCorrect =
      value.toLowerCase().trim() === correctAnswer.toLowerCase().trim();

    return (
      <div className="relative inline-flex items-center group flex-1 max-w-sm ml-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={isChecked}
          className={`
            w-full bg-[#1e1e1e] border-2 rounded-xl py-2 px-4 text-white text-lg
            transition-all duration-300 outline-none focus:border-emerald-500
            ${isChecked ? (isCorrect ? "border-emerald-500/50 bg-emerald-500/10" : "border-red-500/50 bg-red-500/10") : "border-white/10 hover:border-white/20"}
          `}
        />
        {isChecked && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-in zoom-in">
            {isCorrect ? (
              <CheckCircle className="text-emerald-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
          </div>
        )}
        {isChecked && !isCorrect && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm px-3 py-1.5 rounded-lg border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Answer: {correctAnswer}
          </div>
        )}
      </div>
    );
  };

  const renderPage1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-2">
          Part 1: Correct the Mistakes
        </h2>
        <p className="text-neutral-400 mb-8">
          Read and correct the underlined words in each sentence.
        </p>

        <div className="space-y-6">
          {PAGE_1_QUESTIONS.map((q) => {
            const parts = q.text.split(q.wrong);
            return (
              <div
                key={q.id}
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <span className="text-emerald-400 font-bold text-xl w-6 shrink-0">
                  {q.id}.
                </span>
                <div className="text-lg text-white flex-1 flex flex-wrap items-center gap-y-3">
                  <span>{parts[0]}</span>
                  <span className="underline decoration-red-500/50 text-red-300 mx-1 px-1 bg-red-500/10 rounded">
                    {q.wrong}
                  </span>
                  <span>{parts[1]}</span>
                  {renderInput(
                    answers1[q.id] || "",
                    (val) => setAnswers1({ ...answers1, [q.id]: val }),
                    q.answer,
                    checked1,
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!checked1 && (
        <button
          onClick={checkAnswers1}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-colors"
        >
          Check Answers
        </button>
      )}
    </div>
  );

  const renderPage2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-2">
          Part 2: Complete the Sentences
        </h2>
        <p className="text-neutral-400 mb-8">
          Complete the sentences with the Present Continuous form of the verbs
          in brackets.
        </p>

        <div className="space-y-6">
          {PAGE_2_QUESTIONS.map((q) => {
            const parts = q.text.split("______");
            return (
              <div
                key={q.id}
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <span className="text-emerald-400 font-bold text-xl w-6 shrink-0">
                  {q.id}.
                </span>
                <div className="text-lg text-white flex-1 flex flex-wrap items-center gap-y-3">
                  <span>{parts[0]}</span>
                  {renderInput(
                    answers2[q.id] || "",
                    (val) => setAnswers2({ ...answers2, [q.id]: val }),
                    q.answer,
                    checked2,
                  )}
                  <span>{parts[1]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!checked2 && (
        <button
          onClick={checkAnswers2}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-colors"
        >
          Check Answers
        </button>
      )}
    </div>
  );

  const renderPage3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-2">
          Part 3: Rewrite & Questions
        </h2>
        <p className="text-neutral-400 mb-8">
          Rewrite sentences and make questions using the Present Continuous.
        </p>

        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              Rewrite the sentences
            </h3>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4">
              <p className="text-emerald-300 font-medium">
                Example: She reads a book. ➔ She is reading a book.
              </p>
            </div>
            {PAGE_3_QUESTIONS.filter((q) => q.type === "rewrite").map((q) => (
              <div
                key={q.id}
                className="flex flex-col gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold text-xl">
                    {q.id}.
                  </span>
                  <span className="text-lg text-neutral-300">{q.text}</span>
                </div>
                <div className="ml-8">
                  {renderInput(
                    answers3[q.id] || "",
                    (val) => setAnswers3({ ...answers3, [q.id]: val }),
                    q.answer,
                    checked3,
                    "Write the new sentence...",
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-white/10 my-8" />

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              Make questions
            </h3>
            {PAGE_3_QUESTIONS.filter((q) => q.type === "question").map((q) => (
              <div
                key={q.id}
                className="flex flex-col gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold text-xl">
                    {q.id}.
                  </span>
                  <span className="text-lg text-neutral-300 font-mono bg-black/50 px-3 py-1 rounded-lg border border-white/10">
                    {q.text}
                  </span>
                </div>
                <div className="ml-8">
                  {renderInput(
                    answers3[q.id] || "",
                    (val) => setAnswers3({ ...answers3, [q.id]: val }),
                    q.answer,
                    checked3,
                    "Write the question...",
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!checked3 && (
        <button
          onClick={checkAnswers3}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-colors"
        >
          Check Answers
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-400 to-teal-500 text-white shadow-2xl mb-4">
          <BookOpen size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Present Continuous
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          Practice your knowledge of the Present Continuous tense.
        </p>
      </header>

      {/* Pagination / Tabs */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-12 h-12 rounded-xl font-bold text-lg transition-all ${
                currentPage === page
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(3, prev + 1))}
          disabled={currentPage === 3}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="min-h-[500px]">
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderPage2()}
        {currentPage === 3 && renderPage3()}
      </div>
    </div>
  );
}
