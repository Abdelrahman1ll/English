import type { GrammarData } from "../../levels";

// --- Grammar Structures ---
export const ARTICLES_DATA: GrammarData["ARTICLES_DATA"] = {
  A: [],
  AN: [],
  UNCOUNTABLE: [],
};

export const PLURAL_EXAMPLES: GrammarData["PLURAL_EXAMPLES"] = [
  { singular: "Person", plural: "People", arabic: "ناس", highlight: "people" },
  { singular: "Man", plural: "Men", arabic: "رجال", highlight: "en" },
  { singular: "Woman", plural: "Women", arabic: "نساء", highlight: "en" },
  { singular: "Child", plural: "Children", arabic: "أطفال", highlight: "ren" },
  { singular: "Tooth", plural: "Teeth", arabic: "أسنان", highlight: "eeth" },
  { singular: "Cross", plural: "Crosses", arabic: "صلبان", highlight: "es" },
  { singular: "Boy", plural: "Boys", arabic: "أولاد", highlight: "s" },
  { singular: "City", plural: "Cities", arabic: "مدن", highlight: "ies" },
  { singular: "Zoo", plural: "Zoos", arabic: "حدائق حيوان", highlight: "s" },
  { singular: "Fax", plural: "Faxes", arabic: "فاكسات", highlight: "es" },
  { singular: "Bear", plural: "Bears", arabic: "دببة", highlight: "s" },
  { singular: "Tool", plural: "Tools", arabic: "أدوات", highlight: "s" },
  { singular: "Key", plural: "Keys", arabic: "مفاتيح", highlight: "s" },
  { singular: "Dish", plural: "Dishes", arabic: "أطياق", highlight: "es" },
  { singular: "Loaf", plural: "Loaves", arabic: "أرغفة", highlight: "ves" },
  { singular: "Radio", plural: "Radios", arabic: "راديو هات", highlight: "s" },
  { singular: "Thief", plural: "Thieves", arabic: "لصوص", highlight: "ves" },
  { singular: "Smile", plural: "Smiles", arabic: "ابتسامات", highlight: "s" },
  { singular: "Show", plural: "Shows", arabic: "عروض", highlight: "s" },
  { singular: "Knife", plural: "Knives", arabic: "سكاكين", highlight: "ves" },
  { singular: "Potato", plural: "Potatoes", arabic: "بطاطس", highlight: "es" },
  { singular: "Leaf", plural: "Leaves", arabic: "أوراق شجر", highlight: "ves" },
  {
    singular: "Match",
    plural: "Matches",
    arabic: "مباريات / كبريت",
    highlight: "es",
  },
  { singular: "Star", plural: "Stars", arabic: "نجوم", highlight: "s" },
  { singular: "Couch", plural: "Couches", arabic: "أرائك", highlight: "es" },
  { singular: "Bus", plural: "Buses", arabic: "حافلات", highlight: "es" },
  { singular: "Fox", plural: "Foxes", arabic: "ثعالب", highlight: "es" },
  { singular: "Buzz", plural: "Buzzes", arabic: "طنين", highlight: "es" },
  { singular: "Tree", plural: "Trees", arabic: "أشجار", highlight: "s" },
  { singular: "Car", plural: "Cars", arabic: "سيارات", highlight: "s" },
  { singular: "Box", plural: "Boxes", arabic: "صناديق", highlight: "es" },
  { singular: "Animal", plural: "Animals", arabic: "حيوان", highlight: "s" },
  { singular: "Bush", plural: "Bushes", arabic: "شجيرات", highlight: "es" },
  { singular: "Zero", plural: "Zeros", arabic: "أصفار", highlight: "s" },
  {
    singular: "Pencil",
    plural: "Pencils",
    arabic: "أقلام رصاص",
    highlight: "s",
  },
  { singular: "Fish", plural: "Fish", arabic: "سمك", highlight: "" },
  { singular: "Class", plural: "Classes", arabic: "فصول", highlight: "es" },
  { singular: "Game", plural: "Games", arabic: "ألعاب", highlight: "s" },
  { singular: "Hand", plural: "Hands", arabic: "أيدٍ", highlight: "s" },
  { singular: "Camel", plural: "Camels", arabic: "جمال", highlight: "s" },
  { singular: "Wish", plural: "Wishes", arabic: "أمنيات", highlight: "es" },
  { singular: "Brush", plural: "Brushes", arabic: "فراش", highlight: "es" },
  { singular: "Dress", plural: "Dresses", arabic: "فساتين", highlight: "es" },
  { singular: "Peach", plural: "Peaches", arabic: "خوخ", highlight: "es" },
  { singular: "Watch", plural: "Watches", arabic: "ساعات يد", highlight: "es" },
  {
    singular: "Topaz",
    plural: "Topazes",
    arabic: "أحجار توباز",
    highlight: "es",
  },
  { singular: "Glass", plural: "Glasses", arabic: "أكواب", highlight: "es" },
  { singular: "Hiss", plural: "Hisses", arabic: "فحيح", highlight: "es" },
  { singular: "Lion", plural: "Lions", arabic: "أسود", highlight: "s" },
];

