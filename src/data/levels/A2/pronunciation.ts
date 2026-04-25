export interface PronunciationItem {
  sound: string;
  type: "voiceless" | "voiced";
  description: string;
  arabicDescription: string;
  examples: { word: string; translation: string }[];
}

export const PRONUNCIATION_DATA: PronunciationItem[] = [
  {
    sound: "/t/",
    type: "voiceless",
    description: "The vocal cords do not vibrate.",
    arabicDescription: "الأحبال الصوتية لا تهتز عند نطق هذا الصوت (صوت مهموس).",
    examples: [
      { word: "ten", translation: "عشرة" },
      { word: "seat", translation: "مقعد" },
    ],
  },
  {
    sound: "/k/",
    type: "voiceless",
    description: "The vocal cords do not vibrate.",
    arabicDescription: "الأحبال الصوتية لا تهتز عند نطق هذا الصوت (صوت مهموس).",
    examples: [
      { word: "class", translation: "فصل/صف" },
      { word: "back", translation: "ظهر/خلف" },
    ],
  },
  {
    sound: "/ʃ/ (sh)",
    type: "voiceless",
    description: "The vocal cords do not vibrate.",
    arabicDescription: "الأحبال الصوتية لا تهتز عند نطق هذا الصوت (صوت مهموس).",
    examples: [
      { word: "pressure", translation: "ضغط" },
      { word: "wish", translation: "أمنية/يتمنى" },
    ],
  },
  {
    sound: "/tʃ/ (ch)",
    type: "voiceless",
    description: "The vocal cords do not vibrate.",
    arabicDescription: "الأحبال الصوتية لا تهتز عند نطق هذا الصوت (صوت مهموس).",
    examples: [
      { word: "rich", translation: "غني" },
      { word: "chair", translation: "كرسي" },
    ],
  },
  {
    sound: "/d/",
    type: "voiced",
    description: "The vocal cords vibrate.",
    arabicDescription: "الأحبال الصوتية تهتز عند نطق هذا الصوت (صوت مجهور).",
    examples: [
      { word: "den", translation: "عرين/غرفة مكتب" },
      { word: "seed", translation: "بذرة" },
    ],
  },
  {
    sound: "/g/",
    type: "voiced",
    description: "The vocal cords vibrate.",
    arabicDescription: "الأحبال الصوتية تهتز عند نطق هذا الصوت (صوت مجهور).",
    examples: [
      { word: "glass", translation: "زجاج/كوب" },
      { word: "bag", translation: "حقيبة" },
    ],
  },
  {
    sound: "/ʒ/ (zh)",
    type: "voiced",
    description: "The vocal cords vibrate.",
    arabicDescription: "الأحبال الصوتية تهتز عند نطق هذا الصوت (صوت مجهور).",
    examples: [
      { word: "vision", translation: "رؤية" },
      { word: "pleasure", translation: "متعة/سرور" },
    ],
  },
  {
    sound: "/dʒ/ (j)",
    type: "voiced",
    description: "The vocal cords vibrate.",
    arabicDescription: "الأحبال الصوتية تهتز عند نطق هذا الصوت (صوت مجهور).",
    examples: [
      { word: "edge", translation: "حافة" },
      { word: "joke", translation: "نكتة" },
    ],
  },
];

export const PRONUNCIATION_IMPORTANCE = {
  title: "لماذا ندرس هذه الأصوات؟",
  points: [
    {
      en: "Correct Endings",
      ar: "نطق النهايات بشكل صحيح (مثل s الجمع و ed الماضي)، فنطقها يعتمد على ما إذا كان الصوت الأخير مجهوراً أو مهموساً.",
    },
    {
      en: "Distinguish Words",
      ar: "التفريق بين الكلمات المتشابهة (مثل seat و seed)، فالاختلاف الوحيد هو اهتزاز الحنجرة.",
    },
    {
      en: "Natural Speech",
      ar: "التحدث بلهجة طبيعية وسلسة مثل الأجانب من خلال فهم ميكانيكية خروج الصوت.",
    }
  ]
};

export const PRONUNCIATION_QUIZ = [
  {
    word: "Session",
    underlined: "ss",
    options: ["/s/", "/ʃ/", "/z/"],
    answer: "/ʃ/",
    explanation: "The 'ss' in Session sounds like 'sh' (/ʃ/)."
  },
  {
    word: "Rough",
    underlined: "gh",
    options: ["/g/", "/f/", "silent"],
    answer: "/f/",
    explanation: "In 'Rough', the 'gh' sounds like 'f'."
  },
  {
    word: "Breath",
    underlined: "th",
    options: ["/θ/", "/ð/", "/t/"],
    answer: "/θ/",
    explanation: "The 'th' in 'Breath' is voiceless (/θ/)."
  },
  {
    word: "Weather",
    underlined: "th",
    options: ["/θ/", "/ð/", "/d/"],
    answer: "/ð/",
    explanation: "The 'th' in 'Weather' is voiced (/ð/)."
  },
  {
    word: "Price",
    underlined: "c",
    options: ["/k/", "/s/", "/ʃ/"],
    answer: "/s/",
    explanation: "The 'c' in 'Price' sounds like 's' because it's followed by 'e'."
  },
  {
    word: "Xylophone",
    underlined: "X",
    options: ["/x/", "/z/", "/ks/"],
    answer: "/z/",
    explanation: "When 'X' is at the beginning of a word, it usually sounds like 'z'."
  },
  {
    word: "Breathing",
    underlined: "th",
    options: ["/θ/", "/ð/", "/d/"],
    answer: "/ð/",
    explanation: "The 'th' in 'Breathing' is voiced (/ð/)."
  },
  {
    word: "Phone",
    underlined: "ph",
    options: ["/p/", "/f/", "/v/"],
    answer: "/f/",
    explanation: "The 'ph' combination always sounds like 'f'."
  }
];
