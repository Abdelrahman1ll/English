import { LEVEL_DATA } from "../data/levels/index.js";

/**
 * AI Service for English Learning Assistant
 * Supports Gemini API with fallback for development.
 */

interface Message {
  role: "user" | "model" | "system";
  content: string;
}

interface UserMemory {
  userName?: string;
  commonMistakes: string[];
  learnedTopics: string[];
  facts: string[];
}

export class AIService {
  private static instance: AIService;
  private apiKey: string = "";
  private memory: UserMemory = {
    commonMistakes: [],
    learnedTopics: [],
    facts: [],
  };

  private constructor() {
    this.apiKey = (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY || "";
    this.loadMemory();
  }

  private loadMemory() {
    const saved = localStorage.getItem("ai_student_memory");
    if (saved) {
      try {
        this.memory = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load memory:", e);
      }
    }
  }

  private saveMemory() {
    localStorage.setItem("ai_student_memory", JSON.stringify(this.memory));
  }

  public getMemory() {
    return this.memory;
  }

  public updateMemory(update: Partial<UserMemory>) {
    this.memory = { ...this.memory, ...update };
    this.saveMemory();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Builds the curriculum context for the AI
   */
  private getCurriculumContext(): string {
    const a1 = LEVEL_DATA["A1"];
    if (!a1) return "Basic English A1 Curriculum.";

    const categories = Object.keys(a1.vocabulary || {});
    const grammarTopics = Object.keys(a1.grammar || {});
    
    const memoryContext = `
USER INFORMATION (MEMO):
- Name: ${this.memory.userName || "Unknown"}
- Known Facts about user: ${this.memory.facts.join(", ") || "None yet"}
- Topics they've practiced: ${this.memory.learnedTopics.join(", ") || "None yet"}
- Recurring mistakes to watch for: ${this.memory.commonMistakes.join(", ") || "None yet"}
    `;

    return `
You are an AI Student Assistant for an English Learning App. 
The current level is A1.

${memoryContext}

Curriculum Topics: ${categories.join(", ")}.
Grammar Topics: ${grammarTopics.join(", ")}.

Instructions:
- Keep answers simple and suitable for A1 level students.
- Be encouraging and friendly. ✨
- **English Correction (CRITICAL)**: If the student makes a grammatical error, uses a word incorrectly, or has a spelling mistake, you MUST gently correct them. Start your response with a "Learning Moment" emoji 🎓 and show the corrected version.
- **Learning & Memory**: You are capable of remembering facts about the student. If they mention their name, favorite color, or a hobby, acknowledge it and say "I'll remember that!" 🧠
- If they repeat a "Recurring mistake" listed above, be extra patient and provide a small tip.
- In your responses, use the student's name (${this.memory.userName || "the student"}).
- Always wrap specific "Memory Updates" (new facts learned about the user) in a special tagged format at the END of your response like this: [UPDATE_MEMORY: user name is Ahmed, likes football]. I will use this to update my persistent records.
- Avoid complex idioms unless explaining them simply.
- Use emojis to make it fun! 
- Encourage them to try speaking the corrected version back to you.
`;
  }

  /**
   * Sends a message to the AI
   */
  public async sendMessage(userMessage: string, history: Message[] = []): Promise<string> {
    if (!this.apiKey) {
      return this.getMockResponse(userMessage);
    }

    try {
      const systemPrompt = this.getCurriculumContext();
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: systemPrompt }] },
              { role: "model", parts: [{ text: "Understood. I am now your personal English Mentor. I have accessed my memory logs and I am ready to help you grow! 🎓🧠" }] },
              ...history.map(m => ({
                role: m.role === "system" ? "user" : m.role,
                parts: [{ text: m.content }]
              })),
              { role: "user", parts: [{ text: userMessage }] }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300,
            }
          }),
        }
      );

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't think of a response. 😅";
      
      // Parse Memory Updates
      this.parseMemoryUpdates(rawText);
      
      // Clean the text from memory update tags before returning to UI
      return rawText.replace(/\[UPDATE_MEMORY:.*?\]/g, "").trim();
    } catch (error) {
      console.error("AI Service Error:", error);
      return "Oops! I'm having a little trouble connecting. Let's try again in a moment! 🌟";
    }
  }

  private parseMemoryUpdates(text: string) {
    const match = text.match(/\[UPDATE_MEMORY:(.*?)\]/);
    if (match) {
      const updates = match[1].split(",").map(s => s.trim());
      updates.forEach(update => {
        if (update.toLowerCase().includes("name is")) {
          const name = update.split("is")[1].trim();
          this.updateMemory({ userName: name });
        } else if (update.toLowerCase().includes("likes")) {
          const hobby = update.trim();
          if (!this.memory.facts.includes(hobby)) {
            this.updateMemory({ facts: [...this.memory.facts, hobby] });
          }
        } else if (update.toLowerCase().includes("topic")) {
          const topic = update.split("topic")[1].trim();
          if (!this.memory.learnedTopics.includes(topic)) {
            this.updateMemory({ learnedTopics: [...this.memory.learnedTopics, topic] });
          }
        }
      });
    }
  }

  private getMockResponse(input: string): string {
    const lower = input.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello! I'm your English assistant. I'm here to help you learn A1 English! What should we practice today? 😊";
    }
    if (lower.includes("color")) {
      return "Colors are fun! In Level A1, we learn Red, Blue, Green, and more. Would you like to see the Colors page? 🎨";
    }
    return "That's a great question! (Note: Connect your Gemini API key in .env to get full AI responses). Keep practicing! 🚀";
  }
}

export const aiService = AIService.getInstance();
