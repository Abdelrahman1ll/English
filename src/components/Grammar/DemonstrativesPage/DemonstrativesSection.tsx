import { Quote, Sparkles, CheckCircle2, Volume2 } from "lucide-react";
import type { DemonstrativeGroup } from "../types";
import type { StudyItem } from "../../shared/StudyModule";

interface DemonstrativesSectionProps {
  data: readonly DemonstrativeGroup[];
  activeWord: string | null;
  playingItem: string | null;
  studyItems: StudyItem[];
  onItemClick: (text: string) => void;
}

export function DemonstrativesSection({
  data,
  activeWord,
  playingItem,
  onItemClick,
}: DemonstrativesSectionProps) {
  if (data.length === 0) return null;

  return (
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header & Rule Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                Demonstratives
              </h2>
            </div>
            <p className="text-blue-50 text-lg max-w-md font-medium leading-relaxed">
              Words used to point to things near or far from you.
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-right w-full md:w-auto" dir="rtl">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-end gap-2">
              متى نستخدمها؟ <CheckCircle2 size={18} className="text-blue-300" />
            </h3>
            <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
              <div className="bg-white/5 p-2 rounded-xl text-blue-300 font-black">المسافة</div>
              <div className="bg-white/5 p-2 rounded-xl text-white font-black">مفرد (1)</div>
              <div className="bg-white/5 p-2 rounded-xl text-white font-black">جمع (+2)</div>
              
              <div className="bg-white/5 p-2 rounded-xl text-blue-300 font-bold">قريب (Near)</div>
              <div className="bg-blue-500/20 p-2 rounded-xl text-white border border-blue-500/30">
                <p className="font-black text-sm">This</p>
                <p className="opacity-50">هذا</p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-xl text-white border border-blue-500/30">
                <p className="font-black text-sm">These</p>
                <p className="opacity-50">هؤلاء</p>
              </div>

              <div className="bg-white/5 p-2 rounded-xl text-blue-300 font-bold">بعيد (Far)</div>
              <div className="bg-indigo-500/20 p-2 rounded-xl text-white border border-indigo-500/30">
                <p className="font-black text-sm">That</p>
                <p className="opacity-50">ذلك</p>
              </div>
              <div className="bg-indigo-500/20 p-2 rounded-xl text-white border border-indigo-500/30">
                <p className="font-black text-sm">Those</p>
                <p className="opacity-50">أولئك</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {data.map((group) => (
          <div key={group.title} className="space-y-8 bg-[#1a1a1a] p-8 rounded-4xl border border-white/5">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                <Quote size={20} />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                {group.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {group.items.map((item, idx) => (
                <button
                  key={item.text}
                  onClick={() => onItemClick(item.text)}
                  className={`p-6 sm:p-10 rounded-[2rem] border transition-all text-center group flex flex-col items-center justify-center relative ${activeWord === item.text ? "bg-blue-600 border-blue-400 shadow-2xl scale-105 z-10" : "bg-neutral-900 border-white/5 hover:bg-neutral-800"}`}
                >
                  <div className="absolute -top-2 -left-2 z-20">
                    <div className={`flex items-center justify-center min-w-[28px] h-[18px] rounded-lg border shadow-xl ${activeWord === item.text ? "bg-white border-white" : "bg-neutral-800 border-white/10"}`}>
                      <span className={`text-[10px] font-black tracking-tighter leading-none ${activeWord === item.text ? "text-blue-600" : "text-blue-400"}`}>
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <span className={`text-3xl sm:text-4xl font-black ${activeWord === item.text ? "text-white" : "text-neutral-100 group-hover:text-blue-400"}`}>
                    {item.text}
                  </span>
                  <span className={`text-sm font-arabic mt-3 ${activeWord === item.text ? "text-blue-100" : "text-neutral-500"}`}>
                    {item.translation}
                  </span>
                  <div className="mt-4">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${activeWord === item.text ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400"}`}>
                      {item.rule}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-black/20 rounded-3xl p-6 space-y-4 border border-white/5 shadow-inner">
              <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-2">Examples</p>
              {group.examples.map((ex, exIdx) => (
                <button
                  key={ex.text}
                  onClick={() => onItemClick(ex.text)}
                  className={`w-full text-left flex items-center justify-between group p-4 rounded-2xl transition-all border relative ${activeWord === ex.text ? "bg-blue-600 border-blue-400 shadow-lg" : "hover:bg-white/5 border-transparent bg-neutral-900/30"}`}
                >
                  <div className="absolute -top-2 -left-4 z-20">
                    <div className={`flex items-center justify-center min-w-[28px] h-[18px] rounded-md border shadow-md backdrop-blur-md transition-all ${activeWord === ex.text ? "bg-blue-600 border-blue-400" : "bg-neutral-800 border-white/10"}`}>
                      <span className={`text-[10px] font-black tracking-tighter leading-none ${activeWord === ex.text ? "text-white" : "text-blue-400"}`}>
                        #{String(exIdx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold transition-colors ${activeWord === ex.text ? "text-white" : "text-neutral-200 group-hover:text-blue-400"}`}>
                      {ex.text}
                    </div>
                    <div className={`text-sm font-arabic mt-1 ${activeWord === ex.text ? "text-blue-100/70" : "text-neutral-500"}`}>
                      {ex.translation}
                    </div>
                  </div>
                  <Volume2 size={18} className={`transition-all ${playingItem === ex.text ? "text-white animate-pulse scale-125" : activeWord === ex.text ? "text-white/60" : "text-neutral-700 opacity-0 group-hover:opacity-100"}`} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
