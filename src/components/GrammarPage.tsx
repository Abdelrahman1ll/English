import { useState } from "react";
import { Book, Volume2, AlertCircle } from "lucide-react";

type GrammarItem = {
  word: string;
  arabic: string;
  image?: string;
  article: "a" | "an" | "none";
};

const EXAMPLES_A: GrammarItem[] = [
  { word: "Car", arabic: "سيارة", article: "a" },
  { word: "Book", arabic: "كتاب", article: "a" },
  { word: "Girl", arabic: "بنت", article: "a" },
  { word: "Computer", arabic: "كمبيوتر", article: "a" },
];

const EXAMPLES_AN: GrammarItem[] = [
  { word: "Apple", arabic: "تفاحة", article: "an" },
  { word: "Orange", arabic: "برتقالة", article: "an" },
];

const EXAMPLES_UNCOUNTABLE: GrammarItem[] = [
  { word: "Oil", arabic: "زيت", article: "none" },
  { word: "Tea", arabic: "شاي", article: "none" },
  { word: "Sugar", arabic: "سكر", article: "none" },
];

const EXAMPLES_PLURAL: { singular: string; plural: string; arabic: string }[] =
  [
    { singular: "Book", plural: "Books", arabic: "كتب" },
    { singular: "Car", plural: "Cars", arabic: "سيارات" },
    { singular: "Rabbit", plural: "Rabbits", arabic: "أرانب" },
    { singular: "Cat", plural: "Cats", arabic: "قطط" },
    { singular: "Dog", plural: "Dogs", arabic: "كلاب" },
  ];

const PRONOUNS_QUIZ = [
  {
    question: "The train has stopped.",
    answer: "It",
    options: ["He", "It", "We", "They"],
  },
  {
    question: "The dog ran behind the car.",
    answer: "It",
    options: ["He", "She", "It", "They"],
  },
  {
    question: "Sita, Renu and Priya are friends.",
    answer: "They",
    options: ["He", "It", "We", "They"],
  },
  {
    question: "Nitin And I had breakfast.",
    answer: "We",
    options: ["It", "He", "They", "We"],
  },
  {
    question: "My dad is a doctor.",
    answer: "He",
    options: ["They", "It", "He", "She"],
  },
  {
    question: "The man is reading a book.",
    answer: "He",
    options: ["It", "She", "They", "He"],
  },
  {
    question: "Rosy is a bright student.",
    answer: "She",
    options: ["He", "She", "It", "They"],
  },
  {
    question: "Mom, dad and me went to a party.",
    answer: "We",
    options: ["They", "We", "She", "It"],
  },
];

const TO_BE_QUIZ = [
  {
    question: "My cat ___ black and white.",
    answer: "is",
    options: ["am", "is", "are"],
  },
  {
    question: "Mum and Dad ___ away.",
    answer: "are",
    options: ["am", "is", "are"],
  },
  { question: "I ___ hungry.", answer: "am", options: ["am", "is", "are"] },
  {
    question: "The sun ___ yellow.",
    answer: "is",
    options: ["am", "is", "are"],
  },
  {
    question: "We ___ from Denmark.",
    answer: "are",
    options: ["am", "is", "are"],
  },
  {
    question: "You ___ in love with Bob.",
    answer: "are",
    options: ["am", "is", "are"],
  },
  {
    question: "It ___ hot today.",
    answer: "is",
    options: ["am", "is", "are"],
  },
  {
    question: "The people ___ noisy.",
    answer: "are",
    options: ["am", "is", "are"],
  },
];

