export interface Example {
  en: string;
  ar: string;
}

export interface PartsOfSpeechItem {
  id: number;
  name: string;
  arabicName: string;
  definition: string;
  arabicDefinition: string;
  examples: Example[];
}

export const PARTS_OF_SPEECH_DATA: PartsOfSpeechItem[] = [
  {
    id: 1,
    name: "Noun",
    arabicName: "الاسم",
    definition: "A word used to identify people, places, things, or animals.",
    arabicDefinition: "كلمة تُستخدم للتعرف على الأشخاص. أو يكون عائد على حيوان، أو مكان، أو شيء.",
    examples: [
      { en: "lion", ar: "أسد" },
      { en: "tiger", ar: "نمر" },
      { en: "school", ar: "مدرسة" },
      { en: "room", ar: "غرفة" },
      { en: "door", ar: "باب" },
      { en: "pencil", ar: "قلم رصاص" },
      { en: "book", ar: "كتاب" }
    ],
  },
  {
    id: 2,
    name: "Pronoun",
    arabicName: "الضمير",
    definition: "A word that takes the place of a noun.",
    arabicDefinition: "الضمير هو كلمة تنوب عن الفاعل",
    examples: [
      { en: "I", ar: "أنا" },
      { en: "he", ar: "هو" },
      { en: "she", ar: "هي" },
      { en: "it", ar: "هو/هي لغير العاقل" },
      { en: "we", ar: "نحن" },
      { en: "you", ar: "أنت/أنتم" },
      { en: "they", ar: "هم" },
      { en: "me", ar: "ني/إياي" },
      { en: "him", ar: "ـه/إياه" },
      { en: "her", ar: "ـها/إياها" },
      { en: "us", ar: "ـنا/إيانا" },
      { en: "them", ar: "ـهم/إياهم" }
    ],
  },
  {
    id: 3,
    name: "Verb",
    arabicName: "الفعل",
    definition: "A word that describes an action or state.",
    arabicDefinition: "الفعل يدل على حدث يحدث أو حالة",
    examples: [
      { en: "come", ar: "يأتي" },
      { en: "play", ar: "يلعب" },
      { en: "run", ar: "يجري" },
      { en: "visit", ar: "يزور" },
      { en: "eat", ar: "يأكل" },
      { en: "read", ar: "يقرأ" },
      { en: "listen", ar: "يستمع" },
      { en: "jump", ar: "يقفز" }
    ],
  },
  {
    id: 4,
    name: "Adjective",
    arabicName: "الصفة",
    definition: "A word that describes a noun.",
    arabicDefinition: "كلمة تصف الاسم وتعطي معلومات إضافية عنه.",
    examples: [
      { en: "tall", ar: "طويل" },
      { en: "short", ar: "قصير" },
      { en: "beautiful", ar: "جميلة" },
      { en: "famous", ar: "مشهور" },
      { en: "nice", ar: "لطيف" },
      { en: "great", ar: "عظيم" },
      { en: "hungry", ar: "جائع" }
    ],
  },
  {
    id: 5,
    name: "Adverb",
    arabicName: "الحال",
    definition: "A word that describes a verb, adjective, or another adverb.",
    arabicDefinition: "كلمة تصف الفعل أو الصفة (توضح كيف ومتى وأين حدث الفعل).",
    examples: [
      { en: "slowly", ar: "ببطء" },
      { en: "quickly", ar: "بسرعة" },
      { en: "angrily", ar: "بغضب" },
      { en: "fast", ar: "بسرعة" },
      { en: "well", ar: "بشكل جيد" }
    ],
  },
  {
    id: 6,
    name: "Preposition",
    arabicName: "حرف الجر",
    definition: "A word that shows direction, time, place, or location.",
    arabicDefinition: "كلمة توضح الاتجاه، الوقت، المكان، أو الموقع.",
    examples: [
      { en: "on", ar: "على" },
      { en: "in", ar: "في" },
      { en: "into", ar: "إلى داخل" },
      { en: "for", ar: "لأجل/لمدة" },
      { en: "from", ar: "من" },
      { en: "next to", ar: "بجانب" },
      { en: "between", ar: "بين" }
    ],
  },
  {
    id: 7,
    name: "Conjunction",
    arabicName: "الروابط",
    definition: "A word used to connect sentences or words.",
    arabicDefinition: "كلمة تُستخدم لربط الجمل أو الكلمات ببعضها.",
    examples: [
      { en: "and", ar: "و" },
      { en: "although", ar: "على الرغم من" },
      { en: "so", ar: "لذلك" },
      { en: "but", ar: "ولكن" }
    ],
  },
  {
    id: 8,
    name: "Interjection",
    arabicName: "التعجب",
    definition: "A word or phrase used to express strong feeling or sudden emotion.",
    arabicDefinition: "كلمة أو عبارة تُستخدم للتعبير عن شعور قوي أو عاطفة مفاجئة.",
    examples: [
      { en: "Hey!", ar: "يا!" },
      { en: "Oh!", ar: "أوه!" },
      { en: "Ouch!", ar: "آي!" },
      { en: "Oh no!", ar: "يا للهول!" }
    ],
  },
];
