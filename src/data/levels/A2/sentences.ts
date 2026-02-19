// Common sentences for Level A2
import { Clock, MessageCircle } from "lucide-react";

export const TIME_DIALOGUES = [
  {
    id: 1,
    title: "It's late",
    dialogue: [
      { speaker: "Lisa", text: "It's late.", arabic: "الوقت متأخر." },
      { speaker: "Josh", text: "Really? What time is it?", arabic: "حقاً؟ كم الساعة؟" },
      { speaker: "Lisa", text: "It's eleven thirty. Time to go to bed.", arabic: "إنها الحادية عشرة والنصف. حان وقت الذهاب للنوم." },
      { speaker: "Josh", text: "Why? I'm not tired.", arabic: "لماذا؟ لست متعباً." },
    ]
  },
  {
    id: 2,
    title: "Time to get up",
    dialogue: [
      { speaker: "Josh", text: "What time is it?", arabic: "كم الساعة؟" },
      { speaker: "Lisa", text: "It's quarter to seven. Time to get up!", arabic: "إنها السابعة إلا ربع. حان وقت الاستيقاظ!" },
      { speaker: "Josh", text: "But I'm tired.", arabic: "لكنني متعب." },
      { speaker: "Lisa", text: "Have some coffee.", arabic: "تناول بعض القهوة." },
    ]
  },
  {
    id: 3,
    title: "Excuse me",
    dialogue: [
      { speaker: "Josh", text: "Excuse me. What time is it?", arabic: "معذرة. كم الساعة؟" },
      { speaker: "Man", text: "Sorry, I don't know. I don't have a watch.", arabic: "آسف، لا أعرف. ليس معي ساعة." },
    ]
  },
  {
    id: 4,
    title: "I'm late!",
    dialogue: [
      { speaker: "Josh", text: "Excuse me. What time is it?", arabic: "معذرة. كم الساعة؟" },
      { speaker: "Woman", text: "Let me see. It's quarter after seven.", arabic: "دعني أرى. إنها السابعة والربع." },
      { speaker: "Josh", text: "Oh, no. I'm late!", arabic: "أووه لا. لقد تأخرت!" },
    ]
  }
];

