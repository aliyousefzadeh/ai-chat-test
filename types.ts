
export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
}

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  content: string;
  timestamp: string;
  fileInfo?: FileInfo;
}

export type ModelId = 'gemini-2.5-flash' | 'gemini-1.5-pro' | 'gpt-4o' | 'gpt-4' | 'gpt-3.5-turbo' | 'dall-e-3';

export interface ModelInfo {
    id: ModelId;
    name: string;
    group: 'Google Gemini' | 'OpenAI';
    capabilities: {
        imageInput: boolean;
    };
}
