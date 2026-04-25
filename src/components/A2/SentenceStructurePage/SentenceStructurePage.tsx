import { useState, useMemo } from "react";
import { BookOpen, CheckCircle2, MessageCircle, Sparkles, HelpCircle, AlertCircle, Volume2, LayoutGrid, Focus } from "lucide-react";
import { SENTENCE_STRUCTURE_DATA } from "../../../data/levels/A2/sentenceStructure";
import { useSpeech } from "../../../hooks/useSpeech";
import { StudyModule, type StudyItem } from "../../shared/StudyModule";

export function SentenceStructurePage() {
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("I");
  const [selectedVerb, setSelectedVerb] = useState("like");
  const [selectedObject, setSelectedObject] = useState("English");
  const [activeExampleIdx, setActiveExampleIdx] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizAttempts, setQuizAttempts] = useState<{ [key: number]: number }>({});
  const { speak } = useSpeech();

  const studyItems = useMemo(() => {
    const items: StudyItem[] = [];
    
    // Add Examples
    SENTENCE_STRUCTURE_DATA.EXAMPLES.forEach(ex => {
      items.push({
        primary: ex.en,
        secondary: ex.ar,
        category: "Sentence Example"
      });
    });

    // Add Quiz sentences as study items too
    SENTENCE_STRUCTURE_DATA.QUIZ.forEach(q => {
      items.push({
        primary: q.answer,
        secondary: q.explanation,
        category: "Quiz Sentence"
      });
    });

    return items;
  }, []);

  const handleOptionClick = (qIdx: number, option: string) => {
    const isCorrect = option === SENTENCE_STRUCTURE_DATA.QUIZ[qIdx].answer;
    const currentAttempts = quizAttempts[qIdx] || 0;
    
    setQuizAttempts(prev => ({ ...prev, [qIdx]: currentAttempts + 1 }));
    setQuizAnswers(prev => ({ ...prev, [qIdx]: option }));
    
    speak(isCorrect ? (currentAttempts > 0 ? "Correct on second try!" : "Correct!") : "Try again.");
  };

  if (isStudyMode) {
    return (
      <div className="max-w-5xl mx-auto pb-20">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Focus className="text-blue-400" size={28} /> Focus Mode
          </h1>
          <button 
            onClick={() => setIsStudyMode(false)}
            className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold transition-all border border-white/5"
          >
            Back to Lesson
          </button>
        </header>
        <StudyModule items={studyItems} onExit={() => setIsStudyMode(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-700 pb-20">
      {/* Premium Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 p-12 rounded-[3rem] shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                <BookOpen size={28} />
              </div>
              <span className="text-blue-100 font-black uppercase tracking-[0.2em] text-sm">Grammar Masterclass</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
              تكوين الجملة <br />
              <span className="text-blue-200">Sentence Structure</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 w-fit h-fit self-start md:self-center">
            <button
              onClick={() => setIsStudyMode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${!isStudyMode ? "bg-white text-blue-600 shadow-xl" : "text-white/60 hover:text-white"}`}
            >
              <LayoutGrid size={16} /> Lesson
            </button>
            <button
              onClick={() => setIsStudyMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isStudyMode ? "bg-white text-blue-600 shadow-xl" : "text-white/60 hover:text-white"}`}
            >
              <Focus size={16} /> Study Mode
            </button>
          </div>
        </div>
        <p className="text-blue-50/80 text-xl max-w-2xl font-medium leading-relaxed mt-4">
          تعلم كيف تبني جملة صحيحة من الصفر من خلال فهم الترتيب المنطقي للكلمات.
        </p>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
      </header>

      {/* Explanation Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
              <Sparkles size={24} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">كيف تعمل الجملة؟</h2>
          </div>

          <div className="space-y-6">
            {SENTENCE_STRUCTURE_DATA.EXPLANATION[0].steps.map((step, idx) => (
              <div 
                key={idx}
                className="group bg-[#1a1a1a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 font-black text-xl group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">{step.label}</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#1a1a1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden h-full flex flex-col gap-8">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-blue-500 font-black uppercase tracking-widest text-xs">Sentence Lab</h3>
                <div className="px-3 py-1 bg-blue-500/10 rounded-full text-[10px] text-blue-400 font-bold">Interactive</div>
              </div>
              
              <div className="space-y-6">
                {/* Subject Slot */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">1. Choose Subject (الفاعل)</label>
                  <div className="flex flex-wrap gap-2">
                    {["I", "Ahmed", "The cat", "They"].map(s => (
                      <button 
                        key={s}
                        onClick={() => setSelectedSubject(s)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedSubject === s ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20" : "bg-neutral-900 border-white/5 text-neutral-500 hover:text-neutral-300"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verb Slot */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">2. Choose Verb (الفعل)</label>
                  <div className="flex flex-wrap gap-2">
                    {["eats", "plays", "sees", "likes"].map(v => (
                      <button 
                        key={v}
                        onClick={() => setSelectedVerb(v)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedVerb === v ? "bg-green-600 border-green-400 text-white shadow-lg shadow-green-600/20" : "bg-neutral-900 border-white/5 text-neutral-500 hover:text-neutral-300"}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Object Slot */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">3. Choose Object (المفعول)</label>
                  <div className="flex flex-wrap gap-2">
                    {["football", "a fish", "the park", "pizza"].map(o => (
                      <button 
                        key={o}
                        onClick={() => setSelectedObject(o)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedObject === o ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/20" : "bg-neutral-900 border-white/5 text-neutral-500 hover:text-neutral-300"}`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Result */}
            <div className="relative z-10 mt-auto">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Your Sentence</span>
                  <button 
                    onClick={() => speak(`${selectedSubject} ${selectedVerb} ${selectedObject}`)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <div className="text-3xl font-black text-white tracking-tight leading-none break-words">
                  <span className="text-blue-200">{selectedSubject}</span>{" "}
                  <span className="text-green-300">{selectedVerb}</span>{" "}
                  <span className="text-purple-300">{selectedObject}</span>.
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">أمثلة تطبيقية (Practical Examples)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SENTENCE_STRUCTURE_DATA.EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => {
                speak(ex.en);
                setActiveExampleIdx(idx);
              }}
              className={`group bg-[#1a1a1a] p-8 rounded-[2rem] border transition-all flex flex-col gap-4 text-left relative overflow-hidden ${activeExampleIdx === idx ? "border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02] z-10" : "border-white/5 hover:border-emerald-500/30"}`}
            >
              <div className="flex justify-between items-start">
                <div className={`text-2xl font-black transition-colors tracking-tight ${activeExampleIdx === idx ? "text-emerald-400" : "text-white group-hover:text-emerald-400"}`}>
                  {ex.en}
                </div>
                <MessageCircle className={`transition-all ${activeExampleIdx === idx ? "text-emerald-500 scale-125" : "text-neutral-600 group-hover:text-emerald-500"}`} size={20} />
              </div>
              <div className={`font-arabic text-lg transition-colors ${activeExampleIdx === idx ? "text-white" : "text-neutral-500"}`} dir="rtl">{ex.ar}</div>
              <div className={`flex gap-2 mt-4 transition-all duration-500 ${activeExampleIdx === idx ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"}`}>
                <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-xl border border-blue-500/20 shadow-sm">Subject: {ex.subject}</span>
                <span className="text-[10px] font-black bg-green-500/10 text-green-400 px-3 py-1.5 rounded-xl border border-green-500/20 shadow-sm">Verb: {ex.verb}</span>
                <span className="text-[10px] font-black bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-xl border border-purple-500/20 shadow-sm">Object: {ex.object}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-[#1a1a1a] p-12 rounded-[3.5rem] border border-white/5 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 bg-purple-500/10 rounded-2xl text-purple-400 mb-2">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl font-black text-white">اختبر نفسك! (The Quiz)</h2>
          <p className="text-neutral-400 max-w-lg mx-auto">تأكد من فهمك لقواعد ترتيب الجملة من خلال الإجابة على هذه الأسئلة.</p>
        </div>

        <div className="space-y-12">
          {SENTENCE_STRUCTURE_DATA.QUIZ.map((q, qIdx) => (
            <div key={qIdx} className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-purple-400 font-black text-2xl tabular-nums">{String(qIdx + 1).padStart(2, '0')}.</span>
                <h3 className="text-xl font-bold text-neutral-200">{q.question}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {q.options.map((option) => {
                  const isSelected = quizAnswers[qIdx] === option;
                  const isCorrect = option === q.answer;
                  const hasFoundCorrect = quizAnswers[qIdx] === q.answer;

                  let buttonStyles = "bg-neutral-900 border-white/5 hover:bg-neutral-800 text-neutral-400";
                  if (isSelected) {
                    buttonStyles = isCorrect 
                      ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20" 
                      : "bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20";
                  }

                  return (
                    <button
                      key={option}
                      disabled={hasFoundCorrect}
                      onClick={() => handleOptionClick(qIdx, option)}
                      className={`p-5 rounded-2xl border font-bold transition-all ${buttonStyles} ${hasFoundCorrect && !isSelected && isCorrect ? "border-emerald-500/50 text-emerald-400" : ""}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {quizAnswers[qIdx] && (
                <div className={`p-6 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-4 duration-500 ${quizAnswers[qIdx] === q.answer ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"}`}>
                  <div className={`p-2 rounded-lg ${quizAnswers[qIdx] === q.answer ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                    {quizAnswers[qIdx] === q.answer ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className={`font-black ${quizAnswers[qIdx] === q.answer ? "text-emerald-400" : "text-rose-400"}`}>
                        {quizAnswers[qIdx] === q.answer ? "إجابة صحيحة!" : "إجابة خاطئة!"}
                      </p>
                      {quizAnswers[qIdx] === q.answer && quizAttempts[qIdx] > 1 && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-500 text-[10px] font-black rounded-md border border-amber-500/20">
                          المحاولة الثانية ✨
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {quizAnswers[qIdx] === q.answer ? q.explanation : "حاول مرة أخرى لاكتشاف الإجابة الصحيحة!"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
