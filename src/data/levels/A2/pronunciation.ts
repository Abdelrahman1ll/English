export interface PronunciationItem {
  sound: string;
  type: "voiceless" | "voiced";
  examples: { word: string; translation?: string }[];
}

export const PRONUNCIATION_DATA: PronunciationItem[] = [
  {
    sound: "/t/",
    type: "voiceless",
    examples: [
      { word: "ten" },
      { word: "seat" },
    ],
  },
  {
    sound: "/k/",
    type: "voiceless",
    examples: [
      { word: "class" },
      { word: "back" },
    ],
  },
  {
    sound: "/ʃ/ (sh)",
    type: "voiceless",
    examples: [
      { word: "pressure" },
      { word: "wish" },
    ],
  },
  {
    sound: "/tʃ/ (ch)",
    type: "voiceless",
    examples: [
      { word: "rich" },
      { word: "chair" },
    ],
  },
  {
    sound: "/d/",
    type: "voiced",
    examples: [
      { word: "den" },
      { word: "seed" },
    ],
  },
  {
    sound: "/g/",
    type: "voiced",
    examples: [
      { word: "glass" },
      { word: "bag" },
    ],
  },
  {
    sound: "/ʒ/ (zh)",
    type: "voiced",
    examples: [
      { word: "vision" },
      { word: "pleasure" },
    ],
  },
  {
    sound: "/dʒ/ (j)",
    type: "voiced",
    examples: [
      { word: "edge" },
      { word: "joke" },
    ],
  },
];
