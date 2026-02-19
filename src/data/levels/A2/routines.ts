import type { VocabularyItem, SentenceItem } from "../../levels";
import { Clock } from "lucide-react";

export const ROUTINES_VOCAB: VocabularyItem[] = [
  { english: "Wake up", arabic: "يستيقظ", note: "v" },
  { english: "Get up", arabic: "ينهض من السرير", note: "v" },
  { english: "Brush teeth", arabic: "ينظف أسنانه", note: "v" },
  { english: "Wash face", arabic: "يغسل وجهه", note: "v" },
  { english: "Take a shower", arabic: "يستحم", note: "v" },
  { english: "Have breakfast", arabic: "يتناول الإفطار", note: "v" },
  { english: "Go to school", arabic: "يذهب إلى المدرسة", note: "v" },
  { english: "Go to work", arabic: "يذهب إلى العمل", note: "v" },
  { english: "Start work", arabic: "يبدأ العمل", note: "v" },
  { english: "Have lunch", arabic: "يتناول الغداء", note: "v" },
  { english: "Finish work", arabic: "ينهي العمل", note: "v" },
  { english: "Go home", arabic: "يعود للمنزل", note: "v" },
  { english: "Have dinner", arabic: "يتناول العشاء", note: "v" },
  { english: "Watch TV", arabic: "يشاهد التلفاز", note: "v" },
  { english: "Read a book", arabic: "يقرأ كتاباً", note: "v" },
  { english: "Go to bed", arabic: "يذهب للنوم", note: "v" },
  { english: "Sleep", arabic: "ينام", note: "v" },
];

export const ROUTINES_SENTENCES: SentenceItem[] = [
  {
    english: "I wake up at 7 o'clock every morning.",
    arabic: "أستيقظ في الساعة السابعة كل صباح.",
    category: "Routines",
    icon: Clock
  },
  {
    english: "I have breakfast with my family.",
    arabic: "أتناول الإفطار مع عائلتي.",
    category: "Routines",
    icon: Clock
  },
  {
    english: "I go to work by bus.",
    arabic: "أذهب إلى العمل بالحافلة.",
    category: "Routines",
    icon: Clock
  },
  {
    english: "I usually go to bed at 10 PM.",
    arabic: "عادة ما أذهب للنوم في الساعة العاشرة مساءً.",
    category: "Routines",
    icon: Clock
  }
];
