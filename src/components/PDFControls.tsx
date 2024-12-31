import React from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsDialog } from './SettingsDialog';
import { useSettings } from '../hooks/useSettings';

interface PDFControlsProps {
  pageNumber: number;
  numPages: number;
  isReading: boolean;
  hasSelection: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onToggleReading: () => void;
}

export const PDFControls: React.FC<PDFControlsProps> = ({
  pageNumber,
  numPages,
  isReading,
  hasSelection,
  onPrevPage,
  onNextPage,
  onToggleReading,
}) => {
  const { settings, isSettingsOpen, setIsSettingsOpen, updateSetting } = useSettings();

  return (
    <>
      <motion.div 
        className="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4 sticky top-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevPage}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 dark:text-white" />
        </motion.button>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium dark:text-white">
            Page {pageNumber} of {numPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleReading}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              hasSelection ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            {isReading ? (
              <Volume2 className="w-6 h-6 text-blue-500" />
            ) : (
              <VolumeX className="w-6 h-6 text-red-500" />
            )}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-6 h-6 dark:text-white" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 dark:text-white" />
        </motion.button>
      </motion.div>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingChange={updateSetting}
      />
    </>
  );
};