const DEMONSTRATIVES_DATA = [
  {
    title: "Near & Far (Singular)",
    items: [
      {
        text: "This",
        translation: "هذا / هذه (للقريب)",
        category: "Near",
        rule: "Singular",
      },
      {
        text: "That",
        translation: "ذلك / تلك (للبعيد)",
        category: "Far",
        rule: "Singular",
      },
    ],
    examples: [
      { text: "This is a piano.", translation: "هذا بيانو." },
      { text: "That is a bird.", translation: "ذلك عصفور." },
      { text: "This is a table.", translation: "هذه طاولة." },
      { text: "That is a butterfly.", translation: "تلك فراشة." },
    ],
  },
  {
    title: "Near & Far (Plural)",
    items: [
      {
        text: "These",
        translation: "هؤلاء / هذه (للقريب)",
        category: "Near",
        rule: "Plural",
      },
      {
        text: "Those",
        translation: "أولئك / تلك (للبعيد)",
        category: "Far",
        rule: "Plural",
      },
    ],
    examples: [
      { text: "These are books.", translation: "هذه كتب." },
      { text: "Those are trees.", translation: "تلك أشجار." },
      { text: "These are candles.", translation: "هذه شموع." },
      { text: "Those are carrots.", translation: "تلك جزر." },
    ],
  },
];

const PREPOSITIONS_DATA = [
  { text: "In", translation: "في" },
  { text: "Of", translation: "من / لـ" },
  { text: "Onto", translation: "إلى / على" },
  { text: "Behind", translation: "خلف" },
  { text: "At", translation: "في / عند" },
  { text: "For", translation: "لـ / لأجل" },
  { text: "Above", translation: "فوق" },
  { text: "Under", translation: "تحت" },
  { text: "Into", translation: "إلى داخل" },
  { text: "Over", translation: "فوق / عبر" },
  { text: "From", translation: "من" },
  { text: "Next to", translation: "بجانب" },
  { text: "Across", translation: "عبر / في المقابل" },
];

