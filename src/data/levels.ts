import {
  CaseUpper,
  Calendar,
  Sparkles,
  Split,
  Hash,
  Palette,
  Briefcase,
  Book,
  Smile,
  User,
  Shapes,
  Globe,
  Ghost,
  MessageSquare,
  Brain,
  MessageCircle,
  Search,
  type LucideIcon,
} from "lucide-react";

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
      SEARCH_MODULE("A1"),
      { to: "/A1/digraphs", icon: Split, title: "Digraphs", category: "words" },
      {
        to: "/A1/magic-e",
        icon: Sparkles,
        title: "Magic E",
        category: "words",
      },
      {
        to: "/A1/silent-letters",
        icon: Ghost,
        title: "Silent Letters",
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
        to: "/A1/sentences",
        icon: MessageSquare,
        title: "Sentences",
        category: "sentences",
      },
      {
        to: "/A1/exercises",
        icon: Brain,
        title: "Exercises",
        category: "tests",
      },
      {
        to: "/A1/conversations",
        icon: MessageCircle,
        title: "Conversations",
        category: "tests",
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
    modules: [],
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
