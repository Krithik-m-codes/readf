import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance();
    newUtterance.onend = () => {
      setIsReading(false);
    };
    setUtterance(newUtterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else if (utterance) {
      utterance.text = selectedText || currentText;
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  return {
    isReading,
    currentText,
    selectedText,
    setCurrentText,
    setSelectedText,
    toggleReading,
  };
};