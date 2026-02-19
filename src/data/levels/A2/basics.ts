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
];

export const PRONOUNS_QUIZ: GrammarData["PRONOUNS_QUIZ"] = [];

export const VERB_TO_BE_DATA: GrammarData["VERB_TO_BE_DATA"] = {
  SINGULAR: [],
  PLURAL: [],
  QUIZ: [],
};

export const DEMONSTRATIVES_DATA: GrammarData["DEMONSTRATIVES_DATA"] = [];

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
