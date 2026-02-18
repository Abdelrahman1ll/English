// Exercises for Level A1
export const GRAMMAR_TESTS = [
  {
    id: "g1",
    title: "Grammar Basics",
    description: "Check your knowledge of basic sentence structure.",
    type: "multiple-choice",
    questions: [
      {
        question: "___ you from Egypt?",
        options: ["Is", "Am", "Are", "Do"],
        answer: "Are",
      },
      {
        question: "She ___ a doctor.",
        options: ["am", "is", "are", "have"],
        answer: "is",
      },
      {
        question: "I ___ a student.",
        options: ["am", "is", "are", "be"],
        answer: "am",
      },
    ],
  },
  {
    id: "g2",
    title: "Verb To Be",
    description: "Practice using am, is, are correctly.",
    type: "fill-blanks",
    questions: [
      {
        question: "He (___) a good boy.",
        options: ["am", "is", "are"],
        answer: "is",
      },
      {
        question: "They (___) my friends.",
        options: ["am", "is", "are"],
        answer: "are",
      },
    ],
  },
  {
    id: "g3",
    title: "True or False",
    description: "Decide if these grammar rules are correct.",
    type: "true-false",
    questions: [
      {
        question: "We use 'am' with 'He'.",
        options: ["True", "False"],
        answer: "False",
      },
      {
        question: "We use 'is' with 'She'.",
        options: ["True", "False"],
        answer: "True",
      },
    ],
  },
  {
    id: "g4",
    title: "Present Simple",
    description: "Practice basic verb conjugation in the present tense.",
    type: "multiple-choice",
    questions: [
      {
        question: "He ___ basketball every day.",
        options: ["play", "plays", "playing", "played"],
        answer: "plays",
      },
      {
        question: "We ___ to school at 8 AM.",
        options: ["go", "goes", "going", "gone"],
        answer: "go",
      },
      {
        question: "I ___ coffee in the morning.",
        options: ["drink", "drinks", "drinking", "drank"],
        answer: "drink",
      },
    ],
  },
  {
    id: "g5",
    title: "Wh- Questions",
    description: "Learn to use Who, What, Where, and When correctly.",
    type: "multiple-choice",
    questions: [
      {
        question: "___ is your name?",
        options: ["Who", "What", "Where", "When"],
        answer: "What",
      },
      {
        question: "___ do you live?",
        options: ["Who", "What", "Where", "When"],
        answer: "Where",
      },
      {
        question: "___ is your teacher?",
        options: ["Who", "What", "Where", "When"],
        answer: "Who",
      },
      {
        question: "___ is your birthday?",
        options: ["Who", "What", "Where", "When"],
        answer: "When",
      },
    ],
  },
  {
    id: "g6",
    title: "Prepositions of Place",
    description: "Using in, on, at, and under to describe locations.",
    type: "multiple-choice",
    questions: [
      {
        question: "The book is ___ the table.",
        options: ["in", "on", "at", "under"],
        answer: "on",
      },
      {
        question: "I am ___ the park right now.",
        options: ["in", "on", "at", "under"],
        answer: "in",
      },
      {
        question: "The cat is hiding ___ the bed.",
        options: ["in", "on", "at", "under"],
        answer: "under",
      },
      {
        question: "She is waiting ___ the bus stop.",
        options: ["in", "on", "at", "under"],
        answer: "at",
      },
    ],
  },
];

export const VOCAB_TESTS = [
  {
    id: "v1",
    title: "Greetings & Basics",
    description: "How well do you know basic greetings?",
    type: "multiple-choice",
    questions: [
      {
        question: "How do you say 'شكراً' in English?",
        options: ["Please", "Sorry", "Thank you", "Welcome"],
        answer: "Thank you",
      },
      {
        question: "Which of these is a greeting?",
        options: ["Apple", "Hello", "Chair", "Window"],
        answer: "Hello",
      },
    ],
  },
  {
    id: "v2",
    title: "Identify the Mistake",
    description: "Find the error in these sentences.",
    type: "identify-mistake",
    questions: [
      {
        question: "Identify the mistake: 'He am a teacher.'",
        options: ["He", "am", "a", "teacher"],
        answer: "am",
      },
      {
        question: "Identify the mistake: 'They is friends.'",
        options: ["They", "is", "friends"],
        answer: "is",
      },
    ],
  },
  {
    id: "v3",
    title: "Translation Master",
    description: "Translate from Arabic to English.",
    type: "multiple-choice",
    questions: [
      {
        question: "What is 'مدرسة' in English?",
        options: ["Hospital", "Market", "School", "Home"],
        answer: "School",
      },
      {
        question: "What is 'ماء' in English?",
        options: ["Milk", "Juice", "Water", "Tea"],
        answer: "Water",
      },
    ],
  },
  {
    id: "v4",
    title: "Numbers & Time",
    description: "Practice counting and telling time in English.",
    type: "multiple-choice",
    questions: [
      {
        question: "What is 'تِسعة' in English?",
        options: ["Seven", "Eight", "Nine", "Ten"],
        answer: "Nine",
      },
      {
        question: "It is 8:00. It is eight ___.",
        options: ["o'clock", "minute", "hour", "day"],
        answer: "o'clock",
      },
      {
        question: "What number comes after twelve?",
        options: ["Eleven", "Thirteen", "Fourteen", "Twenty"],
        answer: "Thirteen",
      },
    ],
  },
  {
    id: "v5",
    title: "Emotions & Feelings",
    description: "Learn how to describe your mood.",
    type: "multiple-choice",
    questions: [
      {
        question: "How do you say 'سعيد' in English?",
        options: ["Sad", "Happy", "Angry", "Tired"],
        answer: "Happy",
      },
      {
        question: "If you want to sleep, you are ___.",
        options: ["Hungry", "Thirsty", "Tired", "Excited"],
        answer: "Tired",
      },
      {
        question: "How do you say 'حزين' in English?",
        options: ["Glad", "Brave", "Sad", "Strong"],
        answer: "Sad",
      },
    ],
  },
  {
    id: "v6",
    title: "Hobby & Activities",
    description: "Common things people do for fun.",
    type: "multiple-choice",
    questions: [
      {
        question: "I love ___ books.",
        options: ["reading", "cooking", "running", "driving"],
        answer: "reading",
      },
      {
        question: "They are ___ in the pool.",
        options: ["flying", "swimming", "climbing", "jumping"],
        answer: "swimming",
      },
      {
        question: "He is ___ his favorite song.",
        options: ["dancing", "writing", "singing", "eating"],
        answer: "singing",
      },
    ],
  },
];

// For backward compatibility while refactoring
export const EXERCISES_DATA = [...GRAMMAR_TESTS[0].questions];
