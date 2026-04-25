
export const SENTENCE_STRUCTURE_DATA = {
  EXPLANATION: [
    {
      title: "المكونات الأساسية للجملة",
      content: "الجملة البسيطة في اللغة الإنجليزية تتكون عادة من ثلاثة أجزاء رئيسية بالترتيب التالي:",
      steps: [
        { label: "1. الفاعل (Subject)", detail: "من يقوم بالفعل (اسم أو ضمير مثل I, He, Ahmed)." },
        { label: "2. الفعل (Verb)", detail: "الحدث أو الحركة (مثل eat, play, is)." },
        { label: "3. المفعول به أو التكملة (Object/Complement)", detail: "ما يقع عليه الفعل أو يكمل معنى الجملة." }
      ],
      formula: "Subject + Verb + Object",
      example: { en: "Ahmed plays football.", ar: "أحمد يلعب كرة القدم." }
    }
  ],
  EXAMPLES: [
    { en: "I drink water.", ar: "أنا أشرب الماء.", subject: "I", verb: "drink", object: "water" },
    { en: "She reads a book.", ar: "هي تقرأ كتاباً.", subject: "She", verb: "reads", object: "a book" },
    { en: "They are happy.", ar: "هم سعداء.", subject: "They", verb: "are", object: "happy" },
    { en: "The cat sleeps on the mat.", ar: "القطة تنام على الحصيرة.", subject: "The cat", verb: "sleeps", object: "on the mat" }
  ],
  QUIZ: [
    {
      question: "رتب الكلمات لتكوين جملة صحيحة: (football / plays / Ahmed)",
      options: ["Ahmed plays football", "Plays Ahmed football", "Football Ahmed plays"],
      answer: "Ahmed plays football",
      explanation: "الجملة تبدأ بالفاعل (Ahmed) ثم الفعل (plays) ثم المفعول به (football)."
    },
    {
      question: "ما هو الفاعل (Subject) في الجملة التالية: 'The teacher explains the lesson'؟",
      options: ["explains", "The teacher", "the lesson"],
      answer: "The teacher",
      explanation: "الفاعل هو من يقوم بالفعل، وفي هذه الجملة هو 'The teacher'."
    },
    {
      question: "أي جملة تتبع الترتيب الصحيح (S+V+O)؟",
      options: ["Drinks Ali milk.", "Ali milk drinks.", "Ali drinks milk."],
      answer: "Ali drinks milk.",
      explanation: "الترتيب الصحيح هو الفاعل (Ali) ثم الفعل (drinks) ثم المفعول به (milk)."
    },
    {
      question: "اختر الفعل (Verb) في جملة: 'We are learning English.'",
      options: ["We", "English", "are learning"],
      answer: "are learning",
      explanation: "الفعل في هذه الجملة هو فعل مركب (are learning) يعبر عن الحدث المستمر."
    }
  ]
};
