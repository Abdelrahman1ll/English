export interface Question {
  id: string;
  type: "fill-in" | "multiple-choice" | "selection" | "writing";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  validationRules?: {
    minSentences?: number;
    keywords?: string[];
  };
}

export interface ExamPage {
  pageNumber: number;
  sections: {
    title: string;
    questions: Question[];
  }[];
}

export const examPages: ExamPage[] = [
  {
    pageNumber: 1,
    sections: [
      {
        title: "I- CHOOSES THE CORRECT ANSWER:",
        questions: [
          {
            id: "q1",
            type: "multiple-choice",
            question: "I [blank] a teacher.",
            options: ["is", "am", "are"],
            correctAnswer: "am",
          },
          {
            id: "q2",
            type: "multiple-choice",
            question: "These [blank] my books.",
            options: ["is", "am", "are"],
            correctAnswer: "are",
          },
          {
            id: "q3",
            type: "multiple-choice",
            question: "He [blank] a new car.",
            options: ["have", "has", "do"],
            correctAnswer: "has",
          },
          {
            id: "q4",
            type: "multiple-choice",
            question: "[blank] are my parents.",
            options: ["Those", "This", "That"],
            correctAnswer: "Those",
          },
          {
            id: "q5",
            type: "multiple-choice",
            question: "We [blank] lunch at 1 PM every day.",
            options: ["do", "have", "has"],
            correctAnswer: "have",
          },
          {
            id: "q6",
            type: "multiple-choice",
            question: "[blank] cat is very cute!",
            options: ["My", "Your", "His"],
            correctAnswer: "My",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    sections: [
      {
        title: "I- CHOOSES THE CORRECT ANSWER: (Continued)",
        questions: [
          {
            id: "q7",
            type: "multiple-choice",
            question: "What [blank] your hobby?",
            options: ["is", "are", "be"],
            correctAnswer: "is",
          },
          {
            id: "q8",
            type: "multiple-choice",
            question: "September is the [blank] month of the year.",
            options: ["eighth", "ninth", "tenth"],
            correctAnswer: "ninth",
          },
          {
            id: "q9",
            type: "multiple-choice",
            question: "There is [blank] apple.",
            options: ["a", "an", "(no article)"],
            correctAnswer: "an",
          },
          {
            id: "q10",
            type: "multiple-choice",
            question: "Ali and Ahmed [blank] brothers.",
            options: ["is", "am", "are"],
            correctAnswer: "are",
          },
          {
            id: "q11",
            type: "multiple-choice",
            question: "I [blank] a birthday party this week.",
            options: ["had", "have", "has"],
            correctAnswer: "have",
          },
          {
            id: "q12",
            type: "multiple-choice",
            question: "[blank] is your uncle.",
            options: ["These", "This", "Those"],
            correctAnswer: "This",
          },
          {
            id: "q13",
            type: "multiple-choice",
            question: "We [blank] a dog at home.",
            options: ["has", "have", "had"],
            correctAnswer: "have",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    sections: [
      {
        title: "I- CHOOSES THE CORRECT ANSWER: (Continued)",
        questions: [
          {
            id: "q14",
            type: "multiple-choice",
            question: 'The opposite of "big" is [blank].',
            options: ["small", "long", "short"],
            correctAnswer: "small",
          },
          {
            id: "q15",
            type: "multiple-choice",
            question: "I like [blank] movies.",
            options: ["a", "an", "(no article)"],
            correctAnswer: "(no article)",
          },
          {
            id: "q16",
            type: "multiple-choice",
            question: "My birthday is in [blank].",
            options: ["Monday", "April", "winter"],
            correctAnswer: "April",
          },
          {
            id: "q17",
            type: "multiple-choice",
            question: "That is [blank] pen.",
            options: ["me", "mine", "my"],
            correctAnswer: "my",
          },
          {
            id: "q18",
            type: "multiple-choice",
            question: "[blank] are my shoes.",
            options: ["This", "Those", "That"],
            correctAnswer: "Those",
          },
          {
            id: "q19",
            type: "multiple-choice",
            question: "[blank] is my best friend.",
            options: ["These", "This", "Those"],
            correctAnswer: "This",
          },
          {
            id: "q20",
            type: "multiple-choice",
            question: "[blank] you like apples?",
            options: ["Do", "Does", "Are"],
            correctAnswer: "Do",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 4,
    sections: [
      {
        title: "I- CHOOSES THE CORRECT ANSWER: (Continued)",
        questions: [
          {
            id: "q21",
            type: "multiple-choice",
            question: "We write with a [blank].",
            options: ["Pencil", "Eraser", "Desk"],
            correctAnswer: "Pencil",
          },
          {
            id: "q22",
            type: "multiple-choice",
            question: "My father's father is my [blank].",
            options: ["Uncle", "Grandfather", "Cousin"],
            correctAnswer: "Grandfather",
          },
          {
            id: "q23",
            type: "multiple-choice",
            question: 'What is the plural of "leaf"?',
            options: ["Leafs", "Leaves", "Leafes"],
            correctAnswer: "Leaves",
          },
          {
            id: "q24",
            type: "multiple-choice",
            question: 'What is the plural of "box"?',
            options: ["Boxes", "Boxies", "Boxs"],
            correctAnswer: "Boxes",
          },
          {
            id: "q25",
            type: "multiple-choice",
            question: 'What is the plural of "mouse"?',
            options: ["Mouses", "Mice", "Mousies"],
            correctAnswer: "Mice",
          },
        ],
      },
      {
        title: "2- FILL IN THE BLANKS:",
        questions: [
          {
            id: "f1",
            type: "multiple-choice",
            question: "This is [blank] pen. (my/mine)",
            options: ["my", "mine"],
            correctAnswer: "my",
          },
          {
            id: "f2",
            type: "multiple-choice",
            question: "I have four [blank]. (child/children)",
            options: ["child", "children"],
            correctAnswer: "children",
          },
          {
            id: "f3",
            type: "multiple-choice",
            question:
              "[blank] is my grandfather standing next to my father. (This/These)",
            options: ["This", "These"],
            correctAnswer: "This",
          },
          {
            id: "f4",
            type: "multiple-choice",
            question: "She [blank] a cat and a bird at home. (have/has)",
            options: ["have", "has"],
            correctAnswer: "has",
          },
          {
            id: "f5",
            type: "multiple-choice",
            question:
              "My birthday is in April, it [blank] after March. (has/is)",
            options: ["has", "is"],
            correctAnswer: "is",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 5,
    sections: [
      {
        title: "3- WRITE :",
        questions: [
          {
            id: "writing-1",
            type: "writing",
            question: "Write 5 sentences about your family and hobbies",
            correctAnswer: "",
            validationRules: {
              minSentences: 5,
              keywords: [
                "family",
                "hobby",
                "hobbies",
                "father",
                "mother",
                "brother",
                "sister",
                "like",
                "love",
                "play",
                "go",
                "is",
                "am",
                "have",
              ],
            },
          },
        ],
      },
    ],
  },
];
