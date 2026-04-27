import { useState, useEffect } from "react";
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
  Search as SearchIcon,
  Hash,
} from "lucide-react";
import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";

export interface StudyItem {
  primary: string; // English word/sentence
  secondary: string; // Arabic translation
  audio?: string; // Optional audio overrides primary
  category?: string;
  note?: string;
}

interface StudyModuleProps {
  items: StudyItem[];
  onExit?: () => void;
}

export function StudyModule({ items }: StudyModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceInput, setPracticeInput] = useState("");
  const [isWordVisible, setIsWordVisible] = useState(true);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [hasSpokenCorrect, setHasSpokenCorrect] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(
    new Set(),
  );

  const { setPracticeWord } = usePractice();
  const { speak } = useSpeech();

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (items.length > 0) {
      handleSpeak(items[currentIndex].primary);
    }
  }, [currentIndex, items]);

  // State reset is now handled atomically in navigation functions to avoid flickering


  const handleSpeak = (text: string) => {
    const audioText = items[currentIndex].audio || text;
    speak(audioText, () => setPlayingItem(null));
    setPlayingItem(audioText);
    setPracticeWord(audioText);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setPracticeInput("");
      setIsWordVisible(true);
      setHasSpokenCorrect(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setPracticeInput("");
      setIsWordVisible(true);
      setHasSpokenCorrect(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJump = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Check if it's a number (1-based index)
    const num = parseInt(trimmed);
    if (!isNaN(num)) {
      const index = Math.max(0, Math.min(items.length - 1, num - 1));
      setPracticeInput("");
      setIsWordVisible(true);
      setHasSpokenCorrect(false);
      setCurrentIndex(index);
      setSearchQuery("");
      return;
    }

    // Otherwise search by text
    const foundIndex = items.findIndex(
      (item) =>
        item.primary.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.secondary.toLowerCase().includes(trimmed.toLowerCase()),
    );

    if (foundIndex !== -1) {
      setPracticeInput("");
      setIsWordVisible(true);
      setHasSpokenCorrect(false);
      setCurrentIndex(foundIndex);
      setSearchQuery("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-[#1a1a1a] rounded-[3rem] border border-dashed border-white/10">
        <p className="text-neutral-500 text-xl font-medium">
          No items to study.
        </p>
      </div>
    );
  }

  const isCorrect =
    practiceInput.trim().toLowerCase() ===
    currentItem.primary.trim().toLowerCase();
  const shouldHide = !isWordVisible && !isCorrect;

  useEffect(() => {
    if (isCorrect && !hasSpokenCorrect) {
      speak("Perfect!", () => {});
      setHasSpokenCorrect(true);
      setIsWordVisible(true);
      if (!completedIndices.has(currentIndex)) {
        setCompletedIndices((prev) => new Set(prev).add(currentIndex));
      }
    }
  }, [isCorrect, hasSpokenCorrect, speak, currentIndex, completedIndices]);

  // New: Spelling guide logic
  const firstMistakeIndex = practiceInput
    .split("")
    .findIndex(
      (char, i) => char.toLowerCase() !== currentItem.primary[i]?.toLowerCase(),
    );
  const hasError = firstMistakeIndex !== -1;

  return (
    <div className="max-w-3xl mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-3 sm:space-y-4 pb-2 sm:pb-4">
        {/* Matte Search/Jump Bar */}
        <div className="relative max-w-xl mx-auto mb-2 sm:mb-2 px-4 sm:px-0">
          <div className="relative flex items-center gap-2 sm:gap-3 bg-[#1e1e1e] border border-white/10 rounded-2xl p-1 sm:p-1.5 focus-within:border-white/20 transition-all shadow-inner overflow-hidden">
            <div className="pl-2 sm:pl-4 text-neutral-500">
              <SearchIcon className="size-4 sm:size-5" />
            </div>
            <input
              type="text"
              placeholder="Jump to # or search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJump(searchQuery)}
              className="flex-1 bg-transparent border-none py-1 text-sm sm:text-lg text-white placeholder:text-neutral-600 focus:outline-hidden font-medium min-w-0"
            />
            <button
              onClick={() => handleJump(searchQuery)}
              className="shrink-0 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 border border-white/5 rounded-xl transition-all font-bold text-[10px] sm:text-xs uppercase tracking-widest"
            >
              Jump
            </button>
          </div>
        </div>

        {/* Study Card */}
        <div className="relative group min-h-[250px] sm:min-h-[350px]">
          <div className="absolute -inset-4 bg-linear-to-b from-blue-500/10 to-indigo-500/10 rounded-[3rem] blur-2xl opacity-50" />
          <div className="relative bg-[#1a1a1a] border border-white/10 rounded-[3rem] p-4 sm:p-6 md:p-8 shadow-2xl space-y-2 sm:space-y-6 h-full flex flex-col justify-center text-center">
            {/* Category & Peek */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex-none">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5 whitespace-nowrap">
                  <Hash size={12} className="text-blue-500" />
                  <span className="text-[10px] font-black text-neutral-400 tracking-tighter tabular-nums">
                    {String(currentIndex + 1).padStart(3, "0")}
                  </span>
                </div>
              </div>

              {currentItem.category && (
                <span className="flex-1 min-w-0 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-[0.1em] sm:tracking-widest truncate text-center mx-2">
                  {currentItem.category}
                </span>
              )}

              <div className="flex-none">
                <button
                  onClick={() => setIsWordVisible(!isWordVisible)}
                  className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative group/eye ${
                    isWordVisible
                      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                      : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  }`}
                  title={
                    isWordVisible ? "Hide English Text" : "Show English Text"
                  }
                >
                  <div
                    className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover/eye:opacity-50 transition-opacity ${isWordVisible ? "bg-blue-400" : "bg-rose-400"}`}
                  />
                  {isWordVisible ? (
                    <Eye size={22} className="relative z-10" />
                  ) : (
                    <EyeOff size={22} className="relative z-10" />
                  )}
                </button>
              </div>
            </div>

            {/* English Text & Audio */}
            <div className="space-y-2 sm:space-y-6">
              <button
                onClick={() => handleSpeak(currentItem.primary)}
                className="group/btn relative mx-auto"
              >
                <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-xl group-hover/btn:bg-blue-600/40 transition-all" />
                <div
                  className={`relative p-5 sm:p-8 rounded-full border transition-all duration-300 ${playingItem === (currentItem.audio || currentItem.primary) ? "bg-blue-600 border-blue-500 scale-110 shadow-2xl shadow-blue-600/40" : "bg-neutral-800 border-white/5 group-hover/btn:border-blue-500/50 group-hover/btn:scale-105"}`}
                >
                  <Volume2
                    className={`size-8 sm:size-12 ${
                      playingItem === (currentItem.audio || currentItem.primary)
                        ? "text-white animate-pulse"
                        : "text-blue-400"
                    }`}
                  />
                </div>
              </button>

              <div className="relative">
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight transition-all duration-500 ${shouldHide ? "opacity-0 blur-xl scale-95" : "opacity-100 blur-0 scale-100"}`}
                >
                  {currentItem.primary}
                </h2>
                {shouldHide && (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-800 font-black text-lg sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.5em] animate-pulse uppercase select-none">
                    Recalling...
                  </div>
                )}
              </div>
            </div>

            {/* Arabic Translation */}
            <div className="pt-1 sm:pt-2">
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-arabic dir-rtl leading-relaxed">
                {currentItem.secondary}
              </p>
            </div>
          </div>
        </div>

        {/* Practice Input Area */}
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between px-4 min-h-[24px]">
            <div className="flex items-center gap-3">
              <label className="text-[10px] sm:text-xs font-black text-neutral-500 uppercase tracking-widest">
                {isWordVisible ? "Practice Mode" : "Type what you hear/remember"}
              </label>
              {isWordVisible && (
                <div 
                  onClick={() => setIsWordVisible(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full cursor-pointer hover:bg-blue-500/20 transition-all animate-in fade-in slide-in-from-left-2"
                >
                  <EyeOff size={10} className="text-blue-400" />
                  <span className="text-[8px] sm:text-[10px] font-black text-blue-400 uppercase tracking-tight">Word hides when you type</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setPracticeInput("")}
              className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold"
            >
              <RotateCcw size={14} />
              CLEAR
            </button>
          </div>
          <div className="relative group/input">
            <input
              type="text"
              placeholder="Practice typing..."
              value={practiceInput}
              onChange={(e) => {
                if (isWordVisible) {
                  setIsWordVisible(false);
                }
                setPracticeInput(e.target.value);
              }}
              onFocus={() => {
                setIsWordVisible(false);
              }}
              className={`w-full bg-[#1a1a1a]/50 border rounded-2xl py-2 px-4 sm:py-4 sm:px-6 text-base sm:text-lg transition-all focus:outline-hidden focus:ring-4 focus:ring-blue-500/20 ${
                isCorrect
                  ? "border-green-500/50 text-green-400 bg-green-500/5 shadow-lg shadow-green-500/10"
                  : "border-white/5 focus:border-blue-500/50 text-white"
              } ${isWordVisible && !isCorrect ? "border-blue-500/20" : ""}`}
            />
          </div>

          {/* Spelling Guide - Small & Pretty Single Character Hint */}
          {hasError && (
            <div className="animate-in fade-in zoom-in duration-500 py-2 sm:py-4">
              <div className="flex flex-col items-center gap-1.5 sm:gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 bg-rose-500/20 rounded-full blur-lg animate-pulse" />
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1a1a1a] border border-rose-500/40 flex items-center justify-center shadow-xl">
                    <span className="text-2xl sm:text-3xl font-black text-rose-500 font-mono">
                      {currentItem.primary[firstMistakeIndex] === " "
                        ? "␣"
                        : currentItem.primary[firstMistakeIndex]}
                    </span>
                  </div>
                </div>
                <div className="bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20">
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">
                    {currentItem.primary[firstMistakeIndex] === " "
                      ? "Space Needed"
                      : "Correct Character"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 pt-0 sm:pt-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 sm:p-4 rounded-3xl bg-[#1a1a1a] border border-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <div className="px-3 py-1.5 sm:px-6 sm:py-3 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl">
            <span className="text-base sm:text-xl font-black text-blue-400">
              {currentIndex + 1}
            </span>
            <span className="text-neutral-600 font-bold mx-2 sm:mx-3">/</span>
            <span className="text-neutral-500 font-bold text-xs sm:text-sm">{items.length}</span>
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex === items.length - 1}
            className="p-2 sm:p-4 rounded-3xl bg-[#1a1a1a] border border-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
