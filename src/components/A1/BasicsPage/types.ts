import type { Question } from "../../../data/levels";

export interface BasicItem {
  word: string;
  arabic: string;
  example: string;
  exampleArabic: string;
}

export interface BasicsData {
  ARTICLES: BasicItem[];
  PRONOUNS: BasicItem[];
  POSSESSIVES: BasicItem[];
  QUIZ: Question[];
}
