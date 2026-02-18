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

export const LEVEL_DATA: Record<string, unknown> = {
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
};
