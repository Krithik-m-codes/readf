import React from 'react';
import { motion } from 'framer-motion';

interface SelectionHighlightProps {
  text: string;
}

export const SelectionHighlight: React.FC<SelectionHighlightProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      Currently reading: "{text.slice(0, 50)}..."
    </motion.div>
  );
};