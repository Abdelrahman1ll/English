import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book, LayoutGrid, Focus, Search, Quote, ArrowLeft, ChevronRight } from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LEVEL_DATA } from "../../data/levels/index";
import { StudyModule, type StudyItem } from "../shared/StudyModule";
import { ArticleSection } from "./ArticleSection";
import { PluralSection } from "./PluralSection";
import { PronounsQuiz } from "./PronounsQuiz";
import { VerbToBeSection } from "./VerbToBeSection";
import { DemonstrativesSection } from "./DemonstrativesSection";
import { PrepositionsSection } from "./PrepositionsSection";
import { GrammarInstructionCard } from "./GrammarInstructionCard";
import type { GrammarData } from "../../data/levels";

export function GrammarPage() {
  const { levelId, topicId } = useParams();
  const navigate = useNavigate();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [toBeQuizAnswers, setToBeQuizAnswers] = useState<{
    [key: number]: string;
  }>({});

  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const filteredGrammarData = useMemo(() => {
    const raw: GrammarData = levelData?.grammar || {};
    const term = searchQuery.toLowerCase();
    const filter = (arr: readonly any[] = [], fields: string[]) =>
      arr.filter(
        (item) =>
          fields.some((f) => (item[f] || "").toLowerCase().includes(term)) ||
          (item.arabic || item.ar || item.translation || "")
            .toLowerCase()
            .includes(term),
      );

    return {
      ARTICLES_DATA: {
        A: filter(raw.ARTICLES_DATA?.A, ["word"]),
        AN: filter(raw.ARTICLES_DATA?.AN, ["word"]),
        UNCOUNTABLE: filter(raw.ARTICLES_DATA?.UNCOUNTABLE, ["word"]),
      },
      PLURAL_EXAMPLES: filter(raw.PLURAL_EXAMPLES, ["singular", "plural"]),
      PREPOSITIONS_DATA: {
        LIST: filter(raw.PREPOSITIONS_DATA?.LIST, ["text"]),
        EXPLANATION_EXAMPLES: filter(
          raw.PREPOSITIONS_DATA?.EXPLANATION_EXAMPLES,
          ["en"],
        ),
      },
      PRONOUNS_QUIZ: raw.PRONOUNS_QUIZ || [],
      VERB_TO_BE_DATA: raw.VERB_TO_BE_DATA || {
        SINGULAR: [],
        PLURAL: [],
        QUIZ: [],
      },
      DEMONSTRATIVES_DATA: raw.DEMONSTRATIVES_DATA || [],
    };
  }, [levelData, searchQuery]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    const {
      ARTICLES_DATA,
      PLURAL_EXAMPLES,
      PRONOUNS_QUIZ,
      VERB_TO_BE_DATA,
      DEMONSTRATIVES_DATA,
      PREPOSITIONS_DATA,
    } = filteredGrammarData;

    [
      ...ARTICLES_DATA.A,
      ...ARTICLES_DATA.AN,
      ...ARTICLES_DATA.UNCOUNTABLE,
    ].forEach((i) =>
      items.push({
        primary: i.article === "none" ? i.word : `${i.article} ${i.word}`,
        secondary: i.arabic || i.ar || i.translation || "",
        category: `Article`,
      }),
    );
    PLURAL_EXAMPLES.forEach((i) =>
      items.push({
        primary: `${i.singular} → ${i.plural}`,
        secondary: i.arabic,
        category: "Plurals",
      }),
    );
    PRONOUNS_QUIZ.forEach((q) =>
      items.push({
        primary: q.question,
        secondary: `Ans: ${q.answer}`,
        category: "Pronouns",
      }),
    );
    [...VERB_TO_BE_DATA.SINGULAR, ...VERB_TO_BE_DATA.PLURAL].forEach((i) =>
      items.push({ primary: i.en, secondary: i.ar, category: "Verb To Be" }),
    );
    VERB_TO_BE_DATA.QUIZ.forEach((q) =>
      items.push({
        primary: q.question,
        secondary: `Ans: ${q.answer}`,
        category: "Verb To Be Quiz",
      }),
    );
    DEMONSTRATIVES_DATA.forEach((g) => {
      g.items.forEach((i) =>
        items.push({
          primary: i.text,
          secondary: i.translation,
          category: "Demonstratives",
        }),
      );
      g.examples.forEach((e) =>
        items.push({
          primary: e.text,
          secondary: e.translation,
          category: "Demonstrative Ex",
        }),
      );
    });
    PREPOSITIONS_DATA.LIST.forEach((p) =>
      items.push({
        primary: p.text,
        secondary: p.translation,
        category: "Prepositions",
      }),
    );
    PREPOSITIONS_DATA.EXPLANATION_EXAMPLES.forEach((e) =>
      items.push({
        primary: e.en,
        secondary: e.ar,
        category: "Preposition Usage",
      }),
    );

    return items;
  }, [filteredGrammarData]);

  const handleItemClick = (text: string) => {
    speak(text, () => setPlayingItem(null));
    setPlayingItem(text);
    setPracticeWord(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
            <Book className="text-emerald-400" size={32} /> Grammar Essentials
          </h1>
          <p className="text-neutral-400 mt-3 text-lg leading-relaxed">
            Master the foundation of English grammar.
          </p>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
          <button
            onClick={() => setIsStudyMode(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400"}`}
          >
            <LayoutGrid size={20} /> Grid View
          </button>
          <button
            onClick={() => setIsStudyMode(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400"}`}
          >
            <Focus size={20} /> Study Mode
          </button>
        </div>
      </header>

      {isStudyMode ? (
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      ) : (
        <>
          {topicId === undefined ? (
            <>
              <div className="relative group max-w-2xl mb-10">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
                <input type="text" placeholder="Search grammar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrammarData.ARTICLES_DATA.A.length > 0 && (
                  <button onClick={() => navigate(`/${levelId}/grammar/articles`)} className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 hover:bg-[#252525] transition-all flex items-center justify-between group text-left">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Articles</h2>
                      <p className="text-neutral-500 text-sm mt-1 font-arabic" dir="rtl">أدوات النكرة والأسماء التي لا تُعد</p>
                    </div>
                    <ChevronRight className="text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                  </button>
                )}
                {filteredGrammarData.PLURAL_EXAMPLES.length > 0 && (
                  <button onClick={() => navigate(`/${levelId}/grammar/plurals`)} className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 hover:border-blue-500/30 hover:bg-[#252525] transition-all flex items-center justify-between group text-left">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Singular & Plural</h2>
                      <p className="text-neutral-500 text-sm mt-1 font-arabic" dir="rtl">المفرد والجمع</p>
                    </div>
                    <ChevronRight className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
                  </button>
                )}
                {filteredGrammarData.PRONOUNS_QUIZ.length > 0 && (
                  <button onClick={() => navigate(`/${levelId}/grammar/pronouns`)} className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 hover:bg-[#252525] transition-all flex items-center justify-between group text-left">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Pronouns Quiz</h2>
                      <p className="text-neutral-500 text-sm mt-1 font-arabic" dir="rtl">اختبار الضمائر</p>
                    </div>
                    <ChevronRight className="text-neutral-600 group-hover:text-purple-400 transition-colors" />
                  </button>
                )}
                {filteredGrammarData.VERB_TO_BE_DATA.SINGULAR.length > 0 && (
                  <button onClick={() => navigate(`/${levelId}/grammar/verb-to-be`)} className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 hover:border-orange-500/30 hover:bg-[#252525] transition-all flex items-center justify-between group text-left">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">Verb "To Be"</h2>
                      <p className="text-neutral-500 text-sm mt-1 font-arabic" dir="rtl">فعل يكون</p>
                    </div>
                    <ChevronRight className="text-neutral-600 group-hover:text-orange-400 transition-colors" />
                  </button>
                )}
                {filteredGrammarData.DEMONSTRATIVES_DATA.length > 0 && (
                  <button onClick={() => navigate(`/${levelId}/grammar/demonstratives`)} className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 hover:border-blue-400/30 hover:bg-[#252525] transition-all flex items-center justify-between group text-left">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Demonstratives</h2>
                      <p className="text-neutral-500 text-sm mt-1 font-arabic" dir="rtl">أسماء الإشارة</p>
                    </div>
                    <ChevronRight className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
                  </button>
                )}
                {filteredGrammarData.PREPOSITIONS_DATA.LIST.length > 0 && (
                  <button onClick={() => navigate(`/${levelId}/grammar/prepositions`)} className="bg-[#1e1e1e] p-6 rounded-3xl border border-white/5 hover:border-purple-400/30 hover:bg-[#252525] transition-all flex items-center justify-between group text-left">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Prepositions</h2>
                      <p className="text-neutral-500 text-sm mt-1 font-arabic" dir="rtl">حروف الجر</p>
                    </div>
                    <ChevronRight className="text-neutral-600 group-hover:text-purple-400 transition-colors" />
                  </button>
                )}
              </div>
              <GrammarInstructionCard />
            </>
          ) : (
            <div className="space-y-8">
              <button onClick={() => navigate(`/${levelId}/grammar`)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-[#1a1a1a] px-4 py-2 rounded-xl border border-white/5 w-fit">
                <ArrowLeft size={20} />
                <span className="font-bold">Back to Topics</span>
              </button>
              
              <div className="space-y-16">
                {topicId === "articles" && (
                  <>
                    <ArticleSection title="1. The Article 'A' (أداة النكرة)" rule={<div className="text-right" dir="rtl"><p>تُستخدم قبل الكلمات المفردة التي تبدأ بـ <strong>صوت ساكن (Consonant)</strong>.</p><p className="text-white/40 italic text-sm mt-2"><Quote size={12} className="inline mr-1" /> تعني "شيء واحد" (مفرد).</p></div>} items={filteredGrammarData.ARTICLES_DATA.A} color="emerald" activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
                    <ArticleSection title="2. The Article 'An' (أداة النكرة للمتحرك)" rule={<div className="text-right" dir="rtl"><p>تُستخدم قبل الكلمات المفردة التي تبدأ بـ <strong>صوت متحرك (Vowel)</strong> لتسهيل النطق.</p></div>} items={filteredGrammarData.ARTICLES_DATA.AN} color="amber" vowels={["A", "E", "I", "O", "U"]} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
                    <ArticleSection title="3. Uncountable Nouns (الأسماء التي لا تُعد)" rule={<div className="text-right" dir="rtl"><p>الكلمات التي <strong>لا يمكن عدها</strong> (مثل السوائل والمفاهيم). لا تأخذ "a" أو "an" قبلها.</p></div>} items={filteredGrammarData.ARTICLES_DATA.UNCOUNTABLE} color="rose" activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
                  </>
                )}
                {topicId === "plurals" && <PluralSection items={filteredGrammarData.PLURAL_EXAMPLES} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />}
                {topicId === "pronouns" && <PronounsQuiz quizData={filteredGrammarData.PRONOUNS_QUIZ} quizAnswers={quizAnswers} studyItems={studyItems} onOptionClick={(idx, opt) => { speak(opt === filteredGrammarData.PRONOUNS_QUIZ[idx].answer ? "Correct!" : "Try again."); setQuizAnswers(p => ({ ...p, [idx]: opt })); }} />}
                {topicId === "verb-to-be" && <VerbToBeSection data={filteredGrammarData.VERB_TO_BE_DATA} activeWord={activeWord} quizAnswers={toBeQuizAnswers} studyItems={studyItems} onItemClick={handleItemClick} onQuizOptionClick={(idx, opt) => { speak(opt === filteredGrammarData.VERB_TO_BE_DATA.QUIZ[idx].answer ? "Correct!" : "Try again."); setToBeQuizAnswers(p => ({ ...p, [idx]: opt })); }} />}
                {topicId === "demonstratives" && <DemonstrativesSection data={filteredGrammarData.DEMONSTRATIVES_DATA} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />}
                {topicId === "prepositions" && <PrepositionsSection data={filteredGrammarData.PREPOSITIONS_DATA} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
