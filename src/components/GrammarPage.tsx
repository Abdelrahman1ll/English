import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Book, Volume2, AlertCircle, Quote, Search } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";
import { LEVEL_DATA } from "../data/levels/index";

type GrammarItem = {
  word: string;
  arabic: string;
  image?: string;
  article: "a" | "an" | "none";
};

type QuizQuestion = {
  question: string;
  answer: string;
  options: string[];
};

type PluralExample = {
  singular: string;
  plural: string;
  arabic: string;
};

type DemonstrativeGroup = {
  title: string;
  items: Array<{
    text: string;
    translation: string;
    rule: string;
  }>;
  examples: Array<{
    text: string;
    translation: string;
  }>;
};

type PrepositionItem = {
  text: string;
  translation: string;
};

type PrepositionExample = {
  en: string;
  ar: string;
};

export function GrammarPage() {
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");

  const rawGrammarData = levelData?.grammar || {};

  const filteredGrammarData = useMemo(() => {
    const term = searchQuery.toLowerCase();

    const filterArray = (items: any[], fields: string[]) =>
      items.filter(
        (item) =>
          fields.some((field) =>
            (item[field] || "").toLowerCase().includes(term),
          ) ||
          (item.arabic || item.ar || item.translation || "").includes(
            searchQuery,
          ),
      );

    return {
      ARTICLES_DATA: {
        A: filterArray(rawGrammarData.ARTICLES_DATA?.A || [], ["word"]),
        AN: filterArray(rawGrammarData.ARTICLES_DATA?.AN || [], ["word"]),
        UNCOUNTABLE: filterArray(
          rawGrammarData.ARTICLES_DATA?.UNCOUNTABLE || [],
          ["word"],
        ),
      },
      PLURAL_EXAMPLES: filterArray(rawGrammarData.PLURAL_EXAMPLES || [], [
        "singular",
        "plural",
      ]),
      PREPOSITIONS_DATA: {
        LIST: filterArray(rawGrammarData.PREPOSITIONS_DATA?.LIST || [], [
          "text",
        ]),
        EXPLANATION_EXAMPLES: filterArray(
          rawGrammarData.PREPOSITIONS_DATA?.EXPLANATION_EXAMPLES || [],
          ["en"],
        ),
      },
      // Keep other data as is as they are less suitable for simple keyword search in this context
      PRONOUNS_QUIZ: rawGrammarData.PRONOUNS_QUIZ || [],
      VERB_TO_BE_DATA: rawGrammarData.VERB_TO_BE_DATA || {
        SINGULAR: [],
        PLURAL: [],
        QUIZ: [],
      },
      DEMONSTRATIVES_DATA: rawGrammarData.DEMONSTRATIVES_DATA || [],
    };
  }, [rawGrammarData, searchQuery]);

  const {
    ARTICLES_DATA,
    PLURAL_EXAMPLES,
    PRONOUNS_QUIZ,
    VERB_TO_BE_DATA,
    DEMONSTRATIVES_DATA,
    PREPOSITIONS_DATA,
  } = filteredGrammarData;

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [toBeQuizAnswers, setToBeQuizAnswers] = useState<{
    [key: number]: string;
  }>({});
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleItemClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  const handleQuizOptionClick = (questionIndex: number, option: string) => {
    if (option === PRONOUNS_QUIZ[questionIndex].answer) {
      speak("Correct!");
    } else {
      speak("Try again.");
    }
    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleToBeQuizOptionClick = (questionIndex: number, option: string) => {
    if (option === VERB_TO_BE_DATA.QUIZ[questionIndex].answer) {
      speak("Correct!");
    } else {
      speak("Try again.");
    }
    setToBeQuizAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const renderCard = (
    item: GrammarItem,
    color: "emerald" | "amber" | "rose",
  ) => {
    const displayText =
      item.article === "none" ? item.word : `${item.article} ${item.word}`;

    const colorConfigs = {
      emerald: {
        active: "bg-emerald-500/10 border-emerald-500/50 shadow-emerald-500/5",
        icon: "text-emerald-400",
      },
      amber: {
        active: "bg-amber-500/10 border-amber-500/50 shadow-amber-500/5",
        icon: "text-amber-400",
      },
      rose: {
        active: "bg-rose-500/10 border-rose-500/50 shadow-rose-500/5",
        icon: "text-rose-400",
      },
    };

    const config = colorConfigs[color];

    return (
      <button
        key={item.word}
        onClick={() => handleItemClick(displayText)}
        className={`p-6 rounded-3xl border transition-all text-left group relative overflow-hidden ${
          activeWord === displayText
            ? `${config.active} shadow-2xl scale-[1.02] z-10`
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] shadow-lg"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-2xl font-black ${activeWord === displayText ? (color === "emerald" ? "text-emerald-400" : color === "amber" ? "text-amber-400" : "text-rose-400") : config.icon}`}
          >
            {item.article !== "none" && (
              <span
                className={`mr-2 transition-colors ${activeWord === displayText ? "text-white/60" : "text-white/40"}`}
              >
                {item.article}
              </span>
            )}
            {item.word}
          </span>
          <Volume2
            size={20}
            className={`transition-all ${playingItem === displayText ? (color === "emerald" ? "text-emerald-400" : color === "amber" ? "text-amber-400" : "text-rose-400") : activeWord === displayText ? "opacity-100" : "opacity-0 group-hover:opacity-100 text-neutral-600"}`}
          />
        </div>
        <div
          className={`text-lg font-arabic ${activeWord === displayText ? "text-white/80" : "text-neutral-500"}`}
        >
          {item.arabic}
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <Book className="text-emerald-400" size={32} /> Grammar Essentials
        </h1>
        <p className="text-neutral-400 mt-3 text-lg leading-relaxed">
          Master the foundation of English: Singular, Plural, and Articles.
        </p>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2rem blur-xl opacity-10 group-focus-within:opacity-30 transition-opacity" />
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Search grammar rules, words or examples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all font-arabic shadow-2xl"
          />
        </div>
      </div>

      {/* Section 1: The Rule (A) */}
      <section className="space-y-8">
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              1. The Article "A"
            </h2>
          </div>
          <p className="text-neutral-300 text-xl leading-relaxed mb-8">
            We use{" "}
            <span className="text-emerald-400 font-black text-2xl px-2 bg-emerald-500/10 rounded-lg">
              A
            </span>{" "}
            before nouns that begin with a **consonant sound**.
            <br />
            <span className="text-white/40 italic text-base mt-3 flex items-center gap-2">
              <Quote size={14} className="rotate-180" /> "A" basically means
              "One". (A car = One car)
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES_DATA.A.map((item: GrammarItem) =>
              renderCard(item, "emerald"),
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Vowels (An) */}
      <section className="space-y-8">
        <div className="bg-amber-500/5 border border-amber-500/10 p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              2. The Vowels (An)
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {["A", "E", "I", "O", "U"].map((vowel) => (
              <span
                key={vowel}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-amber-500 text-black font-black text-2xl shadow-lg shadow-amber-500/20"
              >
                {vowel}
              </span>
            ))}
          </div>
          <p className="text-neutral-300 text-xl leading-relaxed mb-8">
            If a word starts with a **Vowel** (A, E, I, O, U), we use{" "}
            <span className="text-amber-400 font-black text-2xl px-2 bg-amber-500/10 rounded-lg">
              An
            </span>{" "}
            instead of "A".
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARTICLES_DATA.AN.map((item: GrammarItem) =>
              renderCard(item, "amber"),
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Uncountable */}
      <section className="space-y-8">
        <div className="bg-rose-500/5 border border-rose-500/10 p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              3. Uncountable Nouns
            </h2>
          </div>
          <p className="text-neutral-300 text-xl leading-relaxed mb-8">
            Some words **cannot** be counted. We do{" "}
            <span className="text-rose-400 font-bold px-1 underline decoration-2 underline-offset-4">
              NOT
            </span>{" "}
            use "a" or "an" with them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ARTICLES_DATA.UNCOUNTABLE.map((item: GrammarItem) =>
              renderCard(item, "rose"),
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Singular vs Plural */}
      <section className="space-y-8">
        <div className="bg-blue-500/5 border border-blue-500/10 p-5 sm:p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              4. Singular & Plural
            </h2>
          </div>
          <p className="text-neutral-300 text-xl leading-relaxed mb-8">
            To make most words plural (more than one), we usually add{" "}
            <span className="text-blue-400 font-black text-2xl px-2 bg-blue-500/10 rounded-lg">
              S
            </span>{" "}
            at the end.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {PLURAL_EXAMPLES.map((item: PluralExample) => (
              <button
                key={item.singular}
                onClick={() =>
                  handleItemClick(`${item.singular}... ${item.plural}`)
                }
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-3xl transition-all border group relative overflow-hidden ${
                  activeWord === `${item.singular}... ${item.plural}`
                    ? "bg-blue-500/10 border-blue-500/50 shadow-xl scale-[1.01] z-10"
                    : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525]"
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div
                    className={`text-xl sm:text-2xl font-bold transition-colors ${activeWord === `${item.singular}... ${item.plural}` ? "text-white/60" : "text-neutral-600"}`}
                  >
                    {item.singular}
                  </div>
                  <div
                    className={`transition-colors ${activeWord === `${item.singular}... ${item.plural}` ? "text-white/40" : "text-neutral-800"}`}
                  >
                    →
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-black transition-colors ${activeWord === `${item.singular}... ${item.plural}` ? "text-white" : "text-blue-400"}`}
                  >
                    {item.plural}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
                  <div
                    className={`text-lg sm:text-xl font-arabic transition-colors ${activeWord === `${item.singular}... ${item.plural}` ? "text-white/80" : "text-neutral-500"}`}
                  >
                    {item.arabic}
                  </div>
                  <Volume2
                    size={16}
                    className={`transition-all ${playingItem === `${item.singular}... ${item.plural}` ? "text-white opacity-100 scale-125" : activeWord === `${item.singular}... ${item.plural}` ? "text-white/60 opacity-100" : "opacity-0 group-hover:opacity-40 text-neutral-400"}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pronouns Quiz */}
      <section className="space-y-8">
        <div className="bg-purple-500/5 border border-purple-500/10 p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              5. Subject Pronouns Quiz
            </h2>
          </div>
          <p className="text-neutral-300 text-lg mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
            Choose the correct pronoun:{" "}
            <span className="font-black text-purple-400 px-2">
              He, She, It, They, We
            </span>
          </p>
          <div className="space-y-4">
            {PRONOUNS_QUIZ.map((q: QuizQuestion, idx: number) => {
              const isAnswered = quizAnswers[idx] !== undefined;
              const isCorrect = quizAnswers[idx] === q.answer;

              return (
                <div
                  key={idx}
                  className="bg-[#1e1e1e] p-6 rounded-4xl border border-white/5 shadow-md"
                >
                  <p className="text-xl text-white font-bold mb-6 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-sm text-neutral-500">
                      {idx + 1}
                    </span>
                    {q.question}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuizOptionClick(idx, option)}
                        disabled={isAnswered && isCorrect}
                        className={`px-6 py-3 rounded-2xl font-black transition-all border-2 ${
                          quizAnswers[idx] === option
                            ? option === q.answer
                              ? "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-500/20 scale-105"
                              : "bg-rose-600 border-transparent text-white animate-shake"
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

      {/* Section 6: Verb To Be */}
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
            <div className="bg-black/20 p-5 sm:p-6 rounded-3xl border border-white/5">
              <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-4 px-1">
                Singular (واحد)
              </h4>
              <div className="space-y-3">
                {VERB_TO_BE_DATA.SINGULAR.map(
                  (item: { en: string; ar: string }) => (
                    <button
                      key={item.en}
                      onClick={() => handleItemClick(item.en)}
                      className={`w-full text-left p-3 rounded-2xl transition-all border flex items-center justify-between group ${
                        playingItem === item.en
                          ? "bg-orange-500/10 border-orange-500/50 shadow-lg"
                          : "bg-white/2 border-transparent hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`text-xl font-bold transition-colors ${activeWord === item.en ? "text-orange-400" : "text-white"}`}
                      >
                        {item.en}
                      </span>
                      <span
                        className={`text-sm font-arabic transition-colors ${activeWord === item.en ? "text-white/70" : "text-neutral-500"}`}
                      >
                        {item.ar}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="bg-black/20 p-5 sm:p-6 rounded-3xl border border-white/5">
              <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-4 px-1">
                Plural (جمع)
              </h4>
              <div className="space-y-3">
                {VERB_TO_BE_DATA.PLURAL.map(
                  (item: { en: string; ar: string }) => (
                    <button
                      key={item.en}
                      onClick={() => handleItemClick(item.en)}
                      className={`w-full text-left p-3 rounded-2xl transition-all border flex items-center justify-between group ${
                        playingItem === item.en
                          ? "bg-orange-500/10 border-orange-500/50 shadow-lg"
                          : "bg-white/2 border-transparent hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`text-xl font-bold transition-colors ${activeWord === item.en ? "text-orange-400" : "text-white"}`}
                      >
                        {item.en}
                      </span>
                      <span
                        className={`text-sm font-arabic transition-colors ${activeWord === item.en ? "text-white/70" : "text-neutral-500"}`}
                      >
                        {item.ar}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-2">
            <Quote size={18} className="text-orange-500" /> Quiz: Am, Is, or
            Are?
          </h3>
          <div className="space-y-4">
            {VERB_TO_BE_DATA.QUIZ.map((q: QuizQuestion, idx: number) => {
              const isAnswered = toBeQuizAnswers[idx] !== undefined;
              const isCorrect = toBeQuizAnswers[idx] === q.answer;

              return (
                <div
                  key={idx}
                  className="bg-[#1e1e1e] p-6 rounded-4xl border border-white/5 shadow-md"
                >
                  <p className="text-xl text-white font-bold mb-6 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-sm text-neutral-500">
                      {idx + 1}
                    </span>
                    {q.question}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleToBeQuizOptionClick(idx, option)}
                        disabled={isAnswered && isCorrect}
                        className={`px-6 py-3 rounded-2xl font-black transition-all border-2 ${
                          toBeQuizAnswers[idx] === option
                            ? option === q.answer
                              ? "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-500/20 scale-105"
                              : "bg-rose-600 border-transparent text-white animate-shake"
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

      {/* Section 7: Demonstratives */}
      <section className="space-y-8">
        <div className="bg-blue-600/5 border border-blue-600/10 p-5 sm:p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex flex-wrap gap-x-2 items-center">
              <span>7. Demonstratives</span>
              <span className="text-white/40 font-arabic text-lg sm:text-xl">
                (الإشارة)
              </span>
            </h2>
          </div>
          <p className="text-neutral-300 text-lg mb-10">
            We use these words to point things out based on distance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {DEMONSTRATIVES_DATA.map((group: DemonstrativeGroup) => (
              <div key={group.title} className="space-y-8">
                <h3 className="text-[10px] sm:text-xs font-black text-blue-400/50 uppercase tracking-[0.15em] sm:tracking-[0.3em] px-2 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{" "}
                  {group.title}
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {group.items.map((item) => (
                    <button
                      key={item.text}
                      onClick={() =>
                        handleItemClick(
                          `${item.text}... means ${item.translation}`,
                        )
                      }
                      className={`p-6 sm:p-8 rounded-3xl sm:rounded-4xl border transition-all text-center group flex flex-col items-center justify-center relative overflow-hidden ${
                        activeWord ===
                        `${item.text}... means ${item.translation}`
                          ? "bg-blue-500/10 border-blue-500/50 shadow-2xl scale-105 z-10"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:scale-[1.02]"
                      }`}
                    >
                      <span
                        className={`text-2xl sm:text-3xl font-black ${activeWord === `${item.text}... means ${item.translation}` ? "text-blue-400" : "text-white group-hover:text-blue-400"}`}
                      >
                        {item.text}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-arabic mt-2 ${activeWord === `${item.text}... means ${item.translation}` ? "text-white/70" : "text-neutral-500"}`}
                      >
                        {item.translation}
                      </span>
                      <div className="flex gap-2 mt-4">
                        <span
                          className={`text-[9px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-black uppercase tracking-tighter ${activeWord === `${item.text}... means ${item.translation}` ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400"}`}
                        >
                          {item.rule}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-black/20 rounded-4xl p-6 space-y-4 border border-white/5">
                  {group.examples.map((ex) => (
                    <button
                      key={ex.text}
                      onClick={() => handleItemClick(ex.text)}
                      className={`w-full text-left flex items-center justify-between group p-4 rounded-2xl transition-all border ${
                        activeWord === ex.text
                          ? "bg-blue-500/10 border-blue-500/50 shadow-lg"
                          : "hover:bg-white/5 border-transparent"
                      }`}
                    >
                      <div>
                        <div
                          className={`text-lg font-bold group-hover:text-blue-400 transition-colors ${activeWord === ex.text ? "text-blue-400" : "text-white"}`}
                        >
                          {ex.text}
                        </div>
                        <div
                          className={`text-sm font-arabic mt-1 ${activeWord === ex.text ? "text-white/70" : "text-neutral-500"}`}
                        >
                          {ex.translation}
                        </div>
                      </div>
                      <Volume2
                        size={18}
                        className={`transition-all ${playingItem === ex.text ? "text-white opacity-100 scale-125" : activeWord === ex.text ? "text-white/60 opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`}
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
      <section className="space-y-8">
        <div className="bg-purple-600/5 border border-purple-600/10 p-5 sm:p-8 rounded-4xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              8. Prepositions (حروف الجر)
            </h2>
          </div>
          <p className="text-neutral-300 text-lg mb-10 leading-relaxed">
            Words that show the relationship between things in space or time:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {PREPOSITIONS_DATA.LIST.map((prep: PrepositionItem) => (
              <button
                key={prep.text}
                onClick={() => handleItemClick(prep.text)}
                className={`p-4 sm:p-6 rounded-2xl border transition-all text-center group relative overflow-hidden ${
                  activeWord === prep.text
                    ? "bg-purple-500/10 border-purple-500/50 shadow-2xl scale-110 z-10"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:scale-105 hover:border-white/10 shadow-lg"
                }`}
              >
                <div
                  className={`text-xl sm:text-2xl font-black transition-colors ${activeWord === prep.text ? "text-purple-400" : "text-white group-hover:text-purple-400"}`}
                >
                  {prep.text}
                </div>
                <div
                  className={`text-xs sm:text-sm font-arabic mt-2 ${activeWord === prep.text ? "text-white/70" : "text-neutral-500"}`}
                >
                  {prep.translation}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-3">
              <Quote size={20} className="text-purple-500" /> Usage: "In the
              world"
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREPOSITIONS_DATA.EXPLANATION_EXAMPLES.map(
                (ex: PrepositionExample) => (
                  <button
                    key={ex.en}
                    onClick={() => handleItemClick(ex.en)}
                    className={`p-5 sm:p-6 rounded-3xl transition-all border text-left group relative overflow-hidden ${
                      activeWord === ex.en
                        ? "bg-purple-500/10 border-purple-500/50 shadow-2xl scale-[1.02] z-10"
                        : "bg-black/20 border-white/5 hover:bg-black/30 hover:border-purple-500/30 shadow-lg"
                    }`}
                  >
                    <div
                      className={`text-lg sm:text-xl font-bold leading-relaxed ${activeWord === ex.en ? "text-purple-400" : "text-white group-hover:text-purple-400"}`}
                    >
                      {ex.en}
                    </div>
                    <div
                      className={`text-base sm:text-lg font-arabic mt-3 ${activeWord === ex.en ? "text-white/70" : "text-neutral-500 group-hover:text-neutral-400"}`}
                    >
                      {ex.ar}
                    </div>
                    <Volume2
                      size={18}
                      className={`absolute top-4 right-4 transition-all ${playingItem === ex.en ? "text-white opacity-100 scale-125" : activeWord === ex.en ? "text-white/60 opacity-100" : "text-neutral-800 opacity-0 group-hover:opacity-100"}`}
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 sm:p-12 rounded-4xl sm:rounded-[4rem] border border-white/5 shadow-2xl text-center space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-500 via-blue-500 to-rose-500 opacity-40" />
        <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-500">
          <Book className="text-blue-400" size={32} />
        </div>
        <h3 className="font-black text-white uppercase tracking-[0.4em] text-sm opacity-50">
          Grammar Immersion
        </h3>
        <p className="text-neutral-300 max-w-2xl mx-auto text-2xl leading-relaxed font-light">
          English rules are sets of patterns. Click on any pattern, sentence, or
          word to trigger the **Global Practice Suite**. <br /> Mastery comes
          through repetitive interaction.
        </p>
      </div>
    </div>
  );
}