export const PLURAL_RULES: GrammarData["PLURAL_RULES"] = [
  {
    title: "Regular Noun",
    rule: "add -S",
    arabicRule: "إضافة S للكلمات المنتظمة",
    examples: [
      { singular: "apple", plural: "apples", arabic: "تفاح", highlight: "s" },
      { singular: "bat", plural: "bats", arabic: "مضرب/خفاش", highlight: "s" },
      { singular: "car", plural: "cars", arabic: "سيارات", highlight: "s" },
      { singular: "frog", plural: "frogs", arabic: "ضفادع", highlight: "s" },
      {
        singular: "kite",
        plural: "kites",
        arabic: "طائرات ورقية",
        highlight: "s",
      },
    ],
  },
  {
    title: "Ends in s, ch, sh, x or z",
    rule: "add -ES",
    arabicRule: "إضافة ES إذا انتهت الكلمة بـ s, ch, sh, x, z",
    examples: [
      { singular: "bus", plural: "buses", arabic: "حافلة", highlight: "es" },
      {
        singular: "match",
        plural: "matches",
        arabic: "مباراة/كبريت",
        highlight: "es",
      },
      { singular: "wish", plural: "wishes", arabic: "أمنية", highlight: "es" },
      { singular: "fox", plural: "foxes", arabic: "ثعلب", highlight: "es" },
      {
        singular: "quiz",
        plural: "quizzes",
        arabic: "اختبار قصير",
        highlight: "zes",
      },
    ],
  },
  {
    title: "Ends in f or fe",
    rule: "remove f/fe add -VES",
    arabicRule: "حذف f/fe وإضافة VES",
    examples: [
      { singular: "calf", plural: "calves", arabic: "عجل", highlight: "ves" },
      { singular: "wolf", plural: "wolves", arabic: "ذئب", highlight: "ves" },
      { singular: "knife", plural: "knives", arabic: "سكين", highlight: "ves" },
      {
        singular: "roof",
        plural: "roofs",
        arabic: "سقف (استثناء)",
        highlight: "s",
      },
      {
        singular: "cliff",
        plural: "cliffs",
        arabic: "منحدر (استثناء)",
        highlight: "s",
      },
    ],
  },
  {
    title: "Ends in vowel + y",
    rule: "add -S",
    arabicRule: "إضافة S إذا انتهت بـ حرف متحرك + y",
    examples: [
      { singular: "boy", plural: "boys", arabic: "ولد", highlight: "s" },
      { singular: "key", plural: "keys", arabic: "مفتاح", highlight: "s" },
      { singular: "day", plural: "days", arabic: "يوم", highlight: "s" },
      { singular: "toy", plural: "toys", arabic: "لعبة", highlight: "s" },
      { singular: "monkey", plural: "monkeys", arabic: "قرد", highlight: "s" },
    ],
  },
  {
    title: "Ends in consonant + y",
    rule: "remove y add -ies",
    arabicRule: "حذف y وإضافة ies إذا سبقها حرف ساكن",
    examples: [
      {
        singular: "baby",
        plural: "babies",
        arabic: "طفل رضيع",
        highlight: "ies",
      },
      { singular: "story", plural: "stories", arabic: "قصة", highlight: "ies" },
      { singular: "lady", plural: "ladies", arabic: "سيدة", highlight: "ies" },
      {
        singular: "party",
        plural: "parties",
        arabic: "حفلة",
        highlight: "ies",
      },
      {
        singular: "country",
        plural: "countries",
        arabic: "دولة",
        highlight: "ies",
      },
    ],
  },
  {
    title: "Irregular Nouns",
    rule: "the rule breakers",
    arabicRule: "الأسماء الشاذة (تتغير الكلمة)",
    examples: [
      { singular: "man", plural: "men", arabic: "رجل", highlight: "en" },
      { singular: "woman", plural: "women", arabic: "امرأة", highlight: "en" },
      {
        singular: "child",
        plural: "children",
        arabic: "طفل",
        highlight: "ren",
      },
      { singular: "tooth", plural: "teeth", arabic: "سن", highlight: "eeth" },
      { singular: "foot", plural: "feet", arabic: "قدم", highlight: "eet" },
      {
        singular: "person",
        plural: "people",
        arabic: "شخص",
        highlight: "people",
      },
    ],
  },
  {
    title: "Ends in vowel + o",
    rule: "add -S",
    arabicRule: "إضافة S إذا انتهت بـ حرف متحرك + o",
    examples: [
      {
        singular: "zoo",
        plural: "zoos",
        arabic: "حديقة حيوان",
        highlight: "s",
      },
      {
        singular: "kangaroo",
        plural: "kangaroos",
        arabic: "كنغر",
        highlight: "s",
      },
      { singular: "video", plural: "videos", arabic: "فيديو", highlight: "s" },
      { singular: "radio", plural: "radios", arabic: "راديو", highlight: "s" },
      {
        singular: "stereo",
        plural: "stereos",
        arabic: "ستيريو",
        highlight: "s",
      },
    ],
  },
  {
    title: "Ends in consonant + o",
    rule: "add -ES",
    arabicRule: "إضافة ES إذا انتهت بـ حرف ساكن + o",
    examples: [
      {
        singular: "tomato",
        plural: "tomatoes",
        arabic: "طماطم",
        highlight: "es",
      },
      {
        singular: "potato",
        plural: "potatoes",
        arabic: "بطاطس",
        highlight: "es",
      },
      { singular: "hero", plural: "heroes", arabic: "بطل", highlight: "es" },
      { singular: "echo", plural: "echoes", arabic: "صدى", highlight: "es" },
      {
        singular: "photo",
        plural: "photos",
        arabic: "صورة (استثناء)",
        highlight: "s",
      },
      {
        singular: "piano",
        plural: "pianos",
        arabic: "بيانو (استثناء)",
        highlight: "s",
      },
    ],
  },
  {
    title: "No Change",
    rule: "spelling remains same",
    arabicRule: "لا تتغير عند الجمع",
    examples: [
      {
        singular: "sheep",
        plural: "sheep",
        arabic: "خروف/أغنام",
        highlight: "",
      },
      { singular: "deer", plural: "deer", arabic: "غزال", highlight: "" },
      { singular: "fish", plural: "fish", arabic: "سمكة", highlight: "" },
      { singular: "swine", plural: "swine", arabic: "خنزير", highlight: "" },
    ],
  },
];

