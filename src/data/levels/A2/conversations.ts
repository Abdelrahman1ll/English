import type { ConversationItem } from "../../levels";

export const CONVERSATIONS_DATA: ConversationItem[] = [
  {
    id: "electronics_store",
    title: "At the Electronics Store",
    arabicTitle: "في متجر الإلكترونيات",
    participants: ["A", "B"],
    messages: [
      { speaker: "A", text: "May I help you?", translation: "هل يمكنني مساعدتك؟" },
      { speaker: "B", text: "Yes, please. Where are the CD players?", translation: "نعم من فضلك. أين توجد مشغلات الأقراص المدمجة؟" },
      { speaker: "A", text: "They're on the wall. What are those?", translation: "إنها على الحائط. ما هذه الأشياء هناك؟" },
      { speaker: "B", text: "They're DVD players. They're really good. And these speakers are really good, too.", translation: "إنها مشغلات دي في دي. إنها جيدة حقاً. وهذه السماعات جيدة جداً أيضاً." },
      { speaker: "A", text: "Are they expensive?", translation: "هل هي غالية الثمن؟" },
      { speaker: "B", text: "No, they're on sale.", translation: "لا، إنها معروضة للبيع." },
    ],
  },
  {
    id: "jennifer_lijun",
    title: "Introducing Yourself",
    arabicTitle: "التعريف بنفسك",
    participants: ["Jennifer", "Li-jun"],
    messages: [
      { speaker: "Jennifer", text: "Hello, I'm Jennifer. What's your name?", translation: "مرحباً، أنا جنيفر. ما اسمك؟" },
      { speaker: "Li-jun", text: "Hi, Jennifer. I'm Li-jun. Please call me Li. It's my nickname.", translation: "أهلاً جنيفر. أنا لي-جون. من فضلك ناديني بـ لي. إنه لقبي." },
      { speaker: "Jennifer", text: "OK. It's nice to meet you, Li.", translation: "حسناً. سُررت بلقائك يا لي." },
      { speaker: "Li-jun", text: "Nice to meet you, too. What's your last name, Jennifer?", translation: "سُررت بلقائك أيضاً. ما هو اسم عائلتك يا جنيفر؟" },
      { speaker: "Jennifer", text: "It's Banks. What's your last name?", translation: "إنه بانكس. ما هو اسم عائلتك؟" },
      { speaker: "Li-jun", text: "Wong.", translation: "وونغ." },
    ],
  },
  {
    id: "family_pictures",
    title: "Talking About Family",
    arabicTitle: "التحدث عن العائلة",
    participants: ["A", "B"],
    messages: [
      { speaker: "A", text: "Nice pictures. Hey, who's that?", translation: "صور جميلة. هي، من هذا؟" },
      { speaker: "B", text: "That's my brother.", translation: "هذا أخي." },
      { speaker: "A", text: "What's his name?", translation: "ما اسمه؟" },
      { speaker: "B", text: "His name is Sung-ho.", translation: "اسمه سونغ-هو." },
      { speaker: "A", text: "How old is he?", translation: "كم عمره؟" },
      { speaker: "B", text: "He's 26.", translation: "عمره 26 عاماً." },
      { speaker: "A", text: "Is he married?", translation: "هل هو متزوج؟" },
      { speaker: "B", text: "No, he isn't. He's single.", translation: "لا، ليس كذلك. إنه أعزب." },
    ],
  },
  {
    id: "possessives_practice",
    title: "Talking About Possessions",
    arabicTitle: "التحدث عن الملكية",
    participants: ["A", "B"],
    messages: [
      { speaker: "A", text: "Is this Jennifer's hat?", translation: "هل هذه قبعة جنيفر؟" },
      { speaker: "B", text: "No, it's not hers. It's mine.", translation: "لا، ليست ملكها. إنها ملكي." },
      { speaker: "A", text: "Are these your gloves?", translation: "هل هذه قفازاتك؟" },
      { speaker: "B", text: "No, they're not my gloves. Let's ask Sally. Maybe they're hers.", translation: "لا، ليست قفازاتي. دعنا نسأل سالي. ربما تكون ملكها." },
      { speaker: "A", text: "Whose T-shirts are these? Are they Julie's and Pat's?", translation: "لمن هذه القمصان؟ هل هي لجولي وبات؟" },
      { speaker: "B", text: "No, they're not their T-shirts. But these socks are theirs.", translation: "لا، ليست قمصانهما. لكن هذه الجوارب ملكهما." },
      { speaker: "A", text: "Hey! These are not our clothes!", translation: "مهلاً! هذه ليست ملابسنا!" },
      { speaker: "B", text: "You're right. Ours are over there.", translation: "معك حق. ملابسنا هناك." },
    ],
  },
];
