import { usePractice } from "../../context/PracticeContext";
import { useSpeech } from "../../hooks/useSpeech";
import { ALPHABET_DATA, ALPHABET } from "./AlphabetData";
import { AlphabetCard } from "./AlphabetCard";
import { AlphabetHeader } from "./AlphabetHeader";
import { InstructionCard } from "../shared/InstructionCard";

export function AlphabetPage() {
  const { setPracticeWord, activeWord } = usePractice();
  const { speak } = useSpeech();

  const handleLetterClick = (letter: string) => {
    const data = ALPHABET_DATA[letter];
    speak(`${data.name}, ${data.sound}`);
    setPracticeWord(letter, {
      name: data.name,
      sound: data.sound,
      soundAlternatives: data.soundAlternatives,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <AlphabetHeader />

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-4 transition-all duration-500 opacity-100 blur-none">
        {ALPHABET.map((letter) => (
          <AlphabetCard
            key={letter}
            letter={letter}
            isActive={activeWord === letter}
            onClick={handleLetterClick}
          />
        ))}
      </div>

      <InstructionCard />
    </div>
  );
}
