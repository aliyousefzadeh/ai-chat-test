
import type { ModelInfo } from './types';

export const GEMINI_MODELS: ModelInfo[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    group: 'Google Gemini',
    capabilities: {
      imageInput: true,
    },
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    group: 'Google Gemini',
    capabilities: {
      imageInput: true,
    },
  },
];

export const OPENAI_MODELS: ModelInfo[] = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        group: 'OpenAI',
        capabilities: {
            imageInput: true,
        },
    },
    {
        id: 'gpt-4',
        name: 'GPT-4',
        group: 'OpenAI',
        capabilities: {
            imageInput: false,
        },
    },
    {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        group: 'OpenAI',
        capabilities: {
            imageInput: false,
        },
    },
    {
        id: 'dall-e-3',
        name: 'DALL-E 3',
        group: 'OpenAI',
        capabilities: {
            imageInput: true,
        }
    }
];

export const ALL_MODELS: ModelInfo[] = [...GEMINI_MODELS, ...OPENAI_MODELS];

export const ACCEPTED_FILE_TYPES = {
    'image/jpeg': [],
    'image/png': [],
    'image/webp': [],
    'image/heic': [],
    'image/heif': [],
    'text/plain': [],
    'application/pdf': [],
    'text/csv': [],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [], // .docx
};
