import React, { createContext, useContext, useState } from "react";
import { LEVELS, type LevelConfig } from "../data/levels";

interface LevelContextType {
  currentLevel: LevelConfig | null;
  setLevel: (levelId: string) => void;
  availableLevels: LevelConfig[];
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(() => {
    return localStorage.getItem("english-master-level");
  });

  const setLevel = (levelId: string) => {
    setCurrentLevelId(levelId);
    localStorage.setItem("english-master-level", levelId);
  };

  const currentLevel = currentLevelId
    ? LEVELS.find((l) => l.id === currentLevelId) || null
    : null;

  return (
    <LevelContext.Provider
      value={{
        currentLevel,
        setLevel,
        availableLevels: LEVELS,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error("useLevel must be used within a LevelProvider");
  }
  return context;
};
