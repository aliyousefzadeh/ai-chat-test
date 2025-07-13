
import React from 'react';
import { BotIcon } from './icons';

export const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-teal-500">
        <BotIcon />
      </div>
      <div className="flex items-center gap-2 bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-none">
        <span className="text-gray-400">Thinking</span>
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