export const PRONOUNS_DATA = {
  SUBJECT: [
    { en: "I", ar: "أنا" },
    { en: "He", ar: "هو" },
    { en: "She", ar: "هي" },
    { en: "It", ar: "هو/هي (لغير العاقل)" },
    { en: "You", ar: "أنت/أنتم" },
    { en: "We", ar: "نحن" },
    { en: "They", ar: "هم" },
  ],
  OBJECT: [
    { en: "Me", ar: "أنا (مفعول به)" },
    { en: "Him", ar: "هو (مفعول به)" },
    { en: "Her", ar: "هي (مفعول به)" },
    { en: "It", ar: "هو/هي (مفعول به لغير العاقل)" },
    { en: "You", ar: "أنت/أنتم (مفعول به)" },
    { en: "Us", ar: "نحن (مفعول به)" },
    { en: "Them", ar: "هم (مفعول به)" },
  ],
  POSSESSIVE_ADJECTIVES: [
    { en: "My", ar: "لي (ملكية)" },
    { en: "His", ar: "له (ملكية)" },
    { en: "Her", ar: "لها (ملكية)" },
    { en: "Its", ar: "له/لها (ملكية لغير العاقل)" },
    { en: "Your", ar: "لك (ملكية)" },
    { en: "Our", ar: "لنا (ملكية)" },
    { en: "Their", ar: "لهم (ملكية)" },
  ],
  POSSESSIVE_PRONOUNS: [
    { en: "Mine", ar: "ملكي" },
    { en: "His", ar: "ملكه" },
    { en: "Hers", ar: "ملكها" },
    { en: "Its", ar: "ملكه/ملكها (لغير العاقل)" },
    { en: "Yours", ar: "ملكك" },
    { en: "Ours", ar: "ملكنا" },
    { en: "Theirs", ar: "ملكهم" },
  ],
};

