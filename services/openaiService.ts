// File: src/services/openaiService.ts
import { ChatMessage, ModelId } from '../types';

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
//const defaultModel = 'gpt-4';

export async function* streamOpenAIResponse(
  model: ModelId,
  chatHistory: ChatMessage[],
  userMessage: ChatMessage,
  file?: File
): AsyncGenerator<string> {
  const messages = [...chatHistory, userMessage].map(m => ({
    role: m.author === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!response.body) {
    throw new Error('No response body from OpenAI API');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    const chunk = decoder.decode(value);

    for (const line of chunk.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('data:')) {
        const jsonStr = trimmed.replace('data: ', '');
        if (jsonStr === '[DONE]') return;
        try {
          const data = JSON.parse(jsonStr);
          const content = data.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch (err) {
          console.error('Error parsing stream chunk:', err);
        }
      }
    }
  }
}

export default {
  streamOpenAIResponse
};