export const TELLING_TIME_PHRASES = [
  { english: "It's three o'clock.", arabic: "إنها الثالثة تماماً.", category: "Time", icon: Clock },
  { english: "It's five past three.", arabic: "إنها الثالثة وخمس دقائق.", category: "Time", icon: Clock },
  { english: "It's ten past three.", arabic: "إنها الثالثة وعشر دقائق.", category: "Time", icon: Clock },
  { english: "It's quarter past three.", arabic: "إنها الثالثة والربع.", category: "Time", icon: Clock },
  { english: "It's twenty past three.", arabic: "إنها الثالثة والثلث (وعشرون دقيقة).", category: "Time", icon: Clock },
  { english: "It's twenty-five past three.", arabic: "إنها الثالثة وخمس وعشرون دقيقة.", category: "Time", icon: Clock },
  { english: "It's half past three.", arabic: "إنها الثالثة والنصف.", category: "Time", icon: Clock },
  { english: "It's twenty-five to four.", arabic: "إنها الرابعة إلا خمس وعشرون دقيقة.", category: "Time", icon: Clock },
  { english: "It's twenty to four.", arabic: "إنها الرابعة إلا ثلث (إلا عشرون دقيقة).", category: "Time", icon: Clock },
  { english: "It's quarter to four.", arabic: "إنها الرابعة إلا ربع.", category: "Time", icon: Clock },
  { english: "It's ten to four.", arabic: "إنها الرابعة إلا عشر دقائق.", category: "Time", icon: Clock },
  { english: "It's five to four.", arabic: "إنها الرابعة إلا خمس دقائق.", category: "Time", icon: Clock },
  { english: "What time is it?", arabic: "كم الساعة؟", category: "Time", icon: MessageCircle },
  { english: "What's the time?", arabic: "كم الوقت؟", category: "Time", icon: MessageCircle },
  { english: "What day is it today?", arabic: "أي يوم من أيام الأسبوع اليوم؟", category: "Time", icon: MessageCircle },
  { english: "What day is it tomorrow?", arabic: "أي يوم من أيام الأسبوع غداً؟", category: "Time", icon: MessageCircle },
  { english: "What's the day today?", arabic: "ما تاريخ اليوم؟", category: "Time", icon: MessageCircle },
  { english: "What's the day tomorrow?", arabic: "ما تاريخ غدٍ؟", category: "Time", icon: MessageCircle },
  { english: "It's Monday today. Or Today is Monday.", arabic: "اليوم هو الاثنين.", category: "Time", icon: MessageCircle },
  { english: "It's Tuesday tomorrow. Or Tomorrow is Tuesday.", arabic: "غداً هو الثلاثاء.", category: "Time", icon: MessageCircle },
  { english: "It's three till three.", arabic: "إنها الثالثة إلا ثلاث دقائق.", category: "Time", icon: Clock },
  { english: "It's ten to three.", arabic: "إنها الثالثة إلا عشر دقائق.", category: "Time", icon: Clock },
  { english: "It's ten till three.", arabic: "إنها الثالثة إلا عشر دقائق.", category: "Time", icon: Clock },
  { english: "It's quarter to three.", arabic: "إنها الثالثة إلا ربع.", category: "Time", icon: Clock },
  { english: "It's quarter till three.", arabic: "إنها الثالثة إلا ربع.", category: "Time", icon: Clock },
  { english: "It's a quarter till three.", arabic: "إنها الثالثة إلا ربع.", category: "Time", icon: Clock },
  { english: "It's fifty minutes past the hour.", arabic: "إنها الخمسون دقيقة بعد الساعة العاشرة (العاشرة وخمسون دقيقة).", category: "Time", icon: Clock },
  { english: "The time is fifty minutes past the hour.", arabic: "الوقت هو العاشرة وخمسون دقيقة.", category: "Time", icon: Clock },
  { english: "It's forty-five past the hour.", arabic: "إنها الخامسة والأربعون دقيقة بعد الساعة الثانية (الثانية وخمس وأربعون دقيقة).", category: "Time", icon: Clock },
  { english: "The time is forty-five past the hour.", arabic: "الوقت هو الثانية وخمس وأربعون دقيقة.", category: "Time", icon: Clock },
  { english: "It's fifteen or thirty minutes past the hour... then say...", arabic: "الساعة الثالثة و 15 دقيقة أو 30 دقيقة... ثم قل...", category: "Time", icon: MessageCircle },
  { english: "It's fifteen past three.", arabic: "إنها الثالثة والربع (وخمس عشرة دقيقة).", category: "Time", icon: Clock },
  { english: "It's a quarter past three.", arabic: "إنها الثالثة والربع.", category: "Time", icon: Clock },
  { english: "It's thirty past three.", arabic: "إنها الثالثة والنصف.", category: "Time", icon: Clock },
  { english: "It's half past three.", arabic: "إنها الثالثة والنصف.", category: "Time", icon: Clock },
  { english: "It's forty minutes past the hour or tell you... at the hour.", arabic: "الساعة الثالثة و 40 دقيقة.. أو...", category: "Time", icon: MessageCircle },
  { english: "It's forty past three.", arabic: "إنها الثالثة وأربعون دقيقة (الرابعة إلا ثلث).", category: "Time", icon: Clock },
  { english: "The time is forty minutes past the hour.", arabic: "الساعة الثالثة وأربعون دقيقة.", category: "Time", icon: Clock },
  { english: "It's twenty to three.", arabic: "إنها الثالثة إلا ثلث.", category: "Time", icon: Clock },
  { english: "It's twenty till three.", arabic: "إنها الثالثة إلا عشرون دقيقة.", category: "Time", icon: Clock },
  { english: "It's two fifty.", arabic: "إنها الثانية وخمسون دقيقة.", category: "Time", icon: Clock },
  { english: "It's two forty-five.", arabic: "إنها الثانية وخمس وأربعون دقيقة.", category: "Time", icon: Clock },
  { english: "It's two forty.", arabic: "إنها الثانية وأربعون دقيقة.", category: "Time", icon: Clock },
  { english: "I think my watch needs a new battery.", arabic: "أعتقد أن ساعتي بحاجة إلى بطارية جديدة.", category: "Time", icon: MessageCircle },
  { english: "Is this clock right?", arabic: "هل هذه الساعة مضبوطة؟", category: "Time", icon: MessageCircle },
  { english: "Is this clock fast/slow?", arabic: "هل هذه الساعة سريعة/بطيئة؟", category: "Time", icon: MessageCircle },
  { english: "My watch is running fast/slowly.", arabic: "ساعتي تجري بسرعة/بطء.", category: "Time", icon: MessageCircle },
  { english: "This clock is fast/slow.", arabic: "هذه الساعة سريعة/بطيئة.", category: "Time", icon: MessageCircle },
  { english: "When a timepiece is not accurate:", arabic: "عندما لا تكون الساعة دقيقة / مخرفة:", category: "Time", icon: MessageCircle },
  { english: "It is not accurate.", arabic: "إنها ليست دقيقة.", category: "Time", icon: MessageCircle },
];

