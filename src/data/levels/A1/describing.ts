import {
  Smile,
  Dumbbell,
  Ruler,
  Calendar,
  Scissors,
  Heart,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { SHARED_TRAITS } from "./shared";

interface SharedItem {
  word: string;
  arabic: string;
}

const mapShared = (items: SharedItem[]) => items.map(item => ({ text: item.word, translation: item.arabic }));

export const DESCRIBING_DATA = {
  PHYSICAL: [
    {
      text: "He's the most handsome man I've ever met.",
      translation: "إنه أكثر رجل وسيم قابلته على الإطلاق",
    },
    {
      text: "That's a cute little baby.",
      translation: "هذا طفل صغير جذاب",
    },
    {
      text: "She was looking pale and thin.",
      translation: "كانت تبدو شاحبة ونحيفة",
    },
    {
      text: "He's a tall man.",
      translation: "إنه رجل طويل",
    },
    {
      text: "What about your big muscular trainer?",
      translation: "ماذا عن مدربك ذو العضلات؟",
    },
    {
      text: "He is a very short man.",
      translation: "إنه رجل قصير جداً",
    },
    {
      text: "You see that short-haired boy over there.",
      translation: "أتري هذا الفتى ذو الشعر القصير هناك",
    },
    {
      text: "I was talking about the long-haired man.",
      translation: "كنت أتحدث عن الرجل ذو الشعر الطويل",
    },
    {
      text: "The bald man is the owner of the house.",
      translation: "الرجل الأصلع هو صاحب المنزل",
    },
  ],
  CHARACTER_SENTENCES: [
    {
      text: "Brave Policeman Arrests Drug Tycoon.",
      translation: "شرطي شجاع يعتقل تاجر المخدرات",
    },
    {
      text: "You have a chatty doorman.",
      translation: "لديكم بواب ثرثار (كثير الكلام)",
    },
    {
      text: "Adnan is a very clever student. He always gets top scores.",
      translation: "عدنان طالب ماهر جداً. دائماً يحصل على أعلى الدرجات",
    },
    {
      text: "Ahmed is a bit of a coward. He really hates going to the dentist!",
      translation: "أحمد جبان نوعاً ما. هو حقاً يكره الذهاب إلى طبيب الأسنان!",
    },
    {
      text: "The people in my office are friendly! I love working there!",
      translation: "الناس في مكتبي ودودون! أنا أحب العمل هناك!",
    },
    {
      text: "Adnan is a funny person! He always entertains me with jokes!",
      translation: "عدنان شخص مضحك! دائماً يمتعني بالنكات!",
    },
    {
      text: "My parents are very generous.",
      translation: "والداي كرماء جداً",
    },
    {
      text: "My boss is grumpy.",
      translation: "مديري حاد الطبع (نكد)",
    },
    {
      text: "Mahmoud is very honest. He always tells me the truth.",
      translation: "محمود صادق جداً. دائماً يقول لي الحقيقة",
    },
    {
      text: "My father is a kind man.",
      translation: "والدي رجل طيب",
    },
    {
      text: "Sara is loud! When she talks.",
      translation: "سارة صوتها عالٍ (مزعجة) عندما تتحدث",
    },
    {
      text: "Ali is very stingy. He spends a little on his children.",
      translation: "علي بخيل جداً. ينفق القليل على أولاده",
    },
    {
      text: "Mona is very moody. Now she says hello; yesterday she ignored me!",
      translation: "منى مزاجية جداً. الآن تقول مرحباً، وبالأمس تجاهلتني!",
    },
    {
      text: "I don't like nasty people.",
      translation: "أنا لا أحب الناس السيئة",
    },
    {
      text: "My daughter is very neat and organized.",
      translation: "ابنتي مرتبة ومنظمة جداً",
    },
    {
      text: "My son is a very polite boy.",
      translation: "ابني فتى مهذب للغاية",
    },
    {
      text: "She is a quiet girl.",
      translation: "إنها فتاة هادئة",
    },
    {
      text: "Ayman is a rude boy. He doesn't respect the adults.",
      translation: "أيمن فتى غير مهذب. إنه لا يحترم الكبار",
    },
  ],
  VOCABULARY: [
    {
      title: "General Looks",
      icon: Smile,
      items: [
        { text: "Good-looking", translation: "وسيم / جميل" },
        { text: "Handsome", translation: "وسيم" },
        { text: "Ugly", translation: "قبيح" },
        { text: "Cute", translation: "لطيف / جذاب" },
        { text: "Attractive", translation: "جذاب / ملفت" },
        { text: "Pretty", translation: "جميل" },
        { text: "Well-dressed", translation: "أنيق" },
        { text: "Ordinary", translation: "عادي" },
      ],
    },
    {
      title: "Body Build",
      icon: Dumbbell,
      items: [
        { text: "Obese", translation: "بدين (سمنة مفرطة)" },
        { text: "Overweight", translation: "وزن زائد" },
        { text: "Well-built", translation: "قوي الجسم" },
        { text: "Fat", translation: "سمين" },
        { text: "Slim", translation: "رشيق / نحيف" },
        { text: "Muscular", translation: "عضلي" },
        { text: "Fit", translation: "لياقته بدنية عالية" },
      ],
    },
    {
      title: "Height",
      icon: Ruler,
      items: [
        { text: "Tall", translation: "طويل" },
        { text: "Short", translation: "قصير" },
        { text: "Medium height", translation: "متوسط القامة" },
      ],
    },
    {
      title: "Age",
      icon: Calendar,
      items: [
        { text: "Old", translation: "كبير السن" },
        { text: "Young", translation: "صغير السن / يافع" },
        { text: "Middle-aged", translation: "في منتصف العمر" },
        { text: "Teenager", translation: "مراهق" },
        { text: "Elderly", translation: "مسن" },
      ],
    },
    {
      title: "Hair & Face",
      icon: Scissors,
      items: [
        { text: "Bald-headed", translation: "أصلع الرأس" },
        { text: "Beard", translation: "لحية" },
        { text: "Moustache", translation: "شارب" },
        { text: "Long hair", translation: "شعر طويل" },
        { text: "Short hair", translation: "شعر قصير" },
        { text: "Straight hair", translation: "شعر ناعم" },
        { text: "Curly hair", translation: "شعر مجعد" },
        { text: "Blonde", translation: "أشقر" },
      ],
    },
    {
      title: "Skin & Features",
      icon: User,
      items: [
        { text: "Pale", translation: "شاحب" },
        { text: "Tanned", translation: "أسمر (من الشمس)" },
        { text: "Freckles", translation: "نمش" },
        { text: "Dimples", translation: "غمازات" },
        { text: "Wrinkles", translation: "تجاعيد" },
        { text: "Scar", translation: "ندبة" },
      ],
    },
    {
      title: "Personality Traits",
      icon: Heart,
      items: mapShared(SHARED_TRAITS.PERSONALITY.filter(t => ["Shy", "Outgoing", "Lazy", "Hard-working", "Patient", "Impatient", "Ambitious", "Brave", "Friendly", "Chatty", "Clever", "Coward"].includes(t.word))),
    },
    {
      title: "Moral Qualities",
      icon: Sparkles,
      items: mapShared(SHARED_TRAITS.MORAL),
    },
    {
      title: "Mood & Status",
      icon: Zap,
      items: mapShared(SHARED_TRAITS.PERSONALITY.filter(t => ["Funny", "Serious", "Grumpy", "Moody", "Quiet", "Loud", "Neat", "Nasty"].includes(t.word))),
    },
  ],
};
