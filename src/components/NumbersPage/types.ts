export interface NumberItem {
  readonly digit: string | number;
  readonly word: string;
  readonly arabic?: string;
}

export interface NumbersDataStructure {
  readonly BASICS: readonly NumberItem[];
  readonly TEENS: readonly NumberItem[];
  readonly TENS: readonly NumberItem[];
  readonly ORDINALS: readonly NumberItem[];
  readonly BIG: readonly NumberItem[];
}
