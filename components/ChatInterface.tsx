// Updated ChatInterface.tsx with model selector dropdown
import React from 'react';
import type { ChatMessage, ModelId } from '../types';
import { MessageList } from './MessageList';
import { ChatInputForm } from './ChatInputForm';
import { ALL_MODELS } from '../constants';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (prompt: string, file?: File) => void;
  currentModel: ModelId;
  onModelChange: (modelId: ModelId) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  error,
  onSendMessage,
  currentModel,
  onModelChange,
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-end p-2 bg-gray-900 border-b border-gray-700">
        <select
          className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
          value={currentModel}
          onChange={(e) => onModelChange(e.target.value as ModelId)}
        >
          {ALL_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.group}: {model.name}
            </option>
          ))}
        </select>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-2 rounded-md mb-2 text-sm">
            {error}
          </div>
        )}
        <ChatInputForm
          isLoading={isLoading}
          onSendMessage={onSendMessage}
          currentModel={currentModel}
          onModelChange={onModelChange}
        />
      </div>
    </div>
  );
};
