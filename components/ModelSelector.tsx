
import React from 'react';
import type { ModelId } from '../types';
import { GEMINI_MODELS, OPENAI_MODELS } from '../constants';

interface ModelSelectorProps {
  currentModel: ModelId;
  onModelChange: (modelId: ModelId) => void;
  disabled: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  currentModel,
  onModelChange,
  disabled,
}) => {
  return (
    <div className="relative">
      <select
        value={currentModel}
        onChange={(e) => onModelChange(e.target.value as ModelId)}
        disabled={disabled}
        className="appearance-none bg-gray-600 text-white text-sm font-medium py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50"
      >
        <optgroup label="Google Gemini">
          {GEMINI_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="OpenAI">
          {OPENAI_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </optgroup>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
