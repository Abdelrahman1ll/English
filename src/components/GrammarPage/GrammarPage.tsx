import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Book, LayoutGrid, Focus, Search, Quote } from "lucide-react";
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
  const { levelId } = useParams();
  const levelData = levelId ? LEVEL_DATA[levelId] : null;
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [toBeQuizAnswers, setToBeQuizAnswers] = useState<{ [key: number]: string }>({});
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const filteredGrammarData = useMemo(() => {
    const raw: GrammarData = levelData?.grammar || {};
    const term = searchQuery.toLowerCase();
    const filter = (arr: readonly any[] = [], fields: string[]) => arr.filter(item => fields.some(f => (item[f] || "").toLowerCase().includes(term)) || (item.arabic || item.ar || item.translation || "").toLowerCase().includes(term));

    return {
      ARTICLES_DATA: { A: filter(raw.ARTICLES_DATA?.A, ["word"]), AN: filter(raw.ARTICLES_DATA?.AN, ["word"]), UNCOUNTABLE: filter(raw.ARTICLES_DATA?.UNCOUNTABLE, ["word"]) },
      PLURAL_EXAMPLES: filter(raw.PLURAL_EXAMPLES, ["singular", "plural"]),
      PREPOSITIONS_DATA: { LIST: filter(raw.PREPOSITIONS_DATA?.LIST, ["text"]), EXPLANATION_EXAMPLES: filter(raw.PREPOSITIONS_DATA?.EXPLANATION_EXAMPLES, ["en"]) },
      PRONOUNS_QUIZ: raw.PRONOUNS_QUIZ || [],
      VERB_TO_BE_DATA: raw.VERB_TO_BE_DATA || { SINGULAR: [], PLURAL: [], QUIZ: [] },
      DEMONSTRATIVES_DATA: raw.DEMONSTRATIVES_DATA || []
    };
  }, [levelData, searchQuery]);

  const studyItems: StudyItem[] = useMemo(() => {
    const items: StudyItem[] = [];
    const { ARTICLES_DATA, PLURAL_EXAMPLES, PRONOUNS_QUIZ, VERB_TO_BE_DATA, DEMONSTRATIVES_DATA, PREPOSITIONS_DATA } = filteredGrammarData;
    
    [...ARTICLES_DATA.A, ...ARTICLES_DATA.AN, ...ARTICLES_DATA.UNCOUNTABLE].forEach(i => items.push({ primary: i.article === "none" ? i.word : `${i.article} ${i.word}`, secondary: i.arabic || i.ar || i.translation || "", category: `Article` }));
    PLURAL_EXAMPLES.forEach(i => items.push({ primary: `${i.singular} → ${i.plural}`, secondary: i.arabic, category: "Plurals" }));
    PRONOUNS_QUIZ.forEach(q => items.push({ primary: q.question, secondary: `Ans: ${q.answer}`, category: "Pronouns" }));
    [...VERB_TO_BE_DATA.SINGULAR, ...VERB_TO_BE_DATA.PLURAL].forEach(i => items.push({ primary: i.en, secondary: i.ar, category: "Verb To Be" }));
    VERB_TO_BE_DATA.QUIZ.forEach(q => items.push({ primary: q.question, secondary: `Ans: ${q.answer}`, category: "Verb To Be Quiz" }));
    DEMONSTRATIVES_DATA.forEach(g => { g.items.forEach(i => items.push({ primary: i.text, secondary: i.translation, category: "Demonstratives" })); g.examples.forEach(e => items.push({ primary: e.text, secondary: e.translation, category: "Demonstrative Ex" })); });
    PREPOSITIONS_DATA.LIST.forEach(p => items.push({ primary: p.text, secondary: p.translation, category: "Prepositions" }));
    PREPOSITIONS_DATA.EXPLANATION_EXAMPLES.forEach(e => items.push({ primary: e.en, secondary: e.ar, category: "Preposition Usage" }));
    
    return items;
  }, [filteredGrammarData]);

  const handleItemClick = (text: string) => { speak(text, () => setPlayingItem(null)); setPlayingItem(text); setPracticeWord(text); };

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4"><Book className="text-emerald-400" size={32} /> Grammar Essentials</h1>
          <p className="text-neutral-400 mt-3 text-lg leading-relaxed">Master the foundation of English grammar.</p>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-2xl border border-white/5 w-fit">
          <button onClick={() => setIsStudyMode(false)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${!isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400"}`}><LayoutGrid size={20} /> Grid View</button>
          <button onClick={() => setIsStudyMode(true)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isStudyMode ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400"}`}><Focus size={20} /> Study Mode</button>
        </div>
      </header>

      {isStudyMode ? <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} /> : (
        <>
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={24} />
            <input type="text" placeholder="Search grammar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all" />
          </div>
          <ArticleSection title="1. The Article 'A'" rule={<p>Before <strong>consonant sounds</strong>. <span className="text-white/40 italic block text-sm mt-2"><Quote size={12} className="inline mr-1" /> Means "One".</span></p>} items={filteredGrammarData.ARTICLES_DATA.A} color="emerald" activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
          <ArticleSection title="2. The Vowels (An)" rule={<p>Before <strong>vowel sounds</strong> (A, E, I, O, U).</p>} items={filteredGrammarData.ARTICLES_DATA.AN} color="amber" vowels={["A", "E", "I", "O", "U"]} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
          <ArticleSection title="3. Uncountable Nouns" rule={<p>Words that <strong>cannot</strong> be counted. No "a" or "an".</p>} items={filteredGrammarData.ARTICLES_DATA.UNCOUNTABLE} color="rose" activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
          <PluralSection items={filteredGrammarData.PLURAL_EXAMPLES} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
          <PronounsQuiz quizData={filteredGrammarData.PRONOUNS_QUIZ} quizAnswers={quizAnswers} studyItems={studyItems} onOptionClick={(idx, opt) => { speak(opt === filteredGrammarData.PRONOUNS_QUIZ[idx].answer ? "Correct!" : "Try again."); setQuizAnswers(p => ({ ...p, [idx]: opt })); }} />
          <VerbToBeSection data={filteredGrammarData.VERB_TO_BE_DATA} activeWord={activeWord} quizAnswers={toBeQuizAnswers} studyItems={studyItems} onItemClick={handleItemClick} onQuizOptionClick={(idx, opt) => { speak(opt === filteredGrammarData.VERB_TO_BE_DATA.QUIZ[idx].answer ? "Correct!" : "Try again."); setToBeQuizAnswers(p => ({ ...p, [idx]: opt })); }} />
          <DemonstrativesSection data={filteredGrammarData.DEMONSTRATIVES_DATA} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
          <PrepositionsSection data={filteredGrammarData.PREPOSITIONS_DATA} activeWord={activeWord} playingItem={playingItem} studyItems={studyItems} onItemClick={handleItemClick} />
          <GrammarInstructionCard />
        </>
      )}
    </div>
  );
}
