export interface FeelingItem {
  readonly word: string;
  readonly arabic: string;
  readonly type?: string;
}

export interface FeelingCategory {
  readonly category: string;
  readonly items: readonly FeelingItem[];
}
