// Exercises for Level A2
export const GRAMMAR_TESTS = [
  {
    id: "a2_self_intro",
    title: "Let me introduce myself",
    description: "Practice introducing yourself with common personal information.",
    type: "fill-blanks",
    questions: [
      {
        question: "Hi, my name's ___.",
        options: [],
        answer: "",
        note: "Write your name here"
      },
      {
        question: "I'm from ___ (country).",
        options: ["Egypt", "USA", "UK", "Canada", "France"],
        answer: "",
        note: "Example: Egypt"
      },
      {
        question: "I live in ___ (city).",
        options: ["Cairo", "Alexandria", "London", "New York"],
        answer: "",
        note: "Example: Cairo"
      },
      {
        question: "I'm ___ years old.",
        options: ["10", "15", "20", "25", "30"],
        answer: "",
        note: "Write your age"
      },
      {
        question: "My birthday is on ___.",
        options: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        answer: "",
        note: "Select your birth month"
      },
      {
        question: "I'm a student at ___.",
        options: [],
        answer: "",
        note: "Write your school or university name"
      },
      {
        question: "My favorite subject is ___.",
        options: ["English", "Chemistry", "Physical Education", "Geometry and Trigonometry", "Reading"],
        answer: "",
        note: "Select or write your favorite subject"
      },
      {
        question: "My favorite sport is ___.",
        options: ["Football", "Basketball", "Tennis", "Swimming"],
        answer: "",
        note: "Select or write your favorite sport"
      },
      {
        question: "There are ___ people in my family.",
        options: ["3", "4", "5", "6"],
        answer: "",
        note: "How many people in your family?"
      },
      {
        question: "My father is a ___ and my mother a ___.",
        options: ["teacher", "doctor", "engineer", "nurse", "businessman", "architect"],
        answer: "",
        note: "Choose jobs for your parents"
      },
      {
        question: "I would like to be a ___ because ___.",
        options: ["doctor", "engineer", "teacher", "artist"],
        answer: "",
        note: "What is your dream job and why?"
      },
      {
        question: "My hobby is ___.",
        options: ["reading", "painting", "playing computer games", "surfing the Internet", "listening to music"],
        answer: "",
        note: "What do you like to do?"
      },
      {
        question: "In my free time, I also like ___.",
        options: ["going to the cinema", "playing with friends", "shopping", "singing", "dancing"],
        answer: "",
        note: "What else do you enjoy?"
      },
      {
        question: "I don't like ___.",
        options: ["horror movies", "waking up early", "spicy food"],
        answer: "",
        note: "Something you dislike"
      },
      {
        question: "My favorite food is ___.",
        options: ["Pizza", "Pasta", "Burger", "Salad"],
        answer: "",
        note: "What do you love to eat?"
      },
      {
        question: "My favorite drink is ___.",
        options: ["Water", "Juice", "Milk", "Tea", "Coffee"],
        answer: "",
        note: "What do you love to drink?"
      },
      {
        question: "My favorite day of the week is ___ because ___.",
        options: ["Friday", "Saturday", "Sunday"],
        answer: "",
        note: "Example: Friday because it's the weekend"
      },
      {
        question: "My favorite month is ___ because ___.",
        options: ["June", "December", "July", "November"],
        answer: "",
        note: "Example: December because it's cold"
      },
      {
        question: "My favorite place is ___ . I like it because ___.",
        options: ["park", "beach", "home", "library"],
        answer: "",
        note: "Where do you like to go?"
      },
      {
        question: "I study English because ___.",
        options: ["I like it a lot", "I think it's important", "I have to", "I'm good at it"],
        answer: "",
        note: "Why are you learning English?"
      }
    ],
  },
  {
    id: "a2_telling_time",
    title: "Telling the Time",
    description: "Practice identifying times on a clock.",
    type: "multiple-choice",
    questions: [
      {
        question: "What time is 3:15?",
        options: ["Quarter past three", "Quarter to three", "Half past three", "Three o'clock"],
        answer: "Quarter past three"
      },
      {
        question: "What time is 3:30?",
        options: ["Half past three", "Quarter past three", "Ten past three", "Three thirty"],
        answer: "Half past three"
      },
      {
        question: "What time is 3:45?",
        options: ["Quarter to four", "Quarter past three", "Quarter past four", "Fifteen to three"],
        answer: "Quarter to four"
      },
      {
        question: "It's 3:55. It is ___.",
        options: ["Five to four", "Five past three", "Ten to four", "Fifty-five past three"],
        answer: "Five to four"
      },
      {
        question: "It's 3:05. It is ___.",
        options: ["Five past three", "Five to three", "Quarter past three", "Three five"],
        answer: "Five past three"
      }
    ]
  },
  {
    id: "a2_personality_vocab",
    title: "Personality Adjectives",
    description: "Check your knowledge of personality terms.",
    type: "multiple-choice",
    questions: [
      {
        question: "What does 'Stubborn' mean?",
        options: ["عنيد", "لطيف", "ذكي", "صريح"],
        answer: "عنيد"
      },
      {
        question: "How do you say 'طيب القلب' in English?",
        options: ["Warm-hearted", "Boast", "Nosy", "Strict"],
        answer: "Warm-hearted"
      },
      {
        question: "What is the meaning of 'Rude'?",
        options: ["وقح", "خجول", "نشط", "مؤهل"],
        answer: "وقح"
      },
      {
        question: "How do you say 'صريح' in English?",
        options: ["Frank", "Nosy", "Boast", "Strict"],
        answer: "Frank"
      }
    ]
  }
];

export const VOCAB_TESTS = [
  {
    id: "a2_family_vocab",
    title: "Family Vocabulary",
    description: "Identify family members.",
    type: "multiple-choice",
    questions: [
      {
        question: "Who is your father's mother?",
        options: ["Grandmother", "Grandfather", "Aunt", "Sister"],
        answer: "Grandmother"
      },
      {
        question: "What is 'حفيدة' in English?",
        options: ["Granddaughter", "Daughter", "Grandmother", "Sister"],
        answer: "Granddaughter"
      }
    ]
  }
];

export const EXERCISES_DATA = [
  ...GRAMMAR_TESTS[0].questions,
];
