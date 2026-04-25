import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Brain, HelpCircle, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { usePractice } from "../../../context/PracticeContext";
import { useSpeech } from "../../../hooks/useSpeech";
import { LEVEL_DATA } from "../../../data/levels/index";
import { PronunciationSoundCard } from "./PronunciationSoundCard";
import { PRONUNCIATION_DATA, PRONUNCIATION_IMPORTANCE, PRONUNCIATION_QUIZ } from "../../../data/levels/A2/pronunciation";

export function PronunciationPage() {
  const { levelId } = useParams();
  const levelData = levelId ? (LEVEL_DATA as any)[levelId] : null;
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizAttempts, setQuizAttempts] = useState<{ [key: number]: number }>({});
  
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const pronunciationData = useMemo(() => (levelData?.vocabulary?.PRONUNCIATION_DATA as any[]) || PRONUNCIATION_DATA, [levelData]);

  const voicelessItems = useMemo(() => pronunciationData.filter(i => i.type === "voiceless"), [pronunciationData]);
  const voicedItems = useMemo(() => pronunciationData.filter(i => i.type === "voiced"), [pronunciationData]);

  const handleWordClick = (word: string) => { speak(word, () => setPlayingItem(null)); setPlayingItem(word); setPracticeWord(word); };

  const handleQuizOptionClick = (qIdx: number, option: string) => {
    const isCorrect = option === PRONUNCIATION_QUIZ[qIdx].answer;
    const currentAttempts = quizAttempts[qIdx] || 0;
    
    setQuizAttempts(prev => ({ ...prev, [qIdx]: currentAttempts + 1 }));
    setQuizAnswers(prev => ({ ...prev, [qIdx]: option }));
    
    speak(isCorrect ? (currentAttempts > 0 ? "Correct on second try!" : "Correct!") : "Try again.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
          <Brain className="text-purple-400" size={32} /> Pronunciation Tips 
          <span className="text-purple-400/50 font-arabic text-2xl">(قواعد النطق)</span>
        </h1>
        <p className="text-neutral-400 mt-4 text-lg max-w-3xl leading-relaxed">
          فهم الفرق بين الأصوات المهموسة والمجهورة هو المفتاح لنطق اللغة الإنجليزية بطلاقة ووضوح.
        </p>
      </header>

      {/* Importance Section */}
      <section className="bg-purple-500/5 border border-purple-500/20 p-10 rounded-[2.5rem] space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
            <Brain size={28} />
          </div>
          <h2 className="text-2xl font-black text-white">{PRONUNCIATION_IMPORTANCE.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRONUNCIATION_IMPORTANCE.points.map((point, idx) => (
            <div key={idx} className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all">
              <h3 className="text-purple-400 font-bold uppercase tracking-widest text-xs">{point.en}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed font-arabic" dir="rtl">{point.ar}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Section title="Voiceless Consonants (مهموسة)" desc="الأحبال الصوتية لا تهتز عند نطقها (ضع يدك على حنجرتك لتتأكد)." borderColor="border-rose-500">
          {voicelessItems.map(item => <PronunciationSoundCard key={item.sound} item={item} activeWord={activeWord} playingItem={playingItem} onClick={handleWordClick} />)}
        </Section>

        <Section title="Voiced Consonants (مجهورة)" desc="الأحبال الصوتية تهتز عند نطقها (ستشعر بذبذبات في حنجرتك)." borderColor="border-emerald-500">
          {voicedItems.map(item => <PronunciationSoundCard key={item.sound} item={item} activeWord={activeWord} playingItem={playingItem} onClick={handleWordClick} />)}
        </Section>
      </div>

      {/* Interactive Exam Section */}
      <section className="space-y-10 pt-10 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-[1.5rem] text-emerald-400 shadow-inner">
              <HelpCircle size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Interactive Exam</h2>
              <p className="text-neutral-500 font-arabic text-sm mt-1" dir="rtl">اختبر قدرتك على تحديد الصوت الصحيح للحروف (من كتاب Exercises).</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
            <Sparkles className="text-amber-400" size={16} />
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Active Lesson</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRONUNCIATION_QUIZ.map((q, qIdx) => (
            <div key={qIdx} className="bg-[#1a1a1a] p-8 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-emerald-500/20 transition-all group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">Question {qIdx + 1}</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                How do you pronounce <span className="text-emerald-400 underline underline-offset-8 decoration-emerald-500/30">"{q.underlined}"</span> in <span className="text-emerald-400">"{q.word}"</span>?
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
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
                      onClick={() => handleQuizOptionClick(qIdx, option)}
                      className={`p-4 rounded-xl border font-bold transition-all ${buttonStyles} ${hasFoundCorrect && !isSelected && isCorrect ? "border-emerald-500/50 text-emerald-400" : ""}`}
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
                      {quizAnswers[qIdx] === q.answer ? q.explanation : "حاول مرة أخرى لاكتشاف الصوت الصحيح!"}
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

function Section({ title, desc, borderColor, children }: any) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-white flex items-center gap-3 border-l-4 ${borderColor} pl-4 uppercase tracking-wider`}>{title}</h2>
      <p className="text-neutral-500 text-sm">{desc}</p>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
}
