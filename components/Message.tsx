
import React from 'react';
import type { ChatMessage } from '../types';
import { MessageAuthor } from '../types';
import { UserIcon, BotIcon } from './icons';

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser ? 'bg-indigo-500' : 'bg-teal-500'
        }`}
      >
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl max-w-lg md:max-w-xl lg:max-w-2xl whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-indigo-600 rounded-br-none'
              : 'bg-gray-700 rounded-bl-none'
          }`}
        >
          <p>{message.content}</p>
          {message.fileInfo && (
            <div className="mt-2 p-2 bg-black/20 rounded-lg border border-gray-500/50 text-xs">
              <p className="font-semibold">Attached File:</p>
              <p>{message.fileInfo.name}</p>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>
  );
};
