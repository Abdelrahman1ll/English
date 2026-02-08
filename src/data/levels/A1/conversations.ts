export const CONVERSATIONS_DATA = [
  // Daily Life
  {
    id: 1,
    title: "Introducing Yourself",
    category: "Daily Life",
    description: "Learn how to introduce yourself to a new person.",
    dialogue: [
      {
        speaker: "A",
        text: "Hello! My name is Alex.",
        arabic: "أهلاً! اسمي أليكس.",
      },
      {
        speaker: "B",
        text: "Hi Alex! I am Sarah. Nice to meet you.",
        arabic: "هاي أليكس! أنا سارة. سعدت بلقائك.",
      },
      {
        speaker: "A",
        text: "Nice to meet you too, Sarah. Where are you from?",
        arabic: "سعدت بلقائك أيضاً، سارة. من أين أنتِ؟",
      },
      {
        speaker: "B",
        text: "I am from Canada. And you?",
        arabic: "أنا من كندا. وأنت؟",
      },
      { speaker: "A", text: "I am from Egypt.", arabic: "أنا من مصر." },
    ],
  },
  {
    id: 3,
    title: "Talking about Weather",
    category: "Daily Life",
    description: "A common topic of conversation in any situation.",
    dialogue: [
      {
        speaker: "A",
        text: "It is very sunny today, isn't it?",
        arabic: "الجو مشمس جداً اليوم، أليس كذلك؟",
      },
      {
        speaker: "B",
        text: "Yes, it is! I love warm weather.",
        arabic: "نعم، إنه كذلك! أنا أحب الجو الدافئ.",
      },
      {
        speaker: "A",
        text: "Me too. But I think it will rain tomorrow.",
        arabic: "أنا أيضاً. لكن أظن أنها ستمطر غداً.",
      },
      {
        speaker: "B",
        text: "Oh, really? I hope not. I want to go to the park.",
        arabic: "أوه، حقاً؟ أتمنى ألا يحدث ذلك. أريد الذهاب إلى الحديقة.",
      },
    ],
  },
  {
    id: 4,
    title: "Weekend Plans",
    category: "Daily Life",
    description: "Talking about what you plan to do over the weekend.",
    dialogue: [
      {
        speaker: "A",
        text: "What are you doing this weekend?",
        arabic: "ماذا ستفعل في عطلة نهاية الأسبوع هذه؟",
      },
      {
        speaker: "B",
        text: "I am going to visit my grandmother. How about you?",
        arabic: "سأذهب لزيارة جدتي. ماذا عنك؟",
      },
      {
        speaker: "A",
        text: "I am staying at home to watch some movies.",
        arabic: "سأبقى في المنزل لمشاهدة بعض الأفلام.",
      },
      {
        speaker: "B",
        text: "That sounds relaxing!",
        arabic: "هذا يبدو مريحاً!",
      },
    ],
  },

  // Travel & Shopping
  {
    id: 2,
    title: "At the Cafe",
    category: "Travel & Shopping",
    description: "Ordering a drink at a local coffee shop.",
    dialogue: [
      {
        speaker: "A",
        text: "Good morning! Can I have a coffee, please?",
        arabic: "صباح الخير! هل يمكنني الحصول على قهوة من فضلك؟",
      },
      {
        speaker: "B",
        text: "Sure! Large or small?",
        arabic: "بالطبع! كبيرة أم صغيرة؟",
      },
      {
        speaker: "A",
        text: "A small coffee with milk, please.",
        arabic: "قهوة صغيرة مع الحليب، من فضلك.",
      },
      { speaker: "B", text: "Anything else?", arabic: "أي شيء آخر؟" },
      {
        speaker: "A",
        text: "No, thank you. How much is it?",
        arabic: "لا، شكراً لك. كم ثمنها؟",
      },
      {
        speaker: "B",
        text: "That is three dollars.",
        arabic: "هذا بثلاثة دولارات.",
      },
    ],
  },
  {
    id: 5,
    title: "Asking for Directions",
    category: "Travel & Shopping",
    description: "Learn how to find your way in a new city.",
    dialogue: [
      {
        speaker: "A",
        text: "Excuse me, where is the nearest bank?",
        arabic: "معذرة، أين أقرب بنك؟",
      },
      {
        speaker: "B",
        text: "Go straight for two blocks and turn left.",
        arabic: "اذهب مباشرة لمسافتين ثم انعطف يساراً.",
      },
      {
        speaker: "A",
        text: "Is it far from here?",
        arabic: "هل هو بعيد من هنا؟",
      },
      {
        speaker: "B",
        text: "No, it is just a five-minute walk.",
        arabic: "لا، إنه على بعد خمس دقائق سيراً على الأقدام.",
      },
      {
        speaker: "A",
        text: "Thank you very much!",
        arabic: "شكراً جزيلاً لك!",
      },
    ],
  },
  {
    id: 6,
    title: "Buying Clothes",
    category: "Travel & Shopping",
    description: "Shopping for a new shirt or dress.",
    dialogue: [
      {
        speaker: "A",
        text: "How much is this blue shirt?",
        arabic: "بكم هذا القميص الأزرق؟",
      },
      {
        speaker: "B",
        text: "It is twenty-five dollars.",
        arabic: "ثمنه خمسة وعشرون دولاراً.",
      },
      { speaker: "A", text: "Can I try it on?", arabic: "هل يمكنني قياسه؟" },
      {
        speaker: "B",
        text: "Yes, the changing rooms are over there.",
        arabic: "نعم، غرف القياس هناك.",
      },
      { speaker: "A", text: "Thank you.", arabic: "شكراً لك." },
    ],
  },

  // Work & Study
  {
    id: 7,
    title: "At the Library",
    category: "Work & Study",
    description: "Borrowing books for your studies.",
    dialogue: [
      {
        speaker: "A",
        text: "Hello! I want to borrow this book, please.",
        arabic: "مرحباً! أود استعارة هذا الكتاب، من فضلك.",
      },
      {
        speaker: "B",
        text: "Sure, do you have your library card?",
        arabic: "بالطبع، هل معك بطاقة المكتبة الخاصة بك؟",
      },
      { speaker: "A", text: "Yes, here it is.", arabic: "نعم، تفضل." },
      {
        speaker: "B",
        text: "You can keep the book for two weeks.",
        arabic: "يمكنك الاحتفاظ بالكتاب لمدة أسبوعين.",
      },
      { speaker: "A", text: "Great, thank you.", arabic: "رائع، شكراً لك." },
    ],
  },
  {
    id: 8,
    title: "First Day at School",
    category: "Work & Study",
    description: "Talking to a new classmate.",
    dialogue: [
      {
        speaker: "A",
        text: "Hello! Is this the English class?",
        arabic: "مرحباً! هل هذا فصل اللغة الإنجليزية؟",
      },
      {
        speaker: "B",
        text: "Yes, it is. Are you a new student?",
        arabic: "نعم، إنه كذلك. هل أنت طالب جديد؟",
      },
      {
        speaker: "A",
        text: "Yes, I am. My name is Omar.",
        arabic: "نعم، أنا كذلك. اسمي عمر.",
      },
      {
        speaker: "B",
        text: "Welcome, Omar! I am David.",
        arabic: "أهلاً بك يا عمر! أنا ديفيد.",
      },
      {
        speaker: "A",
        text: "Nice to meet you, David.",
        arabic: "سعدت بلقائك يا ديفيد.",
      },
    ],
  },
];