export const GENERAL_PHRASES = [
  { english: "Ahmed is short.", arabic: "أحمد قصير.", category: "Appearance", icon: MessageCircle },
  { english: "They are tall.", arabic: "هم طوال القامة.", category: "Appearance", icon: MessageCircle },
  { english: "A thin woman.", arabic: "امرأة نحيفة.", category: "Appearance", icon: MessageCircle },
  { english: "He is a tall boy.", arabic: "هو ولد طويل.", category: "Appearance", icon: MessageCircle },
  { english: "Ahmed is not tall.", arabic: "أحمد ليس طويلاً.", category: "Appearance", icon: MessageCircle },
  { english: "He is not healthy.", arabic: "هو ليس بصحة جيدة.", category: "Health", icon: MessageCircle },
  { english: "You are not healthy.", arabic: "أنت لست بصحة جيدة.", category: "Health", icon: MessageCircle },
  { english: "You are not weak.", arabic: "أنت لست ضعيفاً.", category: "Health", icon: MessageCircle },
  { english: "Menna is good.", arabic: "منة جيدة.", category: "General", icon: MessageCircle },
  { english: "We are good.", arabic: "نحن جيدون.", category: "General", icon: MessageCircle },
  { english: "I am fine.", arabic: "أنا بخير.", category: "General", icon: MessageCircle },
  { english: "I am not fine.", arabic: "لست بخير.", category: "General", icon: MessageCircle },
  { english: "A beautiful girl.", arabic: "فتاة جميلة.", category: "General", icon: MessageCircle },
  { english: "They are trees.", arabic: "تلك أشجار.", category: "General", icon: MessageCircle },
  { english: "The chocolates aren't here yet.", arabic: "الشوكولاتة ليست هنا بعد.", category: "General", icon: MessageCircle },
  { english: "We are happy.", arabic: "نحن سعداء.", category: "Feelings", icon: MessageCircle },
  { english: "I am happy.", arabic: "أنا سعيد.", category: "Feelings", icon: MessageCircle },
  { english: "I am not happy.", arabic: "أنا لست سعيداً.", category: "Feelings", icon: MessageCircle },
];

export const PERSONAL_INFO_PHRASES = [
  { english: "I am Philip.", arabic: "أنا فيليب.", category: "Personal Info", icon: MessageCircle },
  { english: "I am 37.", arabic: "أنا عمري 37.", category: "Personal Info", icon: MessageCircle },
  { english: "I am rich.", arabic: "أنا غني.", category: "Personal Info", icon: MessageCircle },
  { english: "I am from Sudan.", arabic: "أنا من السودان.", category: "Personal Info", icon: MessageCircle },
  { english: "I am your king.", arabic: "أنا ملكك.", category: "Personal Info", icon: MessageCircle },
  { english: "He is a friend.", arabic: "هو صديق.", category: "Personal Info", icon: MessageCircle },
  { english: "They are friends.", arabic: "هم أصدقاء.", category: "Personal Info", icon: MessageCircle },
  { english: "We are not friends.", arabic: "لسنا أصدقاء.", category: "Personal Info", icon: MessageCircle },
  { english: "They aren't friends.", arabic: "هم ليسوا أصدقاء.", category: "Personal Info", icon: MessageCircle },
  { english: "You are not Jack.", arabic: "أنت لست جاك.", category: "Personal Info", icon: MessageCircle },
  { english: "Mike is not your friend.", arabic: "مايك ليس صديقك.", category: "Personal Info", icon: MessageCircle },
];

