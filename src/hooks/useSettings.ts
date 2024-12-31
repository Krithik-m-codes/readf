import { useState, useEffect } from 'react';

interface Settings {
  darkMode: boolean;
  autoScroll: boolean;
  voiceType: string;
  playMusic: boolean;
  musicVolume: number;
}

const defaultSettings: Settings = {
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  autoScroll: true,
  voiceType: window.speechSynthesis.getVoices()[0]?.name || '',
  playMusic: false,
  musicVolume: 30,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('pdf-reader-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pdf-reader-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    isSettingsOpen,
    setIsSettingsOpen,
    updateSetting,
  };
};