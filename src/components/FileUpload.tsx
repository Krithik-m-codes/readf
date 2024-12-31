import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-lg font-medium text-gray-600">Upload PDF</span>
        <span className="text-sm text-gray-500">or drag and drop</span>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};