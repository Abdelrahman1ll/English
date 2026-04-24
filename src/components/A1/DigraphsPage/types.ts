export interface ExampleWord {
  readonly text: string;
  readonly translation: string;
}

export interface DigraphItem {
  readonly digraph: string;
  readonly sound?: string;
  readonly pronunciation?: string;
  readonly note?: string;
  readonly examples: readonly ExampleWord[];
}

export interface DigraphData {
  readonly CONSONANTS: readonly DigraphItem[];
  readonly VOWELS: readonly DigraphItem[];
}
