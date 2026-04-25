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
    question: "Ahmed is a boy. (___ is a boy.)",
    answer: "He",
    options: ["He", "She", "It", "They"],
    translation: "أحمد ولد. (... يكون ولداً.)",
  },
  {
    question: "Mona is a girl. (___ is a girl.)",
    answer: "She",
    options: ["He", "She", "It", "They"],
    translation: "منى بنت. (... تكون بنتاً.)",
  },
  {
    question: "The dog is black. (___ is black.)",
    answer: "It",
    options: ["He", "She", "It", "They"],
    translation: "الكلب أسود. (... يكون أسوداً.)",
  },
  {
    question: "The book is new. (___ is new.)",
    answer: "It",
    options: ["He", "She", "It", "They"],
    translation: "الكتاب جديد. (... يكون جديداً.)",
  },
  {
    question: "My dad and I are here. (___ are here.)",
    answer: "We",
    options: ["I", "We", "They", "He"],
    translation: "والدي وأنا هنا. (... نكون هنا.)",
  },
  {
    question: "Mona and Sarah are sisters. (___ are sisters.)",
    answer: "They",
    options: ["We", "You", "They", "It"],
    translation: "منى وسارة أخوات. (... يكنّ أخوات.)",
  },
  {
    question: "The children are happy. (___ are happy.)",
    answer: "They",
    options: ["He", "She", "It", "They"],
    translation: "الأطفال سعداء. (... يكونون سعداء.)",
  },
  {
    question: "You and Ali are kind. (___ are kind.)",
    answer: "You",
    options: ["We", "They", "You", "I"],
    translation: "أنت وعلي طيبون. (... تكونوا طيبين.)",
  },
  // Added from Exercises book
  {
    question: "These shoes are not __________.",
    answer: "mine",
    options: ["my", "mine"],
    translation: "هذه الأحذية ليست (لي).",
  },
  {
    question: "Everyone should know how to do __________ job.",
    answer: "their",
    options: ["their", "theirs"],
    translation: "يجب على الجميع معرفة كيفية أداء عملهم.",
  },
  {
    question: "I have __________ Problems.",
    answer: "my",
    options: ["my", "mine"],
    translation: "أنا عندي مشاكلي.",
  },
  {
    question: "And you have __________.",
    answer: "yours",
    options: ["your", "yours"],
    translation: "وأنت عندك مشاكلك الخاصة بك.",
  },
  {
    question: "This is __________ car.",
    answer: "our",
    options: ["our", "ours"],
    translation: "هذه سيارتنا.",
  },
  {
    question: "She loves __________ dog.",
    answer: "her",
    options: ["her", "hers"],
    translation: "هي تحب كلبها.",
  },
];

export const VERB_TO_BE_DATA = {
  SINGULAR: [
    { en: "I am", ar: "أنا أكون (am)" },
    { en: "He is", ar: "هو يكون (is)" },
    { en: "She is", ar: "هي تكون (is)" },
    { en: "It is", ar: "هو/هي لغير العاقل يكون (is)" },
  ],
  PLURAL: [
    { en: "We are", ar: "نحن نكون (are)" },
    { en: "You are", ar: "أنت/أنتم تكونوا (are)" },
    { en: "They are", ar: "هم يكونوا (are)" },
  ],
  QUIZ: [
    {
      question: "I ___ a student.",
      answer: "am",
      options: ["am", "is", "are"],
      translation: "أنا (...) طالب.",
    },
    {
      question: "He ___ a doctor.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "هو (...) طبيب.",
    },
    {
      question: "She ___ happy.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "هي (...) سعيدة.",
    },
    {
      question: "It ___ a cat.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "هي (...) قطة.",
    },
    {
      question: "We ___ friends.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "نحن (...) أصدقاء.",
    },
    {
      question: "They ___ playing.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "هم (...) يلعبون.",
    },
    {
      question: "You ___ kind.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "أنت (...) طيب.",
    },
    {
      question: "The sun ___ hot.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "الشمس (...) حارة.",
    },
    // Added from Exercises book
    {
      question: "Joan and her neighbor __________ talking.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "جوان وجارها (يتحدثون).",
    },
    {
      question: "My daughter __________ at the university.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "ابنتي (تكون) في الجامعة.",
    },
    {
      question: "She __________ very intelligent.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "هي (تكون) ذكية جداً.",
    },
    {
      question: "You __________ lucky.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "أنت (تكون) محظوظاً.",
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
    {
      text: "In",
      translation: "في",
      example: "The cat is in the box.",
      exampleTranslation: "القطة في الصندوق.",
    },
    {
      text: "Of",
      translation: "من / لـ",
      example: "A cup of tea.",
      exampleTranslation: "كوب من الشاي.",
    },
    {
      text: "Onto",
      translation: "إلى / على",
      example: "The cat jumped onto the table.",
      exampleTranslation: "القطة قفزت إلى فوق الطاولة.",
    },
    {
      text: "Behind",
      translation: "خلف",
      example: "The ball is behind the chair.",
      exampleTranslation: "الكرة خلف الكرسي.",
    },
    {
      text: "At",
      translation: "في / عند",
      example: "I am at school.",
      exampleTranslation: "أنا في المدرسة.",
    },
    {
      text: "For",
      translation: "لـ / لأجل",
      example: "This gift is for you.",
      exampleTranslation: "هذه الهدية لك.",
    },
    {
      text: "Above",
      translation: "فوق",
      example: "The picture is above the bed.",
      exampleTranslation: "الصورة فوق السرير.",
    },
    {
      text: "Under",
      translation: "تحت",
      example: "The dog is under the table.",
      exampleTranslation: "الكلب تحت الطاولة.",
    },
    {
      text: "Into",
      translation: "إلى داخل",
      example: "He went into the house.",
      exampleTranslation: "دخل إلى داخل المنزل.",
    },
    {
      text: "Over",
      translation: "فوق / عبر",
      example: "The plane flies over the city.",
      exampleTranslation: "الطائرة تطير فوق المدينة.",
    },
    {
      text: "From",
      translation: "من",
      example: "I am from Egypt.",
      exampleTranslation: "أنا من مصر.",
    },
    {
      text: "Next to",
      translation: "بجانب",
      example: "The hospital is next to the park.",
      exampleTranslation: "المستشفى بجانب الحديقة.",
    },
    {
      text: "Across",
      translation: "عبر / في المقابل",
      example: "The shop is across the street.",
      exampleTranslation: "المحل عبر الشارع.",
    },
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
