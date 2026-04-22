export interface VocabularyItem {
  readonly text: string;
  readonly translation?: string;
}

export interface JobsData {
  readonly PROFESSIONS: readonly VocabularyItem[];
  readonly PLACES: readonly VocabularyItem[];
  readonly PHRASES: readonly VocabularyItem[];
}
