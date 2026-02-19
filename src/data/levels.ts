import {
  Book,
  Calendar,
  Clock,
  MessageSquare,
  Globe,
  BookOpen,
  User,
  Brain,
  MessageCircle,
  Briefcase,
  CaseUpper,
  Sparkles,
  Split,
  Hash,
  Palette,
  Smile,
  Shapes,
  Search,
  type LucideIcon,
} from "lucide-react";

export interface VocabularyItem {
  word?: string;
  en?: string;
  singular?: string;
  text?: string;
  name?: string;
  english?: string;
  arabic?: string;
  ar?: string;
  translation?: string;
  plural?: string;
  article?: string;
  note?: string;
  image?: string;
  [key: string]: unknown;
}

export interface Category {
  title: string;
  icon: LucideIcon;
  items: VocabularyItem[];
}

export interface SentenceItem {
  english: string;
  arabic: string;
  category: string;
  icon: LucideIcon;
  note?: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
  note?: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  type: string;
  questions: Question[];
}

export interface DialogueLine {
  speaker: string;
  text: string;
  arabic: string;
}

export interface Conversation {
  id: number;
  title: string;
  category: string;
  description: string;
  dialogue: DialogueLine[];
}

export interface ConversationItem {
  id: string;
  title: string;
  arabicTitle: string;
  participants: string[];
  messages: Array<{
    speaker: string;
    text: string;
    translation: string;
  }>;
}

export interface GrammarData {
  readonly ARTICLES_DATA?: {
    readonly A: readonly VocabularyItem[];
    readonly AN: readonly VocabularyItem[];
    readonly UNCOUNTABLE: readonly VocabularyItem[];
  };
  readonly PLURAL_EXAMPLES?: ReadonlyArray<{
    readonly singular: string;
    readonly plural: string;
    readonly arabic: string;
  }>;
  readonly PRONOUNS_QUIZ?: ReadonlyArray<{
    readonly question: string;
    readonly answer: string;
    readonly options: readonly string[];
  }>;
  readonly VERB_TO_BE_DATA?: {
    readonly SINGULAR: ReadonlyArray<{ readonly en: string; readonly ar: string }>;
    readonly PLURAL: ReadonlyArray<{ readonly en: string; readonly ar: string }>;
    readonly QUIZ: ReadonlyArray<{
      readonly question: string;
      readonly answer: string;
      readonly options: readonly string[];
    }>;
  };
  readonly DEMONSTRATIVES_DATA?: ReadonlyArray<{
    readonly title: string;
    readonly items: ReadonlyArray<{
      readonly text: string;
      readonly translation: string;
      readonly category: string;
      readonly rule: string;
    }>;
    readonly examples: ReadonlyArray<{
      readonly text: string;
      readonly translation: string;
    }>;
  }>;
  readonly PREPOSITIONS_DATA?: {
    readonly LIST: ReadonlyArray<{ readonly text: string; readonly translation: string }>;
    readonly EXPLANATION_EXAMPLES: ReadonlyArray<{ readonly en: string; readonly ar: string }>;
  };
}

export interface ExercisesData {
  GRAMMAR_TESTS: Test[];
  VOCAB_TESTS: Test[];
  [key: string]: unknown;
}

export interface ConversationsData {
  CONVERSATIONS_DATA: (Conversation | ConversationItem)[];
  [key: string]: unknown;
}

export interface LevelData {
  vocabulary: Record<string, VocabularyItem[] | unknown>;
  grammar: GrammarData;
  sentences: Record<string, SentenceItem[] | unknown>;
  exercises: ExercisesData;
  conversations: ConversationsData;
}

export type Module = {
  title: string;
  to: string;
  icon: LucideIcon;
  category: "words" | "sentences" | "grammar" | "tests";
  description?: string;
};

export type LevelConfig = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  color: string;
  fallback: string;
};

const SEARCH_MODULE = (levelId: string): Module => ({
  to: `/${levelId}/search`,
  icon: Search,
  title: "Search & Practice",
  category: "words",
});

