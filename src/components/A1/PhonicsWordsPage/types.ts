export interface MagicEPair {
  readonly short: string;
  readonly long: string;
  readonly shortAr: string;
  readonly longAr: string;
}

export interface SilentLetterItem {
  readonly word: string;
  readonly arabic: string;
}

export interface PhonicsDataStructure {
  readonly MAGIC_E: readonly MagicEPair[];
  readonly SILENT_LETTERS: { readonly [key: string]: readonly SilentLetterItem[] };
}
