import type { GrammarData } from "../../levels";



// --- Grammar Structures ---
export const ARTICLES_DATA: GrammarData["ARTICLES_DATA"] = {
  A: [],
  AN: [],
  UNCOUNTABLE: [],
};

export const PLURAL_EXAMPLES: GrammarData["PLURAL_EXAMPLES"] = [
  { singular: "Person", plural: "People", arabic: "ناس" },
  { singular: "Man", plural: "Men", arabic: "رجال" },
  { singular: "Woman", plural: "Women", arabic: "نساء" },
  { singular: "Child", plural: "Children", arabic: "أطفال" },
  { singular: "Tooth", plural: "Teeth", arabic: "أسنان" },
  { singular: "Cross", plural: "Crosses", arabic: "صلبان" },
  { singular: "Boy", plural: "Boys", arabic: "أولاد" },
  { singular: "City", plural: "Cities", arabic: "مدن" },
  { singular: "Zoo", plural: "Zoos", arabic: "حدائق حيوان" },
  { singular: "Fax", plural: "Faxes", arabic: "فاكسات" },
  { singular: "Bear", plural: "Bears", arabic: "دببة" },
  { singular: "Tool", plural: "Tools", arabic: "أدوات" },
  { singular: "Key", plural: "Keys", arabic: "مفاتيح" },
  { singular: "Dish", plural: "Dishes", arabic: "أطباق" },
  { singular: "Loaf", plural: "Loaves", arabic: "أرغفة" },
  { singular: "Radio", plural: "Radios", arabic: "راديو هات" },
  { singular: "Thief", plural: "Thieves", arabic: "لصوص" },
  { singular: "Smile", plural: "Smiles", arabic: "ابتسامات" },
  { singular: "Show", plural: "Shows", arabic: "عروض" },
  { singular: "Knife", plural: "Knives", arabic: "سكاكين" },
  { singular: "Potato", plural: "Potatoes", arabic: "بطاطس" },
  { singular: "Leaf", plural: "Leaves", arabic: "أوراق شجر" },
  { singular: "Match", plural: "Matches", arabic: "مباريات / كبريت" },
  { singular: "Star", plural: "Stars", arabic: "نجوم" },
  { singular: "Couch", plural: "Couches", arabic: "أرائك" },
  { singular: "Bus", plural: "Buses", arabic: "حافلات" },
  { singular: "Fox", plural: "Foxes", arabic: "ثعالب" },
  { singular: "Buzz", plural: "Buzzes", arabic: "طنين" },
  { singular: "Tree", plural: "Trees", arabic: "أشجار" },
  { singular: "Car", plural: "Cars", arabic: "سيارات" },
  { singular: "Box", plural: "Boxes", arabic: "صناديق" },
  { singular: "Animal", plural: "Animals", arabic: "حيوان" },
  { singular: "Bush", plural: "Bushes", arabic: "شجيرات" },
  { singular: "Zero", plural: "Zeros", arabic: "أصفار" },
  { singular: "Pencil", plural: "Pencils", arabic: "أقلام رصاص" },
  { singular: "Fish", plural: "Fish", arabic: "سمك" },
  { singular: "Class", plural: "Classes", arabic: "فصول" },
  { singular: "Game", plural: "Games", arabic: "ألعاب" },
  { singular: "Hand", plural: "Hands", arabic: "أيدٍ" },
  { singular: "Camel", plural: "Camels", arabic: "جمال" },
  { singular: "Wish", plural: "Wishes", arabic: "أمنيات" },
  { singular: "Brush", plural: "Brushes", arabic: "فراش" },
  { singular: "Dress", plural: "Dresses", arabic: "فساتين" },
  { singular: "Peach", plural: "Peaches", arabic: "خوخ" },
  { singular: "Watch", plural: "Watches", arabic: "ساعات يد" },
  { singular: "Topaz", plural: "Topazes", arabic: "أحجار توباز" },
  { singular: "Glass", plural: "Glasses", arabic: "أكواب" },
  { singular: "Hiss", plural: "Hisses", arabic: "فحيح" },
  { singular: "Lion", plural: "Lions", arabic: "أسود" },
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
  },
  {
    question: "This is ____ car. (It belongs to me)",
    answer: "my",
    options: ["my", "his", "your"],
  },
  {
    question: "We are friends. This is ____ house.",
    answer: "our",
    options: ["my", "our", "their"],
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
    },
    {
      question: "She ____ beautiful.",
      answer: "is",
      options: ["am", "is", "are"],
    },
    {
      question: "They ____ my friends.",
      answer: "are",
      options: ["am", "is", "are"],
    },
    {
      question: "Ahmed ____ tall.",
      answer: "is",
      options: ["am", "is", "are"],
    },
    {
      question: "He ____ not happy.",
      answer: "is",
      options: ["am", "is", "are"],
    },
    {
      question: "We ____ not ready.",
      answer: "are",
      options: ["am", "is", "are"],
    },
    {
      question: "You ____ not stupid.",
      answer: "are",
      options: ["am", "is", "are"],
    },
    {
      question: "____ she fine?",
      answer: "Is",
      options: ["Am", "Is", "Are"],
    },
    {
      question: "____ they stupid?",
      answer: "Are",
      options: ["Am", "Is", "Are"],
    },
    {
      question: "____ you short?",
      answer: "Are",
      options: ["Am", "Is", "Are"],
    },
  ],
};

