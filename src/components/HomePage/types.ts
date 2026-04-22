export interface Module {
  readonly id: string;
  readonly title: string;
  readonly to: string;
  readonly icon: any;
  readonly category: "words" | "sentences" | "grammar" | "tests";
}

export interface Level {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly color: string;
  readonly modules: readonly Module[];
}
