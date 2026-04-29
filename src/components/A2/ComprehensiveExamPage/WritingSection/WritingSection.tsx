import React, { useState, useEffect, useRef } from "react";
import { PenTool, CheckCircle2, AlertCircle, Info, Sparkles, Loader2, XCircle } from "lucide-react";
import { validateWriting } from "./utils";

interface WritingSectionProps {
  onScoreChange: (score: number, feedback: string[], value: string, errorCount: number) => void;
  initialValue?: string;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  onScoreChange,
  initialValue = "",
}) => {
  const [text, setText] = useState(initialValue);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [grammarErrors, setGrammarErrors] = useState<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAiCheck = async () => {
    if (!text.trim()) return;
    
    setIsChecking(true);
    setGrammarErrors([]);
    
    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: "en-US",
        }),
      });

      const data = await response.json();
      if (data.matches) {
        setGrammarErrors(data.matches);
        // Trigger validation again with errors
        updateValidation(text, data.matches.length);
      }
    } catch (error) {
      console.error("Grammar check failed:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const updateValidation = (input: string, errorCount?: number) => {
    const errs = errorCount ?? grammarErrors.length;
    const { score: finalScore, feedback: currentFeedback } = validateWriting(input, errs);
    setScore(finalScore);
    setFeedback(currentFeedback);
    onScoreChange(finalScore, currentFeedback, input, errs);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateValidation(text);
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(250, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white dark:bg-black/40 rounded-3xl p-5 md:p-8 border-2 border-violet-100 dark:border-violet-500/20 shadow-xl shadow-violet-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <PenTool className="w-12 h-12 text-violet-500/10 -rotate-12" />
        </div>
        
        <h3 className="text-xl font-black text-violet-600 dark:text-violet-400 mb-2 flex items-center gap-2">
          3- WRITE :
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-bold mb-6">
          Write at least 5 sentences about your family and hobbies.
        </p>

        <div className="relative">
          {/* Dotted Lines Background (Adjusted for dynamic height) */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="h-full w-full" style={{ 
              backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', 
              backgroundSize: '100% 2.5rem',
              backgroundPosition: '0 2.2rem'
            }} />
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium leading-[2.5rem] text-slate-800 dark:text-slate-200 relative z-10 resize-none p-0 outline-none overflow-hidden"
            placeholder="Type your sentences here..."
            spellCheck={false}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-violet-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-violet-500/60 dark:text-violet-400/40">
            <Info className="w-4 h-4 flex-shrink-0" />
            <p className="text-[10px] font-black uppercase tracking-[0.1em]">
              The AI will automatically evaluate your writing quality. Each grammar or spelling error will reduce your total score by 0.1 points.
            </p>
          </div>
          <button
            onClick={handleAiCheck}
            disabled={isChecking || !text.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 dark:disabled:bg-white/5 text-white font-black rounded-2xl transition-all shadow-xl shadow-violet-500/20 active:scale-95 whitespace-nowrap"
          >
            {isChecking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Smart AI Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Grammar Analysis Results */}
      {grammarErrors.length > 0 && (
        <div className="bg-rose-50 dark:bg-rose-500/5 rounded-3xl p-5 md:p-8 border-2 border-rose-100 dark:border-rose-500/10 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-500 rounded-xl">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-rose-600 dark:text-rose-400">
                Grammar & Spelling Suggestions
              </h3>
              <p className="text-rose-500/60 text-sm font-bold">
                Found {grammarErrors.length} potential issues (-{(grammarErrors.length * 0.1).toFixed(1)} points)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grammarErrors.map((error, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-black/40 p-5 rounded-2xl border border-rose-100 dark:border-rose-500/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider rounded-lg">
                    {error.rule.issueType}
                  </span>
                </div>
                
                <p className="text-slate-800 dark:text-slate-200 font-bold">
                  "{text.substring(error.offset, error.offset + error.length)}"
                </p>
                
                <p className="text-sm text-slate-500 dark:text-neutral-400 font-medium italic">
                  {error.message}
                </p>

                {error.replacements.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest w-full">
                      Suggestions:
                    </span>
                    {error.replacements.slice(0, 3).map((rep: any, rIdx: number) => (
                      <span 
                        key={rIdx}
                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-xl border border-emerald-100 dark:border-emerald-500/20"
                      >
                        {rep.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Feedback Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-neutral-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-violet-500" />
            <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-sm">
              Assessment Summary
            </h4>
          </div>
          <ul className="space-y-2">
            {feedback.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-500 dark:text-neutral-400">
                {f.includes("Great") || f.includes("Good") || f.includes("Excellent") ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : f.includes("Penalty") || f.includes("mistakes") ? (
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 dark:bg-neutral-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-black text-violet-600 dark:text-violet-400 mb-1">
            {score.toFixed(1)}/5
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Final Estimated Score
          </p>
          <div className="w-full bg-slate-200 dark:bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-violet-500 h-full transition-all duration-500" 
              style={{ width: `${(score / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
