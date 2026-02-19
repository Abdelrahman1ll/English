import * as a1Grammar from "./A1/grammar";
import * as a1Sentences from "./A1/sentences";
import * as a1Exercises from "./A1/exercises";
import * as a1Conversations from "./A1/conversations";
import * as a1Colors from "./A1/colors";
import * as a1Shapes from "./A1/shapes";
import * as a1Jobs from "./A1/jobs";
import * as a1Feelings from "./A1/feelings";
import * as a1Calendar from "./A1/calendar";
import * as a1Numbers from "./A1/numbers";
import * as a1Digraphs from "./A1/digraphs";
import * as a1Phonics from "./A1/phonics";
import * as a1Describing from "./A1/describing";
import * as a1Nationalities from "./A1/nationalities";
import * as a1Basics from "./A1/basics";

import * as a2Basics from "./A2/basics";
import * as a2Sentences from "./A2/sentences";
import * as a2Exercises from "./A2/exercises";
import * as a2Family from "./A2/family";
import * as a2Personality from "./A2/personality";
import * as a2Routines from "./A2/routines";
import * as a2Verbs from "./A2/verbs";
import * as a2Calendar from "./A2/calendar";
import * as a2Classroom from "./A2/classroom";
import * as a2Pronunciation from "./A2/pronunciation";
import * as a2Countries from "./A2/countries";
import * as a2PartsOfSpeech from "./A2/partsOfSpeech";
import * as a2Conversations from "./A2/conversations";
import * as a2LifeStages from "./A2/lifeStages";

// calendar.ts

import type { LevelData } from "../levels";

export const LEVEL_DATA: Record<string, LevelData> = {
  A1: {
    vocabulary: {
      ...a1Colors,
      ...a1Shapes,
      ...a1Jobs,
      ...a1Feelings,
      ...a1Calendar,
      ...a1Numbers,
      ...a1Digraphs,
      ...a1Phonics,
      ...a1Describing,
      ...a1Nationalities,
      ...a1Basics,
    },
    grammar: a1Grammar,
    sentences: a1Sentences,
    exercises: a1Exercises,
    conversations: a1Conversations,
  },
  A2: {
    vocabulary: {
      ...a2Family,
      ...a2Personality,
      ...a2Basics,
      ...a2Routines,
      ...a2Verbs,
      ...a2Calendar,
      ...a2Classroom,
      ...a2Pronunciation,
      ...a2Countries,
      ...a2PartsOfSpeech,
      ...a2LifeStages,
    },
    grammar: a2Basics,
    sentences: {
      ...a2Sentences,
      ...a2Routines,
    },
    exercises: a2Exercises,
    conversations: a2Conversations,
  },
};
