import { useState, useMemo } from "react";
import { LEVEL_DATA } from "../data/levels/index";

export type SearchItem = {
  text: string;
  translation: string;
  source: string;
};

export function useSearch(levelId: string | undefined) {
  const [searchTerm, setSearchTerm] = useState("");

  const allItems = useMemo(() => {
    const items: SearchItem[] = [];
    if (!levelId || !LEVEL_DATA[levelId]) return items;

    const currentLevel = LEVEL_DATA[levelId];

    const processData = (data: unknown, source: string) => {
      if (!data) return;

      if (Array.isArray(data)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as Record<string, any>[]).forEach((item) => {
          if (!item) return;

          const text =
            item.word ||
            item.text ||
            item.name ||
            item.singular ||
            item.en ||
            item.english;
          const translation =
            item.arabic || item.translation || item.ar || item.plural;

          if (text && translation) {
            items.push({ text, translation, source });
          }

          if (item.examples && Array.isArray(item.examples)) {
            processData(item.examples, source);
          }
          if (item.items && Array.isArray(item.items)) {
            processData(item.items, source);
          }
          if (item.dialogue && Array.isArray(item.dialogue)) {
            processData(item.dialogue, `${source} - Dialogue`);
          }
        });
      } else if (data && typeof data === "object") {
        const obj = data as Record<string, unknown>;
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          if (typeof value === "function") return;
          processData(value, `${source}`);
        });
      }
    };

    if (currentLevel.vocabulary) {
      const vocab = currentLevel.vocabulary as Record<string, unknown>;
      Object.keys(vocab).forEach((key) => {
        processData(vocab[key], key.replace("_DATA", ""));
      });
    }

    if (currentLevel.sentences?.SENTENCES_DATA) {
      processData(currentLevel.sentences.SENTENCES_DATA, "Sentences");
    }

    if (currentLevel.grammar) {
      processData(currentLevel.grammar, "Grammar");
    }

    if (currentLevel.conversations) {
      processData(currentLevel.conversations, "Conversations");
    }

    // Deduplicate items based on text and translation to avoid double-counting
    // (e.g. when data is exported in multiple constants or overlapping categories)
    const uniqueItemsMap = new Map<string, SearchItem>();
    
    // Normalization helper to treat "My cat." and "My cat" as the same
    const normalize = (str: string) => 
      str.toLowerCase()
         .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") // Strip common punctuation
         .trim();

    items.forEach((item) => {
      const key = `${normalize(item.text)}|${normalize(item.translation)}`;
      if (!uniqueItemsMap.has(key)) {
        uniqueItemsMap.set(key, item);
      }
    });

    return Array.from(uniqueItemsMap.values());
  }, [levelId]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return [];

    return allItems
      .filter(
        (item: SearchItem) =>
          item.text?.toLowerCase().includes(term) ||
          item.translation?.toLowerCase().includes(term),
      )
      .slice(0, 50);
  }, [searchTerm, allItems]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
