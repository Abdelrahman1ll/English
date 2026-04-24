export interface PartsOfSpeechItem {
  id: number;
  name: string;
  arabicName: string;
  definition: string;
  arabicDefinition: string;
  examples: string[];
}

export const PARTS_OF_SPEECH_DATA: PartsOfSpeechItem[] = [
  {
    id: 1,
    name: "Noun",
    arabicName: "الاسم",
    definition: "A word used to identify people, places, things, or animals.",
    arabicDefinition: "كلمة تُستخدم للتعرف على الأشخاص. أو يكون عائد على حيوان، أو مكان، أو شيء.",
    examples: ["lion", "tiger", "eat", "school", "room", "door", "pencil", "book"],
  },
  {
    id: 2,
    name: "Pronoun",
    arabicName: "الضمير",
    definition: "A word that takes the place of a noun.",
    arabicDefinition: "الضمير هو كلمة تنوب عن الفاعل",
    examples: ["I", "he", "she", "it", "we", "you", "they", "me", "him", "her", "us", "them"],
  },
  {
    id: 3,
    name: "Verb",
    arabicName: "الفعل",
    definition: "A word that describes an action or state.",
    arabicDefinition: "الفعل يدل على حدث يحدث أو حالة",
    examples: ["come", "play", "run", "visit", "eat", "read", "listen", "jump"],
  },
  {
    id: 4,
    name: "Adjective",
    arabicName: "الصفة",
    definition: "A word that describes a noun.",
    arabicDefinition: "كلمة تصف الاسم وتعطي معلومات إضافية عنه.",
    examples: ["tall", "short", "beautiful", "famous", "nice", "great", "hungry"],
  },
  {
    id: 5,
    name: "Adverb",
    arabicName: "الحال",
    definition: "A word that describes a verb, adjective, or another adverb.",
    arabicDefinition: "كلمة تصف الفعل أو الصفة (توضح كيف ومتى وأين حدث الفعل).",
    examples: ["slowly", "quickly", "angrily", "fast", "well"],
  },
  {
    id: 6,
    name: "Preposition",
    arabicName: "حرف الجر",
    definition: "A word that shows direction, time, place, or location.",
    arabicDefinition: "كلمة توضح الاتجاه، الوقت، المكان، أو الموقع.",
    examples: ["on", "in", "into", "for", "from", "next to", "between"],
  },
  {
    id: 7,
    name: "Conjunction",
    arabicName: "الروابط",
    definition: "A word used to connect sentences or words.",
    arabicDefinition: "كلمة تُستخدم لربط الجمل أو الكلمات ببعضها.",
    examples: ["and", "although", "so", "but"],
  },
  {
    id: 8,
    name: "Interjection",
    arabicName: "التعجب",
    definition: "A word or phrase used to express strong feeling or sudden emotion.",
    arabicDefinition: "كلمة أو عبارة تُستخدم للتعبير عن شعور قوي أو عاطفة مفاجئة.",
    examples: ["Hey!", "Oh!", "Ouch!", "Oh no!"],
  },
];