export const DEMONSTRATIVES_DATA: GrammarData["DEMONSTRATIVES_DATA"] = [
  {
    title: "Near (قريب)",
    items: [
      { text: "This", translation: "هذا / هذه (للمفرد للقريب)", category: "Singular", rule: "Near" },
      { text: "These", translation: "هؤلاء / هذه (للجمع للقريب)", category: "Plural", rule: "Near" },
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
      { text: "That", translation: "ذلك / تلك (للمفرد للبعيد)", category: "Singular", rule: "Far" },
      { text: "Those", translation: "أولئك / تلك (للجمع للبعيد)", category: "Plural", rule: "Far" },
    ],
    examples: [
      { text: "That is an apple.", translation: "تلك تفاحة." },
      { text: "That clock is on the wall.", translation: "تلك الساعة على الحائط." },
      { text: "Those are monkeys.", translation: "تلك قرود." },
      { text: "Those birds are beautiful.", translation: "تلك الطيور جميلة." },
    ],
  },
];

// Adding BASICS_DATA for the BasicsPage UI
export const BASICS_DATA = {
  ARTICLES: [
    { word: "A", arabic: "أداة نكرة (للمفرد)", example: "A car.", exampleArabic: "سيارة." },
    { word: "An", arabic: "أداة نكرة (للمفرد المبدوء بمتحرك)", example: "An apple.", exampleArabic: "تفاحة." },
  ],
  PRONOUNS: PRONOUNS_DATA.SUBJECT.map((p) => ({
    word: p.en,
    arabic: p.ar,
    example: `${p.en} is a student.`,
    exampleArabic: `${p.ar} طالب/طالبة.`,
  })),
  POSSESSIVES: PRONOUNS_DATA.POSSESSIVE_ADJECTIVES.map((p) => ({
    word: p.en,
    arabic: p.ar,
    example: `This is ${p.en.toLowerCase()} book.`,
    exampleArabic: `هذا كتاب${p.ar.replace("لي", "ي").replace("له", "ه").replace("لها", "ها").replace("لك", "ك").replace("لنا", "نا").replace("لهم", "هم")}.`,
  })),
  DEMONSTRATIVES: DEMONSTRATIVES_DATA.flatMap(g => g.items).map(i => ({
    word: i.text,
    arabic: i.translation,
    example: DEMONSTRATIVES_DATA.find(g => g.items.includes(i))?.examples.find(e => e.text.includes(i.text))?.text || "",
    exampleArabic: DEMONSTRATIVES_DATA.find(g => g.items.includes(i))?.examples.find(e => e.text.includes(i.text))?.translation || "",
  })),
  AUXILIARIES: [
    { word: "Be (am/is/are)", arabic: "فعل يكون (أنا أكون / هو يكون / نحن نكون)", example: "I am a teacher.", exampleArabic: "أنا معلم." },
    { word: "Do (do/does)", arabic: "فعل يفعل (للممارسة والعادات)", example: "I do my homework.", exampleArabic: "أنا أؤدي واجبي المنزلي." },
    { word: "Have (have/has)", arabic: "فعل يملك (للملكية)", example: "He has a big car.", exampleArabic: "لديه سيارة كبيرة." },
  ],
  WH_QUESTIONS: WH_QUESTIONS_DATA.map(q => ({
    word: q.word,
    arabic: q.arabic,
    example: `${q.word} is your name?`,
    exampleArabic: `ما هو اسمك؟`,
  })),
  POSSESSIVE_PRONOUNS: PRONOUNS_DATA.POSSESSIVE_PRONOUNS.map(p => ({
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
  PLURAL_RULES: [
    { title: "Regular Noun", rule: "add -S", examples: ["apple - apples", "bat - bats", "car - cars", "frog - frogs", "kite - kites"] },
    { title: "Ends in s, ch, sh, x, or z", rule: "add -ES", examples: ["bus - buses", "match - matches", "wish - wishes", "fox - foxes", "quiz - quizes"] },
    { title: "Ends in f or fe", rule: "remove f/fe add -VES", examples: ["calf - calves", "wolf - wolves", "knife - knives", "shelf - shelves", "thief - thieves", "leaf - leaves", "loaf - loaves", "Exceptions: roof-roofs, cliff-cliffs"] },
    { title: "Ends in consonant + y", rule: "remove y add -IES", examples: ["baby - babies", "story - stories", "lady - ladies", "party - parties", "country - countries"] },
    { title: "Ends in vowel + y", rule: "add -S", examples: ["boy - boys", "key - keys", "day - days", "toy - toys", "monkey - monkeys"] },
    { title: "Ends in consonant + o", rule: "add -ES", examples: ["tomato - tomatoes", "potato - potatoes", "hero - heroes", "echo - echoes"] },
    { title: "Ends in vowel + o", rule: "add -S", examples: ["zoo - zoos", "kangaroo - kangaroos", "video - videos", "radio - radios", "stereo - stereos", "Exceptions: photo-photos, piano-pianos"] },
    { title: "Irregular Nouns", rule: "the rule breakers", examples: ["man - men", "woman - women", "child - children", "tooth - teeth", "foot - feet", "person - people"] },
    { title: "No Change", rule: "spelling remains same", examples: ["sheep - sheep", "deer - deer", "fish - fish", "swine - swine"] },
  ],
};

export const THERE_IS_DATA = {
  SINGULAR: { en: "There is", ar: "يوجد (للمفرد)" },
  PLURAL: { en: "There are", ar: "يوجد (للجمع)" },
  EXAMPLES: [
    { en: "There are five chairs in that room.", ar: "يوجد خمسة كراسي في تلك الغرفة." },
    { en: "There are nine pins in that bag.", ar: "يوجد تسعة دبابيس في تلك الحقيبة." },
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
