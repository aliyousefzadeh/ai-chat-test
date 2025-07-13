
import React, { useState, useEffect, useCallback } from 'react';
import { ChatInterface } from './components/ChatInterface';
import type { ChatMessage, ModelId } from './types';
import { MessageAuthor } from './types';
import { streamGeminiResponse } from './services/geminiService';
import { streamOpenAIResponse } from './services/openaiService';
import { ALL_MODELS } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentModel, setCurrentModel] = useState<ModelId>(ALL_MODELS[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
         setMessages([
          {
            id: 'init',
            author: MessageAuthor.AI,
            content: 'Hello! How can I help you today? Select a model and ask me anything.',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
      const savedModel = localStorage.getItem('selectedModel');
      if (savedModel) {
        setCurrentModel(savedModel as ModelId);
      }
    } catch (e) {
      console.error("Failed to parse chat history from localStorage", e);
      setError("Could not load previous session.");
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch(e) {
        console.error("Failed to save chat history to localStorage", e);
        setError("Could not save chat session. Your history may not be saved.");
    }
  }, [messages]);
  
  useEffect(() => {
    localStorage.setItem('selectedModel', currentModel);
  }, [currentModel]);

  const handleSendMessage = useCallback(async (prompt: string, file?: File) => {
    if (!prompt.trim() && !file) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      author: MessageAuthor.USER,
      content: prompt,
      fileInfo: file ? { name: file.name, type: file.type, size: file.size } : undefined,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: ChatMessage = {
        id: aiMessageId,
        author: MessageAuthor.AI,
        content: '',
        timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, aiMessage]);

    try {
      const chatHistory = messages.filter(m => m.id !== 'init');
      const isGemini = currentModel.startsWith('gemini');
      const stream = isGemini
          ? streamGeminiResponse(currentModel, chatHistory, userMessage, file)
          : streamOpenAIResponse(currentModel, chatHistory, userMessage, file);    

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg
          )
        );
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, content: `Sorry, I encountered an error. ${errorMessage}` } : msg
          )
        );
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init',
        author: MessageAuthor.AI,
        content: 'Hello! My Name is Ali, How can I assist you now?',
        timestamp: new Date().toISOString(),
      },
    ]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-gray-100 font-sans">
       <header className="bg-gray-900 p-4 shadow-md flex justify-between items-center z-20">
        <h1 className="text-xl font-bold text-white">AI Chat Interface</h1>
        <button
          onClick={handleClearChat}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Clear Chat
        </button>
      </header>
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={handleSendMessage}
        currentModel={currentModel}
        onModelChange={setCurrentModel}
      />
    </div>
  );
};

export default App;