export function GrammarPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [toBeQuizAnswers, setToBeQuizAnswers] = useState<{
    [key: number]: string;
  }>({});

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setPlayingItem(text);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizOptionClick = (questionIndex: number, option: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    if (option === PRONOUNS_QUIZ[questionIndex].answer) {
      speak("Correct!");
    } else {
      speak("Try again.");
    }
  };

  const handleToBeQuizOptionClick = (questionIndex: number, option: string) => {
    setToBeQuizAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    if (option === TO_BE_QUIZ[questionIndex].answer) {
      speak("Correct!");
    } else {
      speak("Try again.");
    }
  };

  const renderCard = (item: GrammarItem) => {
    const displayText =
      item.article === "none" ? item.word : `${item.article} ${item.word}`;

    return (
      <button
        key={item.word}
        onClick={() => speak(displayText)}
        className={`p-6 rounded-2xl border transition-all text-left group hover:scale-105 ${
          playingItem === displayText
            ? "bg-blue-600 border-blue-400 shadow-lg"
            : "bg-[#1e1e1e] border-white/10 hover:bg-[#252525]"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-2xl font-bold ${playingItem === displayText ? "text-white" : "text-blue-400"}`}
          >
            {item.article !== "none" && (
              <span className="text-white/60 mr-2">{item.article}</span>
            )}
            {item.word}
          </span>
          <Volume2
            size={20}
            className={`transition-opacity ${playingItem === displayText ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-100 text-neutral-400"}`}
          />
        </div>
        <div
          className={`text-lg font-arabic ${playingItem === displayText ? "text-white/90" : "text-neutral-400"}`}
        >
          {item.arabic}
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Book className="text-emerald-400" /> Grammar
        </h1>
        <p className="text-neutral-400 mt-1 text-sm sm:text-base">
          Singular, Plural, and Articles.
        </p>
      </div>

      {/* Section 1: The Rule (A) */}
      <section className="space-y-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            1. The Article "A"
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            We use{" "}
            <span className="text-emerald-400 font-bold text-xl px-1">A</span>{" "}
            before nouns that begin with a consonant sound.
            <br />
            <span className="text-white/60 italic text-sm mt-1 block">
              "A" basically means "One". (A car = One car)
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXAMPLES_A.map(renderCard)}
          </div>
        </div>
      </section>

      {/* Section 2: Vowels (An) */}
      <section className="space-y-6">
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            2. The Vowels (An)
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {["A", "E", "I", "O", "U"].map((vowel) => (
              <span
                key={vowel}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500 text-black font-black text-xl"
              >
                {vowel}
              </span>
            ))}
          </div>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            If a word starts with a <strong>Vowel</strong> (A, E, I, O, U), we
            use{" "}
            <span className="text-amber-400 font-bold text-xl px-1">An</span>{" "}
            instead of "A".
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXAMPLES_AN.map(renderCard)}
          </div>
        </div>
      </section>

      {/* Section 3: Uncountable */}
      <section className="space-y-6">
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 sm:p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Uncountable Nouns
            </h2>
          </div>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            Some words <strong>cannot</strong> be counted (Uncountable). We do{" "}
            <span className="text-rose-400 font-bold">NOT</span> use "a" or "an"
            with them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {EXAMPLES_UNCOUNTABLE.map(renderCard)}
          </div>
        </div>
      </section>

      {/* Section 4: Singular vs Plural */}
      <section className="space-y-6">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            4. Singular & Plural
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            To make most words plural (more than one), we usually add{" "}
            <span className="text-blue-400 font-bold text-xl px-1">S</span> at
            the end.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {EXAMPLES_PLURAL.map((item) => (
              <button
                key={item.singular}
                onClick={() => speak(`${item.singular}... ${item.plural}`)}
                className="flex items-center justify-between p-4 rounded-xl bg-[#1e1e1e] border border-white/10 hover:bg-[#252525] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold text-neutral-400">
                    {item.singular}
                  </div>
                  <div className="text-neutral-600">→</div>
                  <div className="text-xl font-bold text-blue-400">
                    {item.plural}
                  </div>
                </div>
                <div className="text-lg font-arabic text-neutral-500">
                  {item.arabic}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pronouns Quiz */}
      <section className="space-y-6">
        <div className="bg-purple-500/10 border border-purple-500/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            5. Subject Pronouns Quiz
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            Choose the correct pronoun:{" "}
            <span className="font-bold text-purple-400">
              He, She, It, They, We
            </span>
            .
          </p>
          <div className="space-y-4">
            {PRONOUNS_QUIZ.map((q, idx) => {
              const isAnswered = quizAnswers[idx] !== undefined;
              const isCorrect = quizAnswers[idx] === q.answer;

              return (
                <div
                  key={idx}
                  className="bg-[#1e1e1e] p-5 rounded-2xl border border-white/5"
                >
                  <p className="text-xl text-white font-medium mb-4">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuizOptionClick(idx, option)}
                        disabled={isAnswered && isCorrect}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${
                          quizAnswers[idx] === option
                            ? option === q.answer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "bg-white/5 text-neutral-300 hover:bg-white/10"
                        } ${isAnswered && option === q.answer ? "bg-emerald-500 text-white ring-2 ring-emerald-500/50" : ""}`}
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

      {/* Section 6: Verb To Be */}
      <section className="space-y-6">
        <div className="bg-orange-500/10 border border-orange-500/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            6. The Verb "To Be"
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            Singular (One):
            <br />
            <span className="text-orange-400 font-bold">I am</span>
            <br />
            <span className="text-orange-400 font-bold">He / She / It is</span>
            <br />
            <br />
            Plural (Many):
            <br />
            <span className="text-orange-400 font-bold">
              We / You / They are
            </span>
          </p>

          <h3 className="text-xl font-bold text-white mb-4 mt-8 pt-6 border-t border-white/10">
            Quiz: Am, Is, or Are?
          </h3>
          <div className="space-y-4">
            {TO_BE_QUIZ.map((q, idx) => {
              const isAnswered = toBeQuizAnswers[idx] !== undefined;
              const isCorrect = toBeQuizAnswers[idx] === q.answer;

              return (
                <div
                  key={idx}
                  className="bg-[#1e1e1e] p-5 rounded-2xl border border-white/5"
                >
                  <p className="text-xl text-white font-medium mb-4">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleToBeQuizOptionClick(idx, option)}
                        disabled={isAnswered && isCorrect}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${
                          toBeQuizAnswers[idx] === option
                            ? option === q.answer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "bg-white/5 text-neutral-300 hover:bg-white/10"
                        } ${isAnswered && option === q.answer ? "bg-emerald-500 text-white ring-2 ring-emerald-500/50" : ""}`}
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

      {/* Section 7: Demonstratives */}
      <section className="space-y-6">
        <div className="bg-blue-600/10 border border-blue-600/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            7. Demonstratives (الإشارة)
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            We use these words to point things out:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEMONSTRATIVES_DATA.map((group) => (
              <div key={group.title} className="space-y-6">
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest px-2">
                  {group.title}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <button
                      key={item.text}
                      onClick={() =>
                        speak(`${item.text}... means ${item.translation}`)
                      }
                      className={`p-4 rounded-2xl border transition-all text-center group flex flex-col items-center justify-center ${
                        playingItem ===
                        `${item.text}... means ${item.translation}`
                          ? "bg-blue-600 border-blue-400"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                      }`}
                    >
                      <span className="text-2xl font-black text-white">
                        {item.text}
                      </span>
                      <span className="text-xs font-arabic text-neutral-400 mt-1">
                        {item.translation}
                      </span>
                      <div className="flex gap-1 mt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          {item.rule}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-500">
                          {item.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-black/20 rounded-2xl p-4 space-y-3">
                  {group.examples.map((ex) => (
                    <button
                      key={ex.text}
                      onClick={() => speak(ex.text)}
                      className="w-full text-left flex items-center justify-between group p-2 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div>
                        <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                          {ex.text}
                        </div>
                        <div className="text-xs text-neutral-500 font-arabic">
                          {ex.translation}
                        </div>
                      </div>
                      <Volume2
                        size={16}
                        className="text-neutral-700 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Section 8: Prepositions */}
      <section className="space-y-6">
        <div className="bg-purple-600/10 border border-purple-600/20 p-4 sm:p-6 rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            8. Prepositions (حروف الجر)
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-6">
            Words that show the relationship between things:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {PREPOSITIONS_DATA.map((prep) => (
              <button
                key={prep.text}
                onClick={() => speak(prep.text)}
                className={`p-4 rounded-xl border transition-all text-center group ${
                  playingItem === prep.text
                    ? "bg-purple-600 border-purple-400"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                }`}
              >
                <div className="text-xl font-bold text-white">{prep.text}</div>
                <div className="text-xs text-neutral-500 font-arabic mt-1">
                  {prep.translation}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white">
              Examples: "In the world"
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() =>
                  speak("Barcelona is the best football team in the world.")
                }
                className="p-5 rounded-2xl bg-black/20 border border-white/5 text-left group hover:border-purple-500/30 transition-all"
              >
                <div className="text-white group-hover:text-purple-400 transition-colors">
                  Barcelona is the best football team in the world.
                </div>
                <div className="text-sm text-neutral-500 font-arabic mt-1">
                  برشلونة هو أفضل فريق كرة قدم في العالم.
                </div>
              </button>
              <button
                onClick={() => speak("You are the best person in the world.")}
                className="p-5 rounded-2xl bg-black/20 border border-white/5 text-left group hover:border-purple-500/30 transition-all"
              >
                <div className="text-white group-hover:text-purple-400 transition-colors">
                  You are the best person in the world.
                </div>
                <div className="text-sm text-neutral-500 font-arabic mt-1">
                  أنت أفضل شخص في العالم.
                </div>
              </button>
              <button
                onClick={() => speak("You are the worst person in the world.")}
                className="p-5 rounded-2xl bg-black/20 border border-white/5 text-left group hover:border-purple-500/30 transition-all"
              >
                <div className="text-white group-hover:text-purple-400 transition-colors">
                  You are the worst person in the world.
                </div>
                <div className="text-sm text-neutral-500 font-arabic mt-1">
                  أنت أسوأ شخص في العالم.
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
