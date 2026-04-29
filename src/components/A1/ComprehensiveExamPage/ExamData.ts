export interface Question {
  id: string;
  type: "fill-in" | "multiple-choice" | "selection";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
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
        title: "1 - WRITE THE MISSING LETTERS",
        questions: [
          {
            id: "letters-1",
            type: "fill-in",
            question: "A, B, [blank], D, [blank], F",
            correctAnswer: ["C", "E"],
          },
          {
            id: "letters-2",
            type: "fill-in",
            question: "H, I, [blank], K, [blank], [blank], N",
            correctAnswer: ["J", "L", "M"],
          },
        ],
      },
      {
        title: "2 - WRITE THE NEXT NUMBER",
        questions: [
          {
            id: "numbers-1",
            type: "fill-in",
            question: "One -> two -> [blank]",
            correctAnswer: "three",
          },
          {
            id: "numbers-2",
            type: "fill-in",
            question: "Seven -> [blank] -> nine",
            correctAnswer: "eight",
          },
          {
            id: "numbers-3",
            type: "fill-in",
            question: "Four -> [blank] -> six",
            correctAnswer: "five",
          },
        ],
      },
      {
        title: "3 - CHOOSES THE CORRECT ANSWER",
        questions: [
          {
            id: "mc-1",
            type: "multiple-choice",
            question: "What comes after the letter \"G\" in the alphabet?",
            options: ["H", "F", "J", "I"],
            correctAnswer: "H",
          },
          {
            id: "mc-2",
            type: "multiple-choice",
            question: "Which word starts with the same sound as \"cat\"?",
            options: ["Chair", "Cake", "City", "Cent"],
            correctAnswer: "Cake",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    sections: [
      {
        title: "3 - CHOOSES THE CORRECT ANSWER (Continued)",
        questions: [
          {
            id: "mc-3",
            type: "multiple-choice",
            question: "Which of these letters is a vowel?",
            options: ["B", "D", "E", "G"],
            correctAnswer: "E",
          },
          {
            id: "mc-4",
            type: "multiple-choice",
            question: "What is the number 15 in words?",
            options: ["Fifty", "Fifteen", "Five", "Fiftieth"],
            correctAnswer: "Fifteen",
          },
          {
            id: "mc-5",
            type: "multiple-choice",
            question: "____ is my father.",
            options: ["She", "It", "He", "We"],
            correctAnswer: "He",
          },
          {
            id: "mc-6",
            type: "multiple-choice",
            question: "Sara and I are best friends. ____ love to talk every day.",
            options: ["She", "He", "We", "They"],
            correctAnswer: "We",
          },
          {
            id: "mc-7",
            type: "multiple-choice",
            question: "Who helps put out fires?",
            options: ["Chef", "Engineer", "firefighter", "Driver"],
            correctAnswer: "firefighter",
          },
          {
            id: "mc-8",
            type: "multiple-choice",
            question: "What do we use to see?",
            options: ["Hands", "Nose", "Eyes", "Ears"],
            correctAnswer: "Eyes",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    sections: [
      {
        title: "3 - CHOOSES THE CORRECT ANSWER (Continued)",
        questions: [
          {
            id: "mc-9",
            type: "multiple-choice",
            question: "Choose the correct pronoun: \"____ is my sister.\"",
            options: ["He", "It", "She", "We"],
            correctAnswer: "She",
          },
          {
            id: "mc-10",
            type: "multiple-choice",
            question: "Which sentence is correct?",
            options: ["Me is happy.", "I am happy.", "He am happy.", "They is happy."],
            correctAnswer: "I am happy.",
          },
          {
            id: "mc-11",
            type: "multiple-choice",
            question: "\"You ____ my best friend!\"",
            options: ["am", "is", "are", "be"],
            correctAnswer: "are",
          },
          {
            id: "mc-12",
            type: "multiple-choice",
            question: "He ____ a student.",
            options: ["am", "is", "are", "be"],
            correctAnswer: "is",
          },
          {
            id: "mc-13",
            type: "multiple-choice",
            question: "They ____ happy today.",
            options: ["am", "is", "are", "be"],
            correctAnswer: "are",
          },
          {
            id: "mc-14",
            type: "multiple-choice",
            question: "Choose the formal response to \"How are you?\"",
            options: ["Fine, thank you. How about you?", "Not bad. You?", "What's up?", "Good, and you?"],
            correctAnswer: "Fine, thank you. How about you?",
          },
        ],
      },
    ],
  },
  {
    pageNumber: 4,
    sections: [
      {
        title: "3 - CHOOSES THE CORRECT ANSWER (Continued)",
        questions: [
          {
            id: "mc-15",
            type: "multiple-choice",
            question: "A person who helps sick people and works at a hospital is a ____.",
            options: ["artist", "doctor", "singer", "chef"],
            correctAnswer: "doctor",
          },
          {
            id: "mc-16",
            type: "multiple-choice",
            question: "A person who teaches students is a ____.",
            options: ["doctor", "teacher", "driver", "waiter"],
            correctAnswer: "teacher",
          },
          {
            id: "mc-17",
            type: "multiple-choice",
            question: "Choose the correct spelling of the word:",
            options: ["Apel", "Apple", "Aple", "Aplle"],
            correctAnswer: "Apple",
          },
          {
            id: "mc-18",
            type: "multiple-choice",
            question: "What do we use to hear?",
            options: ["Mouth", "Hands", "Ears", "Eyes"],
            correctAnswer: "Ears",
          },
        ],
      },
      {
        title: "4 - CHOOSE THE CORRECT SPELLING OF THE COLORS",
        questions: [
          {
            id: "colors-1",
            type: "selection",
            question: "1. ",
            options: ["Bleu", "Blue", "Bule"],
            correctAnswer: "Blue",
          },
          {
            id: "colors-2",
            type: "selection",
            question: "2. ",
            options: ["Reed", "Read", "Red"],
            correctAnswer: "Red",
          },
          {
            id: "colors-3",
            type: "selection",
            question: "3. ",
            options: ["gren", "green", "geern"],
            correctAnswer: "green",
          },
        ],
      },
    ],
  },
];
