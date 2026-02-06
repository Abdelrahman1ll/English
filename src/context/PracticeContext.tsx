import React, { createContext, useContext, useState } from "react";

export type PracticeMode = "writing" | "speaking" | null;

interface PracticeContextType {
  activeWord: string | null;
  activePhonetics?: {
    name: string;
    sound: string;
    soundAlternatives?: string[];
  };
  practiceMode: PracticeMode;
  setPracticeWord: (
    word: string,
    phonetics?: { name: string; sound: string; soundAlternatives?: string[] },
  ) => void;
  setPracticeMode: (mode: PracticeMode) => void;
  clearPractice: () => void;
}

const PracticeContext = createContext<PracticeContextType | undefined>(
  undefined,
);

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [activePhonetics, setActivePhonetics] = useState<{
    name: string;
    sound: string;
    soundAlternatives?: string[];
  }>();
  const [practiceMode, setPracticeMode] = useState<PracticeMode>(null);

  const setPracticeWord = (
    word: string,
    phonetics?: { name: string; sound: string; soundAlternatives?: string[] },
  ) => {
    setActiveWord(word);
    setActivePhonetics(phonetics);
    // Don't auto-open mode, let the user click the widget buttons
  };

  const clearPractice = () => {
    setActiveWord(null);
    setActivePhonetics(undefined);
    setPracticeMode(null);
  };

  return (
    <PracticeContext.Provider
      value={{
        activeWord,
        activePhonetics,
        practiceMode,
        setPracticeWord,
        setPracticeMode,
        clearPractice,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (context === undefined) {
    throw new Error("usePractice must be used within a PracticeProvider");
  }
  return context;
};
