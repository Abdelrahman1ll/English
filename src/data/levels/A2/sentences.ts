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
];

export const SENTENCES_DATA = [
  ...TELLING_TIME_PHRASES,
];