export const JOBS_PHRASES = [
  { english: "He is an engineer.", arabic: "هو مهندس.", category: "Jobs", icon: MessageCircle },
  { english: "They are doctors.", arabic: "هم أطباء.", category: "Jobs", icon: MessageCircle },
  { english: "She is a nurse.", arabic: "هي ممرضة.", category: "Jobs", icon: MessageCircle },
  { english: "We are football players.", arabic: "نحن لاعبو كرة قدم.", category: "Jobs", icon: MessageCircle },
  { english: "She is a doctor.", arabic: "هي طبيبة.", category: "Jobs", icon: MessageCircle },
  { english: "He is a doctor.", arabic: "هو طبيب.", category: "Jobs", icon: MessageCircle },
  { english: "A short doctor.", arabic: "طبيب قصير.", category: "Jobs", icon: MessageCircle },
  { english: "He is an artist.", arabic: "هو فنان.", category: "Jobs", icon: MessageCircle },
  { english: "Amy is a doctor.", arabic: "إيمي طبيبة.", category: "Jobs", icon: MessageCircle },
  { english: "Jack is a police officer.", arabic: "جاك ضابط شرطة.", category: "Jobs", icon: MessageCircle },
  { english: "I am a farmer.", arabic: "أنا مزارع.", category: "Jobs", icon: MessageCircle },
  { english: "I am not a doctor.", arabic: "أنا لست طبيباً.", category: "Jobs", icon: MessageCircle },
  { english: "She is not a nurse.", arabic: "هي ليست ممرضة.", category: "Jobs", icon: MessageCircle },
  { english: "She isn't a doctor.", arabic: "هي ليست طبيبة.", category: "Jobs", icon: MessageCircle },
];

export const CALENDAR_PHRASES = [
  { english: "January is the first month of the year.", arabic: "يناير هو أول شهر في السنة.", category: "Calendar", icon: MessageCircle },
  { english: "February is the second month of the year.", arabic: "فبراير هو ثاني شهر في السنة.", category: "Calendar", icon: MessageCircle },
  { english: "My birthday is in August.", arabic: "عيد ميلادي في أغسطس.", category: "Calendar", icon: MessageCircle },
  { english: "Summer is hot.", arabic: "الصيف حار.", category: "Seasons", icon: MessageCircle },
  { english: "Winter is cold.", arabic: "الشتاء بارد.", category: "Seasons", icon: MessageCircle },
  { english: "I play football on Fridays.", arabic: "ألعب كرة القدم أيام الجمعة.", category: "Calendar", icon: MessageCircle },
];

export const PRONOUN_PHRASES = [
  { english: "I love Mona. I love her.", arabic: "أنا أحب منى. أنا أحبها.", category: "Pronouns", icon: MessageCircle },
  { english: "This is my car.", arabic: "هذه سيارتي.", category: "Pronouns", icon: MessageCircle },
  { english: "He gave her my car.", arabic: "هو أعطاها سيارتي.", category: "Pronouns", icon: MessageCircle },
  { english: "We eat our pizza.", arabic: "نحن نأكل البيتزا الخاصة بنا.", category: "Pronouns", icon: MessageCircle },
  { english: "She is Ahmed.", arabic: "هي أحمد (خطأ مقصود للتصحيح).", category: "Grammar Exercises", icon: MessageCircle },
];

export const CLASSROOM_PHRASES = [
  { english: "What's number 1?", arabic: "ما هو رقم 1؟", category: "Classroom", icon: MessageCircle },
  { english: "It's an eraser.", arabic: "إنها ممحاة.", category: "Classroom", icon: MessageCircle },
  { english: "I have an eraser.", arabic: "معي ممحاة.", category: "Classroom", icon: MessageCircle },
  { english: "I don't have a ruler.", arabic: "ليس معي مسطرة.", category: "Classroom", icon: MessageCircle },
];