export const LEVELS: LevelConfig[] = [
  {
    id: "A1",
    title: "Level A1",
    description:
      "Beginner foundations: Alphabet, Numbers, Colors, and Basic Greetings.",
    color: "from-blue-400 to-indigo-400",
    fallback: "bg-blue-500",
    modules: [
      {
        to: "/A1/alphabet",
        icon: CaseUpper,
        title: "Alphabet",
        category: "words",
      },
      {
        to: "/A1/basics",
        icon: Sparkles,
        title: "Basics",
        category: "grammar",
      },
      SEARCH_MODULE("A1"),
      {
        to: "/A1/word-bank",
        icon: Sparkles,
        title: "Word Bank",
        category: "words",
      },
      { to: "/A1/numbers", icon: Hash, title: "Numbers", category: "words" },
      { to: "/A1/colors", icon: Palette, title: "Colors", category: "words" },
      { to: "/A1/shapes", icon: Shapes, title: "Shapes", category: "words" },
      {
        to: "/A1/months",
        icon: Calendar,
        title: "Calendar",
        category: "words",
      },
      { to: "/A1/feelings", icon: Smile, title: "Feelings", category: "words" },
      { to: "/A1/jobs", icon: Briefcase, title: "Jobs", category: "words" },
      {
        to: "/A1/nationalities",
        icon: Globe,
        title: "Languages",
        category: "words",
      },
      {
        to: "/A1/describing",
        icon: User,
        title: "Describing People",
        category: "words",
      },
      { to: "/A1/grammar", icon: Book, title: "Grammar", category: "grammar" },
      {
        to: "/A1/digraphs",
        icon: Split,
        title: "Digraphs",
        category: "grammar",
      },
      {
        to: "/A1/greetings-basics",
        icon: MessageSquare,
        title: "Greetings & Basics",
        category: "sentences",
      },
      {
        to: "/A1/common-social",
        icon: MessageCircle,
        title: "Daily Life & Social",
        category: "sentences",
      },
      {
        to: "/A1/topic-sentences",
        icon: Sparkles,
        title: "Thematic Phrases",
        category: "sentences",
      },
      {
        to: "/A1/exercises/grammar",
        icon: Brain,
        title: "Grammar Tests",
        category: "tests",
      },
      {
        to: "/A1/exercises/vocab",
        icon: Brain,
        title: "Vocabulary Tests",
        category: "tests",
      },
      {
        to: "/A1/conversations",
        icon: MessageCircle,
        title: "Conversations",
        category: "tests",
      },
      {
        to: "/A1/describing-sentences",
        icon: User,
        title: "Describing Phrases",
        category: "sentences",
      },
    ],
  },
  {
    id: "A2",
    title: "Level A2",
    description:
      "Elementary communication: Daily routines, Family, and Basic Verbs.",
    color: "from-emerald-400 to-teal-400",
    fallback: "bg-emerald-500",
    modules: [
      SEARCH_MODULE("A2"),
      {
        to: "/A2/family",
        icon: User,
        title: "Family",
        category: "words",
      },
      {
        to: "/A2/months",
        icon: Calendar,
        title: "Calendar",
        category: "words",
      },
      {
        to: "/A2/countries",
        icon: Globe,
        title: "Countries",
        category: "words",
      },
      {
        to: "/A2/classroom",
        icon: Briefcase,
        title: "Classroom",
        category: "words",
      },
      {
        to: "/A2/personality",
        icon: User,
        title: "Personality",
        category: "words",
      },
      {
        to: "/A2/pronunciation",
        icon: Brain,
        title: "Pronunciation",
        category: "grammar",
      },
      {
        to: "/A2/parts-of-speech",
        icon: BookOpen,
        title: "Parts of Speech",
        category: "grammar",
      },
      {
        to: "/A2/time",
        icon: Clock,
        title: "Telling Time",
        category: "words",
      },
      {
        to: "/A2/routines",
        icon: Clock,
        title: "Daily Routines",
        category: "words",
      },
      {
        to: "/A2/verbs",
        icon: Book,
        title: "Basic Verbs",
        category: "words",
      },
      { to: "/A2/grammar", icon: Book, title: "Grammar", category: "grammar" },
      {
        to: "/A2/exercises/grammar",
        icon: Brain,
        title: "Grammar Tests",
        category: "tests",
      },
      {
        to: "/A2/exercises/vocab",
        icon: Brain,
        title: "Vocabulary Tests",
        category: "tests",
      },
      {
        to: "/A2/conversations",
        icon: MessageCircle,
        title: "Conversations",
        category: "tests",
      },
    ],
  },
  {
    id: "B1",
    title: "Level B1",
    description: "Pre-intermediate: Shopping, Travel, and Expressing Opinions.",
    color: "from-amber-400 to-orange-400",
    fallback: "bg-amber-500",
    modules: [],
  },
  {
    id: "B2",
    title: "Level B2",
    description: "Intermediate: Work life, Media, and Narrative Tenses.",
    color: "from-rose-400 to-pink-400",
    fallback: "bg-rose-500",
    modules: [],
  },
  {
    id: "C1",
    title: "Level C1",
    description:
      "Upper-intermediate: Academic topics, Literature, and Complex Grammar.",
    color: "from-violet-400 to-purple-400",
    fallback: "bg-violet-500",
    modules: [],
  },
];
