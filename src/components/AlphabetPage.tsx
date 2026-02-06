import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { usePractice } from "../context/PracticeContext";
import { useSpeech } from "../hooks/useSpeech";

// Expanded Data with Phonics
const ALPHABET_DATA: Record<
  string,
  {
    name: string;
    sound: string;
    soundExample: string;
    phoneme: string;
    soundAlternatives: string[];
  }
> = {
  A: {
    name: "Ay",
    sound: "Ah",
    soundExample: "Apple",
    phoneme: "a",
    soundAlternatives: ["a", "ah", "apple", "at", "an", "as", "about"],
  },
  B: {
    name: "Bee",
    sound: "Buh",
    soundExample: "Ball",
    phoneme: "b",
    soundAlternatives: ["ba", "buh", "ball", "be", "bee", "boy", "but"],
  },
  C: {
    name: "See",
    sound: "Kuh",
    soundExample: "Cat",
    phoneme: "c",
    soundAlternatives: ["ka", "kuh", "cat", "car", "can", "come"],
  },
  D: {
    name: "Dee",
    sound: "Duh",
    soundExample: "Dog",
    phoneme: "d",
    soundAlternatives: ["da", "duh", "dog", "day", "do", "dad"],
  },
  E: {
    name: "Ee",
    sound: "Eh",
    soundExample: "Egg",
    phoneme: "e",
    soundAlternatives: ["e", "eh", "egg", "end", "elephant", "every"],
  },
  F: {
    name: "Eff",
    sound: "Fff",
    soundExample: "Fish",
    phoneme: "f",
    soundAlternatives: ["f", "fff", "fish", "fox", "fan", "for"],
  },
  G: {
    name: "Jee",
    sound: "Guh",
    soundExample: "Goat",
    phoneme: "g",
    soundAlternatives: ["ga", "guh", "goat", "game", "go", "good"],
  },
  H: {
    name: "Aitch",
    sound: "Huh",
    soundExample: "Hat",
    phoneme: "h",
    soundAlternatives: ["ha", "huh", "hat", "hot", "he", "hi"],
  },
  I: {
    name: "Eye",
    sound: "Ih",
    soundExample: "Igloo",
    phoneme: "i",
    soundAlternatives: ["i", "ih", "igloo", "it", "is", "in"],
  },
  J: {
    name: "Jay",
    sound: "Juh",
    soundExample: "Jam",
    phoneme: "j",
    soundAlternatives: ["ja", "juh", "jam", "jet", "jar", "joy"],
  },
  K: {
    name: "Kay",
    sound: "Kuh",
    soundExample: "Kite",
    phoneme: "k",
    soundAlternatives: ["ka", "kuh", "kite", "key", "king", "kind"],
  },
  L: {
    name: "El",
    sound: "Lll",
    soundExample: "Lion",
    phoneme: "l",
    soundAlternatives: ["la", "lll", "lion", "leg", "let", "look"],
  },
  M: {
    name: "Em",
    sound: "Mmm",
    soundExample: "Monkey",
    phoneme: "m",
    soundAlternatives: ["ma", "mmm", "monkey", "me", "my", "man"],
  },
  N: {
    name: "En",
    sound: "Nnn",
    soundExample: "Nest",
    phoneme: "n",
    soundAlternatives: ["na", "nnn", "nest", "no", "not", "new"],
  },
  O: {
    name: "Oh",
    sound: "Aw",
    soundExample: "Octopus",
    phoneme: "o",
    soundAlternatives: ["o", "aw", "octopus", "on", "off", "ox"],
  },
  P: {
    name: "Pee",
    sound: "Puh",
    soundExample: "Pig",
    phoneme: "p",
    soundAlternatives: ["pa", "puh", "pig", "pen", "put", "pet"],
  },
  Q: {
    name: "Cue",
    sound: "Kwuh",
    soundExample: "Queen",
    phoneme: "q",
    soundAlternatives: ["kwa", "kwuh", "queen", "quick", "question"],
  },
  R: {
    name: "Ar",
    sound: "Rrr",
    soundExample: "Rabbit",
    phoneme: "r",
    soundAlternatives: ["ra", "rrr", "rabbit", "run", "red", "rat"],
  },
  S: {
    name: "Ess",
    sound: "Sah",
    soundExample: "Sun",
    phoneme: "s",
    soundAlternatives: ["sa", "sah", "sun", "see", "sit", "sing"],
  },
  T: {
    name: "Tee",
    sound: "Tuh",
    soundExample: "Tiger",
    phoneme: "t",
    soundAlternatives: ["ta", "tuh", "tiger", "to", "ten", "top"],
  },
  U: {
    name: "You",
    sound: "Uh",
    soundExample: "Umbrella",
    phoneme: "u",
    soundAlternatives: ["u", "uh", "umbrella", "up", "us", "under"],
  },
  V: {
    name: "Vee",
    sound: "Vvv",
    soundExample: "Van",
    phoneme: "v",
    soundAlternatives: ["va", "vvv", "van", "very", "voice"],
  },
  W: {
    name: "Double u",
    sound: "Wuh",
    soundExample: "Watch",
    phoneme: "w",
    soundAlternatives: ["wa", "wuh", "watch", "we", "was", "will"],
  },
  X: {
    name: "Ex",
    sound: "Ks",
    soundExample: "Box",
    phoneme: "x",
    soundAlternatives: ["ks", "ex", "box", "six", "fox", "tax"],
  },
  Y: {
    name: "Wye",
    sound: "Yuh",
    soundExample: "Yo-yo",
    phoneme: "y",
    soundAlternatives: ["ya", "yuh", "yo-yo", "yes", "why", "wye", "you"],
  },
  Z: {
    name: "Zee",
    sound: "Zzz",
    soundExample: "Zebra",
    phoneme: "z",
    soundAlternatives: ["za", "zzz", "zebra", "zoo", "zip", "zero"],
  },
};

