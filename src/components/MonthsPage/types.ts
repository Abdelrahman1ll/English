export interface MonthItem {
  readonly name: string;
  readonly arabic: string;
}

export interface DayItem {
  readonly name: string;
  readonly arabic: string;
  readonly sentence?: string;
  readonly sentenceTranslation?: string;
}

export interface TimeVocabItem {
  readonly text: string;
  readonly translation: string;
}

export interface TimeCategory {
  readonly category: string;
  readonly items: readonly TimeVocabItem[];
}

export interface CalendarDataStructure {
  readonly MONTHS: readonly MonthItem[];
  readonly DAYS: readonly DayItem[];
  readonly TIME_VOCABULARY: readonly TimeCategory[];
}
