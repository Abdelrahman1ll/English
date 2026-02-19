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
  },
  {
    id: "a2_plurals",
    title: "Plural Forms",
    description: "Test your knowledge of plural nouns.",
    type: "multiple-choice",
    questions: [
      { question: "What is the plural of 'Star'?", options: ["Stars", "Stares", "Starries"], answer: "Stars" },
      { question: "What is the plural of 'Box'?", options: ["Boxs", "Boxes", "Boxies"], answer: "Boxes" },
      { question: "What is the plural of 'Fox'?", options: ["Foxes", "Foxs", "Foxies"], answer: "Foxes" },
      { question: "What is the plural of 'Match'?", options: ["Matchs", "Matches", "Matchies"], answer: "Matches" },
      { question: "What is the plural of 'Potato'?", options: ["Potatos", "Potatoes", "Potati"], answer: "Potatoes" },
      { question: "What is the plural of 'Fish'?", options: ["Fish", "Fishes", "Fishs"], answer: "Fish" },
      { question: "What is the plural of 'Watch'?", options: ["Watchs", "Watches", "Watchies"], answer: "Watches" },
      { question: "What is the plural of 'Wolf'?", options: ["Wolfs", "Wolves", "Wolfies"], answer: "Wolves" }
    ]
  },
  {
    id: "a2_wh_questions_test",
    title: "Wh- Questions",
    description: "Fill in the blank with the correct Wh- word.",
    type: "multiple-choice",
    questions: [
      { question: "___ are you? (Status/Feeling)", options: ["Who", "How", "Where", "When"], answer: "How" },
      { question: "___ is your name?", options: ["What", "Whose", "Where", "Why"], answer: "What" },
      { question: "___ are you from?", options: ["Where", "What", "When", "Who"], answer: "Where" },
      { question: "___ is that man over there?", options: ["Who", "Whose", "What", "Where"], answer: "Who" },
      { question: "___ is your birthday?", options: ["When", "What", "Where", "Why"], answer: "When" }
    ]
  },
  {
    id: "a2_auxiliaries_test",
    title: "Auxiliaries (Be, Do, Have)",
    description: "Choose the correct auxiliary verb.",
    type: "multiple-choice",
    questions: [
      { question: "I ___ a doctor.", options: ["am", "is", "are"], answer: "am" },
      { question: "She ___ like apples.", options: ["do", "does", "is"], answer: "does" },
      { question: "They ___ a new car.", options: ["has", "have", "are"], answer: "have" },
      { question: "He ___ playing football.", options: ["is", "are", "do"], answer: "is" },
      { question: "We ___ not late.", options: ["am", "is", "are"], answer: "are" },
      { question: "Jennifer ___ beautiful.", options: ["am", "is", "are"], answer: "is" }
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
  },
  {
    id: "a2_phonetics",
    title: "Phonetics: Underlined Sounds",
    description: "Write the correct sound for the underlined letters.",
    type: "fill-blanks",
    questions: [
      { question: "Pre_c_e (Price)", options: ["s", "k"], answer: "s" },
      { question: "Clo_th_ (Cloth)", options: ["θ", "ð"], answer: "θ" },
      { question: "Bre_th_ (Breath)", options: ["θ", "ð"], answer: "θ" },
      { question: "Rou_gh_ (Rough)", options: ["f", "v"], answer: "f" },
      { question: "Se_ss_ion (Session)", options: ["ʃ", "s"], answer: "ʃ" },
      { question: "_X_ylophone", options: ["z", "ks"], answer: "z" },
      { question: "Breathi_ng_", options: ["ŋ", "n"], answer: "ŋ" },
    ]
  },
  {
    id: "a2_be_joke",
    title: "Grammar: Verb to Be Joke",
    description: "Complete the joke with the correct form of 'be'.",
    type: "fill-blanks",
    questions: [
      { question: "Joan and her neighbor ___ talking about their daughters.", options: ["am", "is", "are"], answer: "are" },
      { question: "Joan says, 'My daughter ___ at the university.'", options: ["am", "is", "are"], answer: "is" },
      { question: "She ___ very intelligent. Every time we get a letter from her we have to go to the dictionary.'", options: ["am", "is", "are"], answer: "is" },
      { question: "Her neighbor says, 'You ___ lucky. Every time we hear from our daughter we have to go to the bank.'", options: ["am", "is", "are"], answer: "are" },
    ]
  },
  {
    id: "a2_possessives_test",
    title: "Possessives (Adjectives vs Pronouns)",
    description: "Test your knowledge of 'My' vs 'Mine', etc.",
    type: "multiple-choice",
    questions: [
      { question: "This is ___ car. (It belongs to me)", options: ["my", "mine", "me"], answer: "my" },
      { question: "This car is ___.", options: ["my", "mine", "me"], answer: "mine" },
      { question: "Is this Jennifer's hat? No, it's not ___.", options: ["her", "hers", "she"], answer: "hers" },
      { question: "Are these Julie's and Pat's? No, they're not ___ T-shirts.", options: ["their", "theirs", "them"], answer: "their" },
      { question: "But these socks are ___.", options: ["their", "theirs", "them"], answer: "theirs" }
    ]
  }
];

export const EXERCISES_DATA = [
  ...GRAMMAR_TESTS.flatMap(t => t.questions),
  ...VOCAB_TESTS.flatMap(t => t.questions),
];
