export const ARTICLES_DATA = {
  A: [
    { word: "Car", arabic: "سيارة", article: "a" },
    { word: "Book", arabic: "كتاب", article: "a" },
    { word: "Girl", arabic: "بنت", article: "a" },
    { word: "Computer", arabic: "كمبيوتر", article: "a" },
  ],
  AN: [
    { word: "Apple", arabic: "تفاحة", article: "an" },
    { word: "Orange", arabic: "برتقالة", article: "an" },
  ],
  UNCOUNTABLE: [
    { word: "Oil", arabic: "زيت", article: "none" },
    { word: "Tea", arabic: "شاي", article: "none" },
    { word: "Sugar", arabic: "سكر", article: "none" },
  ],
} as const;

export const PLURAL_EXAMPLES = [
  { singular: "Book", plural: "Books", arabic: "كتب" },
  { singular: "Car", plural: "Cars", arabic: "سيارات" },
  { singular: "Rabbit", plural: "Rabbits", arabic: "أرانب" },
  { singular: "Cat", plural: "Cats", arabic: "قطط" },
  { singular: "Dog", plural: "Dogs", arabic: "كلاب" },
];

export const PRONOUNS_QUIZ = [
  {
    question: "The train has stopped.",
    answer: "It",
    options: ["He", "It", "We", "They"],
  },
  {
    question: "The dog ran behind the car.",
    answer: "It",
    options: ["He", "She", "It", "They"],
  },
  {
    question: "Sita, Renu and Priya are friends.",
    answer: "They",
    options: ["He", "It", "We", "They"],
  },
  {
    question: "Nitin And I had breakfast.",
    answer: "We",
    options: ["It", "He", "They", "We"],
  },
  {
    question: "My dad is a doctor.",
    answer: "He",
    options: ["They", "It", "He", "She"],
  },
  {
    question: "The man is reading a book.",
    answer: "He",
    options: ["It", "She", "They", "He"],
  },
  {
    question: "Rosy is a bright student.",
    answer: "She",
    options: ["He", "She", "It", "They"],
  },
  {
    question: "Mom, dad and me went to a party.",
    answer: "We",
    options: ["They", "We", "She", "It"],
  },
];

export const VERB_TO_BE_DATA = {
  SINGULAR: [
    { en: "I am", ar: "أنا أكون" },
    { en: "He is", ar: "هو يكون" },
    { en: "She is", ar: "هي تكون" },
    { en: "It is", ar: "هو/هي (لغير العاقل) يكون" },
  ],
  PLURAL: [
    { en: "We are", ar: "نحن نكون" },
    { en: "You are", ar: "أنت/أنتم تكونوا" },
    { en: "They are", ar: "هم يكونوا" },
  ],
  QUIZ: [
    {
      question: "My cat ___ black and white.",
      answer: "is",
      options: ["am", "is", "are"],
    },
    {
      question: "Mum and Dad ___ away.",
      answer: "are",
      options: ["am", "is", "are"],
    },
    { question: "I ___ hungry.", answer: "am", options: ["am", "is", "are"] },
    {
      question: "The sun ___ yellow.",
      answer: "is",
      options: ["am", "is", "are"],
    },
    {
      question: "We ___ from Denmark.",
      answer: "are",
      options: ["am", "is", "are"],
    },
    {
      question: "You ___ in love with Bob.",
      answer: "are",
      options: ["am", "is", "are"],
    },
    {
      question: "It ___ hot today.",
      answer: "is",
      options: ["am", "is", "are"],
    },
    {
      question: "The people ___ noisy.",
      answer: "are",
      options: ["am", "is", "are"],
    },
  ],
};

export const DEMONSTRATIVES_DATA = [
  {
    title: "Near & Far (Singular)",
    items: [
      {
        text: "This",
        translation: "هذا / هذه (للقريب)",
        category: "Near",
        rule: "Singular",
      },
      {
        text: "That",
        translation: "ذلك / تلك (للبعيد)",
        category: "Far",
        rule: "Singular",
      },
    ],
    examples: [
      { text: "This is a piano.", translation: "هذا بيانو." },
      { text: "That is a bird.", translation: "ذلك عصفور." },
      { text: "This is a table.", translation: "هذه طاولة." },
      { text: "That is a butterfly.", translation: "تلك فراشة." },
    ],
  },
  {
    title: "Near & Far (Plural)",
    items: [
      {
        text: "These",
        translation: "هؤلاء / هذه (للقريب)",
        category: "Near",
        rule: "Plural",
      },
      {
        text: "Those",
        translation: "أولئك / تلك (للبعيد)",
        category: "Far",
        rule: "Plural",
      },
    ],
    examples: [
      { text: "These are books.", translation: "هذه كتب." },
      { text: "Those are trees.", translation: "تلك أشجار." },
      { text: "These are candles.", translation: "هذه شموع." },
      { text: "Those are carrots.", translation: "تلك جزر." },
    ],
  },
];

export const PREPOSITIONS_DATA = {
  LIST: [
    { text: "In", translation: "في" },
    { text: "Of", translation: "من / لـ" },
    { text: "Onto", translation: "إلى / على" },
    { text: "Behind", translation: "خلف" },
    { text: "At", translation: "في / عند" },
    { text: "For", translation: "لـ / لأجل" },
    { text: "Above", translation: "فوق" },
    { text: "Under", translation: "تحت" },
    { text: "Into", translation: "إلى داخل" },
    { text: "Over", translation: "فوق / عبر" },
    { text: "From", translation: "من" },
    { text: "Next to", translation: "بجانب" },
    { text: "Across", translation: "عبر / في المقابل" },
  ],
  EXPLANATION_EXAMPLES: [
    {
      en: "Barcelona is the best football team in the world.",
      ar: "برشلونة هو أفضل فريق كرة قدم في العالم.",
    },
    {
      en: "You are the best person in the world.",
      ar: "أنت أفضل شخص في العالم.",
    },
    {
      en: "You are the worst person in the world.",
      ar: "أنت أسوأ شخص في العالم.",
    },
  ],
};
