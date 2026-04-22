export interface Question {
  readonly question: string;
  readonly options?: readonly string[];
  readonly answer: string;
  readonly note?: string;
}

export interface Test {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly type?: "multiple-choice" | "true-false" | "open-ended";
  readonly questions: readonly Question[];
}
