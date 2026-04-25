import { GrammarTemplate } from "../../Grammar/shared/GrammarTemplate";
import { ArticleSection } from "./ArticleSection";
import { Quote } from "lucide-react";
import type { StudyItem } from "../../shared/StudyModule";

export function ArticlesPage() {
  return (
    <GrammarTemplate
      topicId="articles"
      getStudyItems={(grammar) => {
        const items: StudyItem[] = [];
        const data = grammar.ARTICLES_DATA || {};
        [
          ...(data.A || []),
          ...(data.AN || []),
          ...(data.UNCOUNTABLE || []),
        ].forEach((i) =>
          items.push({
            primary:
              i.article === "none"
                ? (i.word || "").replace(/[()]/g, "")
                : `${i.article || ""} ${(i.word || "").replace(/[()]/g, "")}`.trim(),
            secondary: i.arabic || i.ar || i.translation || "",
            category: `Article`,
          }),
        );
        return items;
      }}
      renderGrid={({
        grammar,
        activeWord,
        playingItem,
        studyItems,
        onItemClick,
      }) => (
        <div className="space-y-16">
          <ArticleSection
            title="The Article 'A' (أداة النكرة)"
            rule={
              <div className="text-right" dir="rtl">
                <p>
                  تُستخدم قبل الكلمات المفردة التي تبدأ بـ{" "}
                  <strong>صوت ساكن (Consonant)</strong>.
                </p>
                <p className="text-white/40 italic text-sm mt-2">
                  <Quote size={12} className="inline mr-1" /> تعني "شيء واحد"
                  (مفرد).
                </p>
              </div>
            }
            items={grammar.ARTICLES_DATA?.A || []}
            color="emerald"
            activeWord={activeWord}
            playingItem={playingItem}
            studyItems={studyItems}
            onItemClick={onItemClick}
          />
          <ArticleSection
            title="The Article 'An' (أداة النكرة للمتحرك)"
            rule={
              <div className="text-right" dir="rtl">
                <p>
                  تُستخدم قبل الكلمات المفردة التي تبدأ بـ{" "}
                  <strong>صوت متحرك (Vowel)</strong> لتسهيل النطق.
                </p>
              </div>
            }
            items={grammar.ARTICLES_DATA?.AN || []}
            color="amber"
            vowels={["A", "E", "I", "O", "U"]}
            activeWord={activeWord}
            playingItem={playingItem}
            studyItems={studyItems}
            onItemClick={onItemClick}
          />
          <ArticleSection
            title="Uncountable Nouns (الأسماء التي لا تُعد)"
            rule={
              <div className="text-right" dir="rtl">
                <p>
                  الكلمات التي <strong>لا يمكن عدها</strong> (مثل السوائل
                  والمفاهيم). لا تأخذ "a" أو "an" قبلها.
                </p>
              </div>
            }
            items={grammar.ARTICLES_DATA?.UNCOUNTABLE || []}
            color="rose"
            activeWord={activeWord}
            playingItem={playingItem}
            studyItems={studyItems}
            onItemClick={onItemClick}
          />
        </div>
      )}
    />
  );
}
