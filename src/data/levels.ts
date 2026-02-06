import {
  CaseUpper,
  Calendar,
  Sparkles,
  Split,
  Hand,
  Hash,
  Palette,
  Briefcase,
  Book,
  Smile,
  User,
  Shapes,
  Globe,
  Ghost,
  type LucideIcon,
} from "lucide-react";

export type Module = {
  title: string;
  to: string;
  icon: LucideIcon;
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

export const LEVELS: LevelConfig[] = [
  {
    id: "A1",
    title: "Level A1",
    description:
      "Beginner foundations: Alphabet, Numbers, Colors, and Basic Greetings.",
    color: "from-blue-400 to-indigo-400",
    fallback: "bg-blue-500",
    modules: [
      { to: "/A1/alphabet", icon: CaseUpper, title: "Alphabet" },
      { to: "/A1/digraphs", icon: Split, title: "Digraphs" },
      { to: "/A1/magic-e", icon: Sparkles, title: "Magic E" },
      { to: "/A1/silent-letters", icon: Ghost, title: "Silent Letters" },
      { to: "/A1/numbers", icon: Hash, title: "Numbers" },
      { to: "/A1/colors", icon: Palette, title: "Colors" },
      { to: "/A1/shapes", icon: Shapes, title: "Shapes" },
      { to: "/A1/greetings", icon: Hand, title: "Greetings" },
      { to: "/A1/months", icon: Calendar, title: "Calendar" },
      { to: "/A1/feelings", icon: Smile, title: "Feelings" },
      { to: "/A1/jobs", icon: Briefcase, title: "Jobs" },
      { to: "/A1/nationalities", icon: Globe, title: "Languages" },
      { to: "/A1/describing", icon: User, title: "Describing People" },
      { to: "/A1/grammar", icon: Book, title: "Grammar" },
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