export const PRONOUNS_QUIZ: GrammarData["PRONOUNS_QUIZ"] = [
  {
    question: "I love Mona. I love ____.",
    answer: "her",
    options: ["her", "him", "me"],
    translation: "أنا أحب منى. أنا أحب (ـها).",
  },
  {
    question: "This is ____ car. (It belongs to me)",
    answer: "my",
    options: ["my", "his", "your"],
    translation: "هذه (...) سيارتي.",
  },
  {
    question: "We are friends. This is ____ house.",
    answer: "our",
    options: ["my", "our", "their"],
    translation: "نحن أصدقاء. هذا هو منزلـ(...)ـنا.",
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

export const AUXILIARIES_DATA = {
  BE: {
    I: "am",
    "We, They, You": "are",
    "He, She, It": "is",
  },
  DO: {
    I: "do",
    "We, They, You": "do",
    "He, She, It": "does",
  },
  HAVE: {
    I: "have",
    "We, They, You": "have",
    "He, She, It": "has",
  },
};

export const WH_QUESTIONS_DATA = [
  { word: "Who", usage: "for people", arabic: "من (للأشخاص)" },
  { word: "Where", usage: "for places", arabic: "أين (للأماكن)" },
  { word: "When", usage: "for time", arabic: "متى (للزمان)" },
  { word: "What", usage: "for details", arabic: "ما/ماذا (للتفاصيل)" },
  { word: "Why", usage: "for reasons", arabic: "لماذا (للأسباب)" },
];

export const VERB_TO_BE_DATA: GrammarData["VERB_TO_BE_DATA"] = {
  SINGULAR: [
    { en: "I am", ar: "أنا أكون" },
    { en: "I am not / I'm not", ar: "أنا لا أكون" },
    { en: "Am I...?", ar: "هل أنا...؟" },
    { en: "He is", ar: "هو يكون" },
    { en: "He is not / He isn't", ar: "هو لا يكون" },
    { en: "Is he...?", ar: "هل هو...؟" },
    { en: "She is", ar: "هي تكون" },
    { en: "She is not / She isn't", ar: "هي لا تكون" },
    { en: "Is she...?", ar: "هل هي...؟" },
    { en: "It is", ar: "هو/هي (لغير العاقل) يكون" },
    { en: "It is not / It isn't", ar: "هو/هي لا يكون" },
    { en: "Is it...?", ar: "هل هو/هي...؟" },
  ],
  PLURAL: [
    { en: "We are", ar: "نحن نكون" },
    { en: "We are not / We aren't", ar: "نحن لا نكون" },
    { en: "Are we...?", ar: "هل نحن...؟" },
    { en: "You are", ar: "أنت/أنتم تكون" },
    { en: "You are not / You aren't", ar: "أنت/أنتم لا تكون" },
    { en: "Are you...?", ar: "هل أنت/أنتم...؟" },
    { en: "They are", ar: "هم يكونون" },
    { en: "They are not / They aren't", ar: "هم لا يكونون" },
    { en: "Are they...?", ar: "هل هم...؟" },
  ],
  QUIZ: [
    {
      question: "I ____ a doctor.",
      answer: "am",
      options: ["am", "is", "are"],
      translation: "أنا (...) طبيب.",
    },
    {
      question: "She ____ beautiful.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "هي (...) جميلة.",
    },
    {
      question: "They ____ my friends.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "هم (...) أصدقائي.",
    },
    {
      question: "Ahmed ____ tall.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "أحمد (...) طويل.",
    },
    {
      question: "He ____ not happy.",
      answer: "is",
      options: ["am", "is", "are"],
      translation: "هو (...) ليس سعيداً.",
    },
    {
      question: "We ____ not ready.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "نحن (...) لسنا مستعدين.",
    },
    {
      question: "You ____ not stupid.",
      answer: "are",
      options: ["am", "is", "are"],
      translation: "أنت (...) لست غبياً.",
    },
    {
      question: "____ she fine?",
      answer: "Is",
      options: ["Am", "Is", "Are"],
      translation: "هل (...) هي بخير؟",
    },
    {
      question: "____ they stupid?",
      answer: "Are",
      options: ["Am", "Is", "Are"],
      translation: "هل (...) هم أغبياء؟",
    },
    {
      question: "____ you short?",
      answer: "Are",
      options: ["Am", "Is", "Are"],
      translation: "هل (...) أنت قصير؟",
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

export const DEMONSTRATIVES_DATA: GrammarData["DEMONSTRATIVES_DATA"] = [
  {
    title: "Near (قريب)",
    items: [
      {
        text: "This",
        translation: "هذا / هذه (للمفرد للقريب)",
        category: "Singular",
        rule: "Near",
      },
      {
        text: "These",
        translation: "هؤلاء / هذه (للجمع للقريب)",
        category: "Plural",
        rule: "Near",
      },
    ],
    examples: [
      { text: "This is a notebook.", translation: "هذا دفتر ملاحظات." },
      { text: "This is my friend.", translation: "هذا صديقي." },
      { text: "These are balls.", translation: "هذه كرات." },
      { text: "These dogs are big.", translation: "هذه الكلاب كبيرة." },
    ],
  },
  {
    title: "Far (بعيد)",
    items: [
      {
        text: "That",
        translation: "ذلك / تلك (للمفرد للبعيد)",
        category: "Singular",
        rule: "Far",
      },
      {
        text: "Those",
        translation: "أولئك / تلك (للجمع للبعيد)",
        category: "Plural",
        rule: "Far",
      },
    ],
    examples: [
      { text: "That is an apple.", translation: "تلك تفاحة." },
      {
        text: "That clock is on the wall.",
        translation: "تلك الساعة على الحائط.",
      },
      { text: "Those are monkeys.", translation: "تلك قرود." },
      { text: "Those birds are beautiful.", translation: "تلك الطيور جميلة." },
    ],
  },
];

// Adding BASICS_DATA for the BasicsPage UI
export const BASICS_DATA = {
  ARTICLES: [
    {
      word: "A",
      arabic: "أداة نكرة (للمفرد)",
      example: "A car.",
      exampleArabic: "سيارة.",
    },
    {
      word: "An",
      arabic: "أداة نكرة (للمفرد المبدوء بمتحرك)",
      example: "An apple.",
      exampleArabic: "تفاحة.",
    },
  ],
  PRONOUNS: PRONOUNS_DATA.SUBJECT.map((p) => ({
    word: p.en,
    arabic: p.ar,
    example: `${p.en} is a student.`,
    exampleArabic: `${p.ar} طالب/طالبة.`,
  })),
  POSSESSIVES: PRONOUNS_DATA.POSSESSIVE_ADJECTIVES.map((p) => {
    const suffixes: Record<string, string> = {
      My: "ي", His: "ه", Her: "ها", Its: "ه", Your: "ك", Our: "نا", Their: "هم"
    };
    return {
      word: p.en,
      arabic: p.ar,
      example: `This is ${p.en.toLowerCase()} book.`,
      exampleArabic: `هذا كتاب${suffixes[p.en] || ""}.`,
    };
  }),
  DEMONSTRATIVES: DEMONSTRATIVES_DATA.flatMap((g) => g.items).map((i) => ({
    word: i.text,
    arabic: i.translation,
    example:
      DEMONSTRATIVES_DATA.find((g) => g.items.includes(i))?.examples.find((e) =>
        e.text.includes(i.text),
      )?.text || "",
    exampleArabic:
      DEMONSTRATIVES_DATA.find((g) => g.items.includes(i))?.examples.find((e) =>
        e.text.includes(i.text),
      )?.translation || "",
  })),
  AUXILIARIES: [
    {
      word: "Be (am/is/are)",
      arabic: "فعل يكون (أنا أكون / هو يكون / نحن نكون)",
      example: "I am a teacher.",
      exampleArabic: "أنا معلم.",
    },
    {
      word: "Do (do/does)",
      arabic: "فعل يفعل (للممارسة والعادات)",
      example: "I do my homework.",
      exampleArabic: "أنا أؤدي واجبي المنزلي.",
    },
    {
      word: "Have (have/has)",
      arabic: "فعل يملك (للملكية)",
      example: "He has a big car.",
      exampleArabic: "لديه سيارة كبيرة.",
    },
  ],
  WH_QUESTIONS: WH_QUESTIONS_DATA.map((q) => ({
    word: q.word,
    arabic: q.arabic,
    example: `${q.word} is your name?`,
    exampleArabic: `ما هو اسمك؟`,
  })),
  POSSESSIVE_PRONOUNS: PRONOUNS_DATA.POSSESSIVE_PRONOUNS.map((p) => ({
    word: p.en,
    arabic: p.ar,
    example: `This book is ${p.en.toLowerCase()}.`,
    exampleArabic: `هذا الكتاب ${p.ar}.`,
  })),
  QUIZ: [
    ...PRONOUNS_QUIZ,
    ...VERB_TO_BE_DATA.QUIZ,
    {
      question: "____ the shop open?",
      answer: "Is",
      options: ["Is", "Are", "Am"],
    },
    {
      question: "____ the shops open?",
      answer: "Are",
      options: ["Is", "Are", "Am"],
    },
    {
      question: "My hands ____ cold.",
      answer: "are",
      options: ["is", "are", "am"],
    },
    {
      question: "My nose ____ cold.",
      answer: "is",
      options: ["is", "are", "am"],
    },
    {
      question: "Where ____ my glasses?",
      answer: "are",
      options: ["is", "are", "am"],
    },
    {
      question: "The children ____ happy.",
      answer: "are",
      options: ["is", "are", "am"],
    },
    {
      question: "Your jeans ____ dirty.",
      answer: "are",
      options: ["is", "are", "am"],
    },
    {
      question: "Who ____ those people?",
      answer: "are",
      options: ["is", "are", "am"],
    },
    {
      question: "Mice ____ small animals.",
      answer: "are",
      options: ["is", "are", "am"],
    },
  ],
  PLURAL_RULES: PLURAL_RULES,
};

export const THERE_IS_DATA = {
  SINGULAR: { en: "There is", ar: "يوجد (للمفرد)" },
  PLURAL: { en: "There are", ar: "يوجد (للجمع)" },
  EXAMPLES: [
    {
      en: "There are five chairs in that room.",
      ar: "يوجد خمسة كراسي في تلك الغرفة.",
    },
    {
      en: "There are nine pins in that bag.",
      ar: "يوجد تسعة دبابيس في تلك الحقيبة.",
    },
    { en: "There is a cat on the table.", ar: "يوجد قطة على الطاولة." },
  ],
};

export const PREPOSITIONS_DATA: GrammarData["PREPOSITIONS_DATA"] = {
  LIST: [
    { text: "At", translation: "في (للوقت المحدد: at 5 PM)" },
    { text: "In", translation: "في (للشهور والسنوات: in June)" },
    { text: "On", translation: "في (للأيام: on Monday)" },
    { text: "Before", translation: "قبل" },
    { text: "After", translation: "بعد" },
    { text: "During", translation: "خلال" },
  ],
  EXPLANATION_EXAMPLES: [
    { en: "I wake up at 7 o'clock.", ar: "أستيقظ في الساعة السابعة." },
    { en: "My birthday is in August.", ar: "عيد ميلادي في أغسطس." },
    { en: "I play football on Fridays.", ar: "ألعب كرة القدم أيام الجمعة." },
    { en: "Wash your hands before eating.", ar: "اغسل يديك قبل الأكل." },
  ],
};
