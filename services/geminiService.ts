import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// Lazy initialization to prevent "process is not defined" crash on module load
let aiInstance: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!aiInstance) {
    // CRITICAL: We use process.env.API_KEY as strictly instructed.
    // Accessed inside function to be safe.
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiInstance;
};

export const initializeChat = (): Chat => {
  if (!chatSession) {
    const ai = getAiClient();
    chatSession = ai.chats.create({
      model: 'gemini-flash-lite-latest',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async function* (message: string): AsyncGenerator<string, void, unknown> {
  const chat = initializeChat();
  
  try {
    const resultStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    yield "I'm currently experiencing high traffic or a connection issue. Please try again later.";
  }
};

export const generateProjectDescription = async (title: string, techStack: string[]): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `Write a concise, engaging, professional portfolio description (max 30 words) for a software project named "${title}" built with ${techStack.join(', ')}. Focus on the value proposition and technical achievement. Do not use quotes.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });
    
    return response.text || "Description unavailable.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Project description currently unavailable.";
  }
};