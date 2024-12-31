import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PDFViewer } from './components/PDFViewer';
import { BookOpen } from 'lucide-react';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">READF 3000</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!selectedFile ? (
          <FileUpload onFileSelect={setSelectedFile} />
        ) : (
          <PDFViewer file={selectedFile} />
        )}
      </main>
    </div>
  );
}

export default App;