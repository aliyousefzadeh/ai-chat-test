
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, ModelId } from '../types';
import { ModelSelector } from './ModelSelector';
import { SendIcon, PaperclipIcon } from './icons';
import { FileUploadPreview } from './FileUploadPreview';
import { ACCEPTED_FILE_TYPES } from '../constants';

interface ChatInputFormProps {
  isLoading: boolean;
  onSendMessage: (prompt: string, file?: File) => void;
  currentModel: ModelId;
  onModelChange: (modelId: ModelId) => void;
}

export const ChatInputForm: React.FC<ChatInputFormProps> = ({
  isLoading,
  onSendMessage,
  currentModel,
  onModelChange,
}) => {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        if(ACCEPTED_FILE_TYPES[selectedFile.type] === undefined) {
            alert(`File type ${selectedFile.type} is not supported.`);
            return;
        }
        setFile(selectedFile);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading || (!prompt.trim() && !file)) return;
    onSendMessage(prompt, file || undefined);
    setPrompt('');
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-3">
      {file && (
          <FileUploadPreview file={file} onRemove={() => setFile(null)} />
      )}
      <div className="flex items-center gap-2 p-1 bg-gray-700 rounded-xl shadow-lg">
        <ModelSelector
          currentModel={currentModel}
          onModelChange={onModelChange}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="p-3 text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors duration-200 disabled:opacity-50"
          aria-label="Attach file"
        >
          <PaperclipIcon />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={Object.keys(ACCEPTED_FILE_TYPES).join(',')}
        />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleFormSubmit(e);
            }
          }}
          placeholder="Type your message or upload a file..."
          rows={1}
          className="flex-1 bg-transparent resize-none p-2 focus:outline-none text-gray-100 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || (!prompt.trim() && !file)}
          className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};
