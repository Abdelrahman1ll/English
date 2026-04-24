export interface TimePhrase {
  readonly english: string;
  readonly arabic: string;
}

export interface DialogueLine {
  readonly speaker: string;
  readonly text: string;
  readonly arabic: string;
}

export interface Dialogue {
  readonly id: number;
  readonly title: string;
  readonly dialogue: readonly DialogueLine[];
}
