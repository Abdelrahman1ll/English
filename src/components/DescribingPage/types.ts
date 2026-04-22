import type { VocabularyItem, Category } from "../../data/levels";

export interface DescribingData {
  readonly PHYSICAL: readonly VocabularyItem[];
  readonly CHARACTER_SENTENCES: readonly VocabularyItem[];
  readonly VOCABULARY: readonly Category[];
}
