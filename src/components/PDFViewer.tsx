import React, { useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFControls } from './PDFControls';
import { SelectionHighlight } from './SelectionHighlight';
import { usePDFNavigation } from '../hooks/usePDFNavigation';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { numPages, setNumPages, pageNumber, nextPage, prevPage } = usePDFNavigation();
  const { isReading, setCurrentText, toggleReading, selectedText, setSelectedText } = useTextToSpeech();
  const { scrollToNextPage } = useAutoScroll(pageRef, isReading);

  useEffect(() => {
    if (!isReading) {
      setSelectedText('');
    }
  }, [isReading]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
      setCurrentText(selection.toString());
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 md:px-0">
      <PDFControls
        pageNumber={pageNumber}
        numPages={numPages}
        isReading={isReading}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onToggleReading={toggleReading}
        hasSelection={!!selectedText}
      />

      <motion.div 
        className="flex justify-center bg-white p-4 md:p-8 rounded-lg shadow-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={pageRef}
      >
        <AnimatePresence mode="wait">
          {file && (
            <Document
              file={file}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="flex justify-center w-full"
            >
              <motion.div
                key={pageNumber}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center w-full"
              >
                <Page
                  pageNumber={pageNumber}
                  onLoadSuccess={(page) => {
                    page.getTextContent().then((textContent) => {
                      const text = textContent.items.map((item: any) => item.str).join(' ');
                      if (!selectedText) {
                        setCurrentText(text);
                      }
                      // Add event listener after a small delay to ensure text layer is rendered
                      setTimeout(() => {
                        const textLayer = pageRef.current?.querySelector('.react-pdf__Page__textContent');
                        if (textLayer) {
                          textLayer.addEventListener('mouseup', handleTextSelection);
                        }
                      }, 100);
                    });
                  }}
                  className="max-w-full"
                  renderTextLayer={true}
                />
              </motion.div>
            </Document>
          )}
        </AnimatePresence>
        {selectedText && isReading && (
          <SelectionHighlight text={selectedText} />
        )}
      </motion.div>
    </div>
  );
};