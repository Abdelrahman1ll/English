export interface Language {
  readonly text: string;
  readonly translation: string;
}

export interface PhraseAnswer {
  readonly text: string;
  readonly translation: string;
}

export interface Phrase {
  readonly question: string;
  readonly translation: string;
  readonly answers: readonly PhraseAnswer[];
}

export interface NationalitiesData {
  readonly LANGUAGES: readonly Language[];
  readonly PHRASES: readonly Phrase[];
}
