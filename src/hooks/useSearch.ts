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

    const processData = (data: any, source: string) => {
      if (!data) return;

      if (Array.isArray(data)) {
        data.forEach((item) => {
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
      } else if (typeof data === "object") {
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === "function") return;
          processData(data[key], `${source}`);
        });
      }
    };

    if (currentLevel.vocabulary) {
      Object.keys(currentLevel.vocabulary).forEach((key) => {
        processData(currentLevel.vocabulary[key], key.replace("_DATA", ""));
      });
    }

    if (currentLevel.sentences) {
      processData(currentLevel.sentences, "Sentences");
    }

    if (currentLevel.grammar) {
      processData(currentLevel.grammar, "Grammar");
    }

    if (currentLevel.conversations) {
      processData(currentLevel.conversations, "Conversations");
    }

    return items;
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
