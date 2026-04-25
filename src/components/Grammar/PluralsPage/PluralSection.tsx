import { Volume2, Sparkles, CheckCircle2 } from "lucide-react";
import type { PluralExample, PluralRule } from "../types";
import type { StudyItem } from "../../shared/StudyModule";

interface PluralSectionProps {
  items: readonly PluralExample[];
  rules?: readonly PluralRule[];
  activeWord: string | null;
  playingItem: string | null;
  studyItems: StudyItem[];
  onItemClick: (text: string) => void;
}

export function PluralSection({
  items,
  rules,
  activeWord,
  playingItem,
  onItemClick,
}: PluralSectionProps) {
  if (items.length === 0 && (!rules || rules.length === 0)) return null;

  const renderPlural = (item: PluralExample, isActive: boolean) => {
    if (!item.highlight) return item.plural;
    
    const index = item.plural.lastIndexOf(item.highlight);
    if (index === -1) return item.plural;

    const prefix = item.plural.substring(0, index);
    const suffix = item.plural.substring(index);

    return (
      <>
        {prefix}
        <span className={isActive ? "text-blue-200" : "text-blue-500 underline decoration-2 underline-offset-4"}>
          {suffix}
        </span>
      </>
    );
  };

  const renderItem = (item: PluralExample, index?: number) => {
    const displayText = `${item.singular} → ${item.plural}`;
    const isActive = activeWord === displayText;

    return (
      <button
        key={item.singular}
        onClick={() => onItemClick(displayText)}
        className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-3xl transition-all border group relative overflow-hidden ${
          isActive
            ? "bg-blue-600 border-blue-400 shadow-2xl shadow-blue-600/20 scale-[1.02] z-10"
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/10"
        }`}
      >
        {index !== undefined && (
          <div className="absolute -top-1 -left-1 z-20">
            <div className={`px-1.5 py-0.5 rounded-lg border shadow-xl ${isActive ? "bg-white border-white" : "bg-neutral-900 border-white/10"}`}>
              <span className={`text-[9px] font-black tracking-tighter tabular-nums ${isActive ? "text-blue-600" : "text-neutral-500"}`}>
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
          <div className={`text-xl sm:text-2xl font-bold transition-colors ${isActive ? "text-white/80" : "text-neutral-500"}`}>
            {item.singular}
          </div>
          <div className={`transition-colors ${isActive ? "text-white/40" : "text-neutral-700"}`}>
            →
          </div>
          <div className={`text-2xl sm:text-3xl font-black transition-colors ${isActive ? "text-white" : "text-neutral-100"}`}>
            {renderPlural(item, isActive)}
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-0">
          <div className={`text-lg sm:text-xl font-arabic transition-colors ${isActive ? "text-white" : "text-neutral-400"}`}>
            {item.arabic}
          </div>
          <Volume2
            size={18}
            className={`transition-all ${playingItem === displayText ? "text-white animate-pulse scale-125" : isActive ? "text-white/80" : "opacity-0 group-hover:opacity-40 text-neutral-400"}`}
          />
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section with rule summary */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                Singular & Plural
              </h2>
            </div>
            <p className="text-blue-100 text-lg max-w-md font-medium leading-relaxed">
              Master the art of changing words from singular to plural with these simple spelling rules.
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-right" dir="rtl">
            <h3 className="text-white font-bold text-xl mb-2 flex items-center justify-end gap-2">
              القاعدة العامة <CheckCircle2 size={18} className="text-blue-300" />
            </h3>
            <p className="text-blue-50/80 text-lg">
              بشكل عام، نضيف حرف <span className="text-white font-black text-2xl px-2">S</span> لنهاية الكلمة لتحويلها للجمع.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Rules Categories (If available) */}
      {rules && rules.length > 0 && (
        <div className="grid grid-cols-1 gap-12">
          {rules.map((rule, ruleIdx) => (
            <section key={ruleIdx} className="space-y-6">
              <div className="flex items-end justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="text-blue-500 font-black text-xs uppercase tracking-[0.2em]">Rule Category</span>
                  <h3 className="text-2xl font-black text-white">{ruleIdx + 1}. {rule.title}</h3>
                </div>
                <div className="text-right">
                  <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-500/20">
                    {rule.rule}
                  </span>
                  {rule.arabicRule && (
                    <p className="text-neutral-500 font-arabic text-sm mt-2" dir="rtl">{rule.arabicRule}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rule.examples.map((item, idx) => renderItem(item, idx))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Flat list (Fallback or for items not in rules) */}
      {(!rules || rules.length === 0) && items.length > 0 && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => renderItem(item, idx))}
          </div>
        </section>
      )}
    </div>
  );
}
