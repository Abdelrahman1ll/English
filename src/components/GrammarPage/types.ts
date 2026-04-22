import type { VocabularyItem } from "../../data/levels";

export interface GrammarItem extends VocabularyItem {
  readonly article: "a" | "an" | "none";
}

export interface QuizQuestion {
  readonly question: string;
  readonly answer: string;
  readonly options: readonly string[];
}

export interface PluralExample {
  readonly singular: string;
  readonly plural: string;
  readonly arabic: string;
}

export interface DemonstrativeGroup {
  readonly title: string;
  readonly items: ReadonlyArray<{
    readonly text: string;
    readonly translation: string;
    readonly rule: string;
  }>;
  readonly examples: ReadonlyArray<{
    readonly text: string;
    readonly translation: string;
  }>;
}

export interface PrepositionItem {
  readonly text: string;
  readonly translation: string;
}

export interface PrepositionExample {
  readonly en: string;
  readonly ar: string;
}
