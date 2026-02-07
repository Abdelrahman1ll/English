import { Volume2, Hash } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

type NumberItem = {
  digit: string;
  word: string;
};

const BASICS: NumberItem[] = [
  { digit: "0", word: "Zero" },
  { digit: "1", word: "One" },
  { digit: "2", word: "Two" },
  { digit: "3", word: "Three" },
  { digit: "4", word: "Four" },
  { digit: "5", word: "Five" },
  { digit: "6", word: "Six" },
  { digit: "7", word: "Seven" },
  { digit: "8", word: "Eight" },
  { digit: "9", word: "Nine" },
  { digit: "10", word: "Ten" },
];

const TEENS: NumberItem[] = [
  { digit: "11", word: "Eleven" },
  { digit: "12", word: "Twelve" },
  { digit: "13", word: "Thirteen" },
  { digit: "14", word: "Fourteen" },
  { digit: "15", word: "Fifteen" },
  { digit: "16", word: "Sixteen" },
  { digit: "17", word: "Seventeen" },
  { digit: "18", word: "Eighteen" },
  { digit: "19", word: "Nineteen" },
];

const TENS: NumberItem[] = [
  { digit: "20", word: "Twenty" },
  { digit: "30", word: "Thirty" },
  { digit: "40", word: "Forty" },
  { digit: "50", word: "Fifty" },
  { digit: "60", word: "Sixty" },
  { digit: "70", word: "Seventy" },
  { digit: "80", word: "Eighty" },
  { digit: "90", word: "Ninety" },
];

const BIG: NumberItem[] = [
  { digit: "100", word: "Hundred" },
  { digit: "1,000", word: "Thousand" },
  { digit: "1m", word: "Million" },
];

const ORDINALS: (NumberItem & { arabic: string })[] = [
  { digit: "1st", word: "First", arabic: "الأول" },
  { digit: "2nd", word: "Second", arabic: "الثاني" },
  { digit: "3rd", word: "Third", arabic: "الثالث" },
  { digit: "4th", word: "Fourth", arabic: "الرابع" },
  { digit: "5th", word: "Fifth", arabic: "خامس" },
  { digit: "6th", word: "Sixth", arabic: "سادس" },
  { digit: "7th", word: "Seventh", arabic: "سابع" },
  { digit: "8th", word: "Eighth", arabic: "ثامن" },
  { digit: "9th", word: "Ninth", arabic: "تاسع" },
  { digit: "10th", word: "Tenth", arabic: "عاشر" },
  { digit: "11th", word: "Eleventh", arabic: "الحادي عشر" },
  { digit: "12th", word: "Twelfth", arabic: "الثاني عشر" },
  { digit: "13th", word: "Thirteenth", arabic: "الثالث عشر" },
  { digit: "14th", word: "Fourteenth", arabic: "الرابع عشر" },
  { digit: "15th", word: "Fifteenth", arabic: "الخامس عشر" },
  { digit: "16th", word: "Sixteenth", arabic: "السادس عشر" },
  { digit: "17th", word: "Seventeenth", arabic: "السابع عشر" },
  { digit: "18th", word: "Eighteenth", arabic: "الثامن عشر" },
  { digit: "19th", word: "Nineteenth", arabic: "التاسع عشر" },
  { digit: "20th", word: "Twentieth", arabic: "العشرون" },
  { digit: "21st", word: "Twenty-first", arabic: "الحادي والعشرون" },
  { digit: "22nd", word: "Twenty-second", arabic: "الثاني والعشرون" },
  { digit: "23rd", word: "Twenty-third", arabic: "الثالث والعشرون" },
  { digit: "24th", word: "Twenty-fourth", arabic: "الرابع والعشرون" },
  { digit: "25th", word: "Twenty-fifth", arabic: "الخامس والعشرون" },
  { digit: "26th", word: "Twenty-sixth", arabic: "السادس والعشرون" },
  { digit: "27th", word: "Twenty-seventh", arabic: "السابع والعشرون" },
  { digit: "28th", word: "Twenty-eighth", arabic: "الثامن والعشرون" },
  { digit: "29th", word: "Twenty-ninth", arabic: "التاسع والعشرون" },
  { digit: "30th", word: "Thirtieth", arabic: "الثلاثون" },
];

export function NumbersPage() {
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleCardClick = (item: NumberItem) => {
    speak(item.word);
    setPracticeWord(item.word);
  };

  const NumberCard = ({ item }: { item: NumberItem & { arabic?: string } }) => {
    const isActive = activeWord === item.word;

    return (
      <button
        onClick={() => handleCardClick(item)}
        className={`group flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${
          isActive
            ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-xl shadow-blue-500/20 z-10"
            : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525] hover:border-white/20"
        }`}
      >
        <div
          className={`text-4xl font-black mb-3 transition-colors ${isActive ? "text-blue-400" : "text-blue-400/80"}`}
        >
          {item.digit}
        </div>
        <div
          className={`flex flex-col items-center gap-1 text-sm font-bold ${isActive ? "text-white/90" : "text-neutral-400"}`}
        >
          <div className="flex items-center gap-2">
            <span>{item.word}</span>
            <Volume2
              size={14}
              className={`transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          </div>
          {item.arabic && (
            <span className="text-xs opacity-50 font-arabic italic">
              {item.arabic}
            </span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Hash className="text-blue-400" /> Numbers
        </h1>
        <p className="text-neutral-400 mt-2">
          Count from zero to a million and master ordinals.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-blue-500 uppercase tracking-widest text-sm">
          Basics (0-10)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {BASICS.map((item) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-purple-500 uppercase tracking-widest text-sm">
          The Teens (11-19)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {TEENS.map((item) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-amber-500 uppercase tracking-widest text-sm">
          The Tens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {TENS.map((item) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-rose-500 uppercase tracking-widest text-sm">
          Ordinal Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {ORDINALS.map((item) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-white pl-4 border-l-4 border-emerald-500 uppercase tracking-widest text-sm">
          Big Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BIG.map((item) => (
            <NumberCard key={item.digit} item={item} />
          ))}
        </div>
      </div>

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Practice Mode</h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          Click on any number, then use the floating menu on the right to
          practice **Writing** or **Speaking** its name.
        </p>
      </div>
    </div>
  );
}
