import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import type { ChatMessage, ModelId } from "../types";
import { MessageAuthor } from "../types";

// Note: API_KEY is expected to be set in the environment variables.
// Do not hardcode the API key here.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey });


const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

// Only stream responses for Gemini models for now
export async function* streamGeminiResponse(
  model: string,
  history: ChatMessage[],
  latestMessage: ChatMessage,
  file?: File
): AsyncGenerator<string, void, undefined> {

  const chat: Chat = ai.chats.create({ 
      model: model,
      // History format for gemini is slightly different
      history: history.map(msg => ({
        role: msg.author === MessageAuthor.USER ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
  });

  const promptParts: Part[] = [{ text: latestMessage.content }];

  if (file) {
    try {
        const filePart = await fileToGenerativePart(file);
        promptParts.unshift(filePart);
    } catch(e) {
        console.error("Error converting file to generative part:", e);
        throw new Error("Failed to process the uploaded file.");
    }
  }

  try {
    const result = await chat.sendMessageStream({ message: promptParts });
    for await (const chunk of result) {
      // The type of chunk is GenerateContentResponse
      yield chunk.text;
    }
  } catch(e) {
    console.error("Error streaming chat response:", e);
    throw new Error("Could not get a response from the AI. The model may be overloaded or the request may be invalid.");
  }
}