export const I_SPY_DIALOGUE = [
  {
    id: 5,
    title: "I Spy Game",
    dialogue: [
      { speaker: "A", text: "I spy something that begins with C.", arabic: "أنا أرى شيئاً يبدأ بحرف السي." },
      { speaker: "B", text: "Is it a clock?", arabic: "هل هي ساعة حائط؟" },
      { speaker: "A", text: "No, it isn't.", arabic: "لا، ليست كذلك." },
      { speaker: "C", text: "Is it a chair?", arabic: "هل هو كرسي؟" },
      { speaker: "A", text: "Yes, it is.", arabic: "نعم، هو كذلك." },
    ]
  }
];

export const DEMONSTRATIVE_PHRASES = [
  { english: "This car is dirty.", arabic: "هذه السيارة متسخة.", category: "Demonstratives", icon: MessageCircle },
  { english: "That star is my favourite.", arabic: "تلك النجمة هي المفضلة لدي.", category: "Demonstratives", icon: MessageCircle },
  { english: "These letters are very important.", arabic: "هذه الرسائل مهمة جداً.", category: "Demonstratives", icon: MessageCircle },
  { english: "I don't know the name of those birds.", arabic: "أنا لا أعرف اسم تلك الطيور.", category: "Demonstratives", icon: MessageCircle },
];

export const THERE_IS_PHRASES = [
  { english: "There are five chairs in that room.", arabic: "يوجد خمسة كراسي في تلك الغرفة.", category: "Grammar", icon: MessageCircle },
  { english: "There is one table in this room.", arabic: "يوجد طاولة واحدة في هذه الغرفة.", category: "Grammar", icon: MessageCircle },
  { english: "There is a cat standing right there.", arabic: "يوجد قطة تقف هناك تماماً.", category: "Grammar", icon: MessageCircle },
];

export const DIAGNOSTIC_PHRASES = [
  { english: "The shop is open.", arabic: "المحل مفتوح.", category: "Is/Are", icon: MessageCircle },
  { english: "The shops are open.", arabic: "المحلات مفتوحة.", category: "Is/Are", icon: MessageCircle },
  { english: "My hands are cold.", arabic: "يداي باردتان.", category: "Is/Are", icon: MessageCircle },
  { english: "My nose is cold.", arabic: "أنفي بارد.", category: "Is/Are", icon: MessageCircle },
  { english: "My feet are cold.", arabic: "قدماي باردتان.", category: "Is/Are", icon: MessageCircle },
  { english: "Where is my camera?", arabic: "أين كاميرتي؟", category: "Is/Are", icon: MessageCircle },
  { english: "Where are my glasses?", arabic: "أين نظارتي؟", category: "Is/Are", icon: MessageCircle },
  { english: "Where are the children?", arabic: "أين الأطفال؟", category: "Is/Are", icon: MessageCircle },
  { english: "Your coat is dirty.", arabic: "معطفك متسخ.", category: "Is/Are", icon: MessageCircle },
  { english: "Your jeans are dirty.", arabic: "بنطالك الجينز متسخ.", category: "Is/Are", icon: MessageCircle },
  { english: "Who are those men?", arabic: "من هؤلاء الرجال؟", category: "Is/Are", icon: MessageCircle },
  { english: "Who is that woman?", arabic: "من تلك المرأة؟", category: "Is/Are", icon: MessageCircle },
  { english: "Who are those people?", arabic: "من هؤلاء الناس؟", category: "Is/Are", icon: MessageCircle },
  { english: "Mice are small animals.", arabic: "الفئران حيوانات صغيرة.", category: "Is/Are", icon: MessageCircle },
  { english: "Where are the scissors?", arabic: "أين المقص؟", category: "Is/Are", icon: MessageCircle },
  { english: "Where are my clothes?", arabic: "أين ملابسي؟", category: "Is/Are", icon: MessageCircle },
];

export const DEMONSTRATIVE_PHRASES_EXTENDED = [
  { english: "Who broke this?", arabic: "من كسر هذا؟", category: "Demonstratives", icon: MessageCircle },
  { english: "Can I eat this?", arabic: "هل يمكنني أكل هذا؟", category: "Demonstratives", icon: MessageCircle },
  { english: "That is an apple.", arabic: "ذلك تفاحة.", category: "Demonstratives", icon: MessageCircle },
  { english: "Can I see that one?", arabic: "هل يمكنني رؤية ذلك الواحد؟", category: "Demonstratives", icon: MessageCircle },
  { english: "Those are my apples.", arabic: "تلك هي تفاحاتي.", category: "Demonstratives", icon: MessageCircle },
  { english: "What was that noise?", arabic: "ماذا كان ذلك الضجيج؟", category: "Demonstratives", icon: MessageCircle },
  { english: "These are balls.", arabic: "هذه كرات.", category: "Demonstratives", icon: MessageCircle },
  { english: "These dogs are big.", arabic: "هذه الكلاب كبيرة.", category: "Demonstratives", icon: MessageCircle },
  { english: "Those apples are big.", arabic: "تلك التفاحات كبيرة.", category: "Demonstratives", icon: MessageCircle },
  { english: "Is that true?", arabic: "هل هذا صحيح؟", category: "Demonstratives", icon: MessageCircle },
  { english: "Those pearls look real.", arabic: "تلك اللآلئ تبدو حقيقية.", category: "Demonstratives", icon: MessageCircle },
  { english: "These things aren't mine!", arabic: "هذه الأشياء ليست لي!", category: "Demonstratives", icon: MessageCircle },
  { english: "This is a ball.", arabic: "هذه كرة.", category: "Demonstratives", icon: MessageCircle },
  { english: "Those are apples.", arabic: "تلك تفاحات.", category: "Demonstratives", icon: MessageCircle },
  { english: "This isn't fair.", arabic: "هذا ليس عدلاً.", category: "Demonstratives", icon: MessageCircle },
  { english: "Whose shoes are those?", arabic: "لمن تلك الأحذية؟", category: "Demonstratives", icon: MessageCircle },
];

export const SENTENCES_DATA = [
  ...TELLING_TIME_PHRASES,
  ...GENERAL_PHRASES,
  ...PERSONAL_INFO_PHRASES,
  ...JOBS_PHRASES,
  ...CALENDAR_PHRASES,
  ...PRONOUN_PHRASES,
  ...CLASSROOM_PHRASES,
  ...DEMONSTRATIVE_PHRASES,
  ...THERE_IS_PHRASES,
  ...DIAGNOSTIC_PHRASES,
  ...DEMONSTRATIVE_PHRASES_EXTENDED,
  { english: "What's your name?", arabic: "ما اسمك؟", category: "Wh-Questions", icon: MessageCircle },
  { english: "Where are you from?", arabic: "من أين أنت؟", category: "Wh-Questions", icon: MessageCircle },
  { english: "How are you?", arabic: "كيف حالك؟", category: "Wh-Questions", icon: MessageCircle },
  { english: "Who's that?", arabic: "من هذا؟", category: "Wh-Questions", icon: MessageCircle },
  { english: "How old is she?", arabic: "كم عمرها؟", category: "Wh-Questions", icon: MessageCircle },
  { english: "Who are they?", arabic: "من هم؟", category: "Wh-Questions", icon: MessageCircle },
  { english: "I have a car.", arabic: "عندي سيارة.", category: "Grammar", icon: MessageCircle },
  { english: "I do my homework.", arabic: "أمارس واجباتي المنزلية.", category: "Grammar", icon: MessageCircle },
  { english: "Jennifer is beautiful.", arabic: "جنيفر جميلة.", category: "Grammar", icon: MessageCircle },
  { english: "You are late.", arabic: "أنت متأخر.", category: "Grammar", icon: MessageCircle },
  { english: "They do exercise.", arabic: "هم يتمرنون.", category: "Grammar", icon: MessageCircle },
  { english: "This is a book. It's on the desk.", arabic: "هذا كتاب. إنه على المكتب.", category: "Demonstratives", icon: MessageCircle },
  { english: "This is a notebook. It's on the table.", arabic: "هذا دفتر ملاحظات. إنه على الطاولة.", category: "Demonstratives", icon: MessageCircle },
  { english: "That's a clock. It's on the wall.", arabic: "تلك ساعة. إنها على الحائط.", category: "Demonstratives", icon: MessageCircle },
  { english: "That's a wastebasket. It's on the floor.", arabic: "تلك سلة مهملات. إنها على الأرض.", category: "Demonstratives", icon: MessageCircle },
];

