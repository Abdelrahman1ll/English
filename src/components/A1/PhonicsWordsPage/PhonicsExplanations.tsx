import { useState } from "react";
import {
  Sparkles,
  Ghost,
  Info,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function PhonicsExplanations() {
  const [showQuizAnswers, setShowQuizAnswers] = useState(false);

  return (
    <div className="space-y-16 py-16 border-t border-white/5">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-2 uppercase tracking-widest">
          Phonics Guide
        </div>
        <h2 className="text-5xl font-black text-white flex items-center justify-center gap-4">
          <Info className="text-blue-500" size={40} />
          شرح القواعد التعليمية
        </h2>
        <p className="text-neutral-400 text-xl leading-relaxed">
          دليلك السريع لإتقان نطق الحروف الصامتة وقاعدة Magic E بأسلوب بسيط
          وتفاعلي.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Magic E Rule */}
        <section className="bg-[#121212] rounded-[3rem] p-10 border border-amber-500/10 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-700 shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all" />

          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-500 shadow-inner">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white">قاعدة Magic e</h3>
              <p className="text-amber-500/60 text-sm font-bold uppercase tracking-wider">
                The Silent Power
              </p>
            </div>
          </div>

          <div className="space-y-6 text-neutral-300 leading-relaxed font-arabic text-lg">
            <div className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
              <p>
                <span className="text-amber-400 font-black ml-2">
                  👈 الخلاصة:
                </span>
                حرف الـ{" "}
                <span className="text-white font-black underline decoration-amber-500/50 underline-offset-8">
                  e
                </span>{" "}
                في آخر الكلمة صامت (مش بيتنطق)، بس بيطوّل الحرف المتحرك اللي قبله ويخليه يتنطق زي اسمه في الحروف (A, B, C).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { from: "can", to: <>can<span className="text-amber-500/50">e</span></>, label: "a", ar: "يستطيع → عصا" },
                { from: "bit", to: <>bit<span className="text-amber-500/50">e</span></>, label: "i", ar: "قطعة → يعض" },
                { from: "hop", to: <>hop<span className="text-amber-500/50">e</span></>, label: "o", ar: "قفز → أمل" },
                { from: "cub", to: <>cub<span className="text-amber-500/50">e</span></>, label: "u", ar: "شبل → مكعب" },
              ].map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 p-4 rounded-2xl border border-white/5 flex flex-col gap-2 group/item hover:border-amber-500/20 hover:bg-black/60 transition-all cursor-default shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500/50 font-black uppercase text-xs tracking-tighter">
                      {ex.label}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {ex.ar}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-center py-1">
                    <span className="text-neutral-400 text-lg">{ex.from}</span>
                    <span className="text-amber-500 animate-pulse">→</span>
                    <span className="text-white font-black text-xl tracking-wide">
                      {ex.to}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-4 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
              <Lightbulb className="text-amber-500 shrink-0 mt-1" size={20} />
              <p className="text-sm text-neutral-400 leading-relaxed">
                <span className="text-amber-200/80 font-bold">تذكر:</span> حرف
                الـ e نفسه مش بيتنطق، بس بيدي طاقته للحرف اللي قبله!
              </p>
            </div>
          </div>
        </section>

        {/* Silent Letters Overview */}
        <section className="bg-[#121212] rounded-[3rem] p-10 border border-rose-500/10 relative overflow-hidden group hover:border-rose-500/30 transition-all duration-700 shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-rose-500/10 transition-all" />

          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center text-rose-500 shadow-inner">
              <Ghost size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white">Silent Letters</h3>
              <p className="text-rose-500/60 text-sm font-bold uppercase tracking-wider">
                The Hidden Sounds
              </p>
            </div>
          </div>

          <div className="space-y-6 text-neutral-300 leading-relaxed font-arabic text-lg">
            <div className="bg-white/[0.03] p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
              <p>
                <span className="text-rose-400 font-black ml-2">
                  👈 الخلاصة:
                </span>
                دي حروف بنكتبها في الكلمة بس مش بننطقها خالص، كأنها مش موجودة في النطق.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  l: "B",
                  note: "بعد حرف M",
                  ex: <>Bom<span className="text-rose-500/50">b</span> / Lam<span className="text-rose-500/50">b</span></>,
                  tip: "M + B = Silent B",
                },
                {
                  l: "K",
                  note: "قبل حرف N",
                  ex: <><span className="text-rose-500/50">K</span>nife / <span className="text-rose-500/50">K</span>nee</>,
                  tip: "K + N = Silent K",
                },
                {
                  l: "W",
                  note: "قبل حرف R",
                  ex: <><span className="text-rose-500/50">W</span>rite / <span className="text-rose-500/50">W</span>rist</>,
                  tip: "W + R = Silent W",
                },
                {
                  l: "L",
                  note: "مجموعة خاصة",
                  ex: <>Ta<span className="text-rose-500/50">l</span>k / Ca<span className="text-rose-500/50">l</span>m / Ha<span className="text-rose-500/50">l</span>f</>,
                  tip: "كلمات شائعة",
                },
                {
                  l: "P",
                  note: "مع PS / PN",
                  ex: <><span className="text-rose-500/50">P</span>sychology</>,
                  tip: "في بداية الكلمات",
                },
              ].map((group, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-rose-500/20 transition-all group/item shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-black text-lg border border-rose-500/20 group-hover/item:scale-110 transition-transform">
                      {group.l}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">
                        {group.tip}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {group.note}
                      </span>
                    </div>
                  </div>
                  <span className="text-neutral-200 font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                    {group.ex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Quiz Section */}
      <section className="bg-[#0f0f0f] rounded-[4rem] p-12 border border-blue-500/10 relative overflow-hidden shadow-3xl">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-indigo-600/5" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 space-y-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-3xl bg-blue-500/20 flex items-center justify-center text-blue-400 mx-auto md:mx-0 shadow-2xl border border-blue-500/30">
              <Lightbulb size={40} className="animate-pulse" />
            </div>
            <h3 className="text-4xl font-black text-white">تمارين سريعة</h3>
            <p className="text-neutral-400 text-lg leading-relaxed font-arabic">
              اختبر معلوماتك الآن! هل تستطيع تحديد النطق الصحيح والحرف الصامت؟
            </p>
            <button
              onClick={() => setShowQuizAnswers(!showQuizAnswers)}
              className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 border-2 ${showQuizAnswers ? "bg-green-600/20 border-green-500/50 text-green-400" : "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-[1.02]"}`}
            >
              {showQuizAnswers ? (
                <>
                  <ChevronUp /> إخفاء الإجابات
                </>
              ) : (
                <>
                  <ChevronDown /> أظهر الإجابات النموذجية
                </>
              )}
            </button>
          </div>

          <div className="md:w-2/3 grid gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Question 1 */}
              <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 space-y-4">
                <span className="text-blue-500 font-black text-sm uppercase tracking-widest">
                  Q1: Pronunciation
                </span>
                <p className="text-white font-bold font-arabic">
                  ما هو النطق الصحيح لكلمة{" "}
                  <span className="text-blue-400 underline underline-offset-4">
                    Knife
                  </span>
                  ؟
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-black/40 rounded-xl text-neutral-400 text-sm border border-white/5">
                    a) K-nife
                  </div>
                  <div
                    className={`p-3 rounded-xl text-sm border transition-all ${showQuizAnswers ? "bg-green-500/20 border-green-500/50 text-green-400 font-bold" : "bg-black/40 border-white/5 text-neutral-400"}`}
                  >
                    b) Naif (الصحيح)
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 space-y-4">
                <span className="text-amber-500 font-black text-sm uppercase tracking-widest">
                  Q2: Magic E
                </span>
                <p className="text-white font-bold font-arabic">
                  حوّل كلمة{" "}
                  <span className="text-amber-400 underline underline-offset-4">
                    bit
                  </span>{" "}
                  باستخدام Magic e:
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-3 bg-black/40 rounded-xl text-center font-bold text-neutral-500 border border-white/5 italic">
                    bit + e
                  </div>
                  <span className="text-amber-500 font-bold">→</span>
                  <div
                    className={`flex-1 p-3 rounded-xl text-center font-black transition-all ${showQuizAnswers ? "bg-amber-500/20 border-amber-500/50 text-amber-400 scale-110" : "bg-black/40 border-white/5 text-neutral-600"}`}
                  >
                    {showQuizAnswers ? "BITE" : "???"}
                  </div>
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div className="bg-white/[0.02] p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-rose-500 font-black text-sm uppercase tracking-widest">
                  Q3: Silent Letter
                </span>
                <p className="text-white font-bold font-arabic text-lg">
                  حدد الحرف الساكت في كلمة{" "}
                  <span className="text-rose-400 underline underline-offset-4">
                    Write
                  </span>
                  :
                </p>
              </div>
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black transition-all ${showQuizAnswers ? "bg-rose-500/20 border-2 border-rose-500/50 text-rose-400 rotate-12" : "bg-black/40 border border-white/10 text-neutral-700"}`}
              >
                {showQuizAnswers ? "W" : "?"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
