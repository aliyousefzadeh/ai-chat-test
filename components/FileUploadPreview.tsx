
import React from 'react';

interface FileUploadPreviewProps {
  file: File;
  onRemove: () => void;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}


export const FileUploadPreview: React.FC<FileUploadPreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-gray-700/50 p-2 rounded-lg text-sm">
      <div className="flex items-center gap-2 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
        <span className="truncate text-gray-200">{file.name}</span>
        <span className="text-gray-400 flex-shrink-0">({formatFileSize(file.size)})</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-1 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors duration-150"
        aria-label="Remove file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