const ALPHABET = Object.keys(ALPHABET_DATA);

export function AlphabetPage() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [showReference, setShowReference] = useState(true);
  const { setPracticeWord } = usePractice();

  const toggleReference = () => {
    setShowReference(!showReference);
  };

  const { speak } = useSpeech();

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
    const data = ALPHABET_DATA[letter];

    // Set global practice word
    setPracticeWord(letter, {
      name: data.name,
      sound: data.sound,
      soundAlternatives: data.soundAlternatives,
    });

    speak(`${data.name}, ${data.sound}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Alphabet
          </h1>
          <p className="text-neutral-400 mt-1 text-sm sm:text-base">
            Master the 26 letters.
          </p>
        </div>
        {/* Mode Toggle */}
        <div className="flex justify-end gap-3">
          <button
            onClick={toggleReference}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#242424] text-neutral-400 text-sm border border-white/5"
          >
            {showReference ? <Eye size={16} /> : <EyeOff size={16} />}
            {showReference ? "Hide Letters" : "Show Letters"}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-4 transition-all duration-500 ${showReference ? "opacity-100 blur-none" : "opacity-0 blur-xl pointer-events-none absolute inset-0 z-[-1]"}`}
      >
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative overflow-hidden group border ${
              activeLetter === letter
                ? "bg-blue-500/10 border-blue-500/50 text-blue-400 scale-110 z-10 shadow-xl shadow-blue-500/10"
                : "bg-[#1e1e1e] text-neutral-300 border-white/5 hover:bg-[#2a2a2a]"
            }`}
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              {letter}
              {letter.toLowerCase()}
            </span>
            {activeLetter === letter && (
              <div className="text-xs mt-1 font-medium opacity-80">
                {ALPHABET_DATA[letter].name}
              </div>
            )}
          </button>
        ))}
      </div>

      {!showReference && (
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl text-neutral-500">
          Letters Hidden - Memory Mode
        </div>
      )}

      {/* Instruction Card */}
      <div className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5 shadow-lg text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Practice Mode</h3>
        <p className="text-neutral-400 max-w-md mx-auto">
          Click on any letter, then use the floating menu on the right to
          practice **Writing** or **Speaking**.
        </p>
      </div>
    </div>
  );
}
