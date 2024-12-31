import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Volume2, ScrollText, Music } from 'lucide-react';
import { YouTubeEmbed } from './YouTubeEmbed';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    darkMode: boolean;
    autoScroll: boolean;
    voiceType: string;
    playMusic: boolean;
    musicVolume: number;
  };
  onSettingChange: (key: string, value: any) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingChange,
}) => {
  const voices = window.speechSynthesis.getVoices();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[999]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md z-[1000]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {settings.darkMode ? (
                    <Moon className="w-5 h-5 dark:text-white" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <span className="dark:text-white">Dark Mode</span>
                </div>
                <button
                  onClick={() => onSettingChange('darkMode', !settings.darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Background Music */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Music className="w-5 h-5 dark:text-white" />
                    <span className="dark:text-white">Background Music</span>
                  </div>
                  <button
                    onClick={() => onSettingChange('playMusic', !settings.playMusic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.playMusic ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.playMusic ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {settings.playMusic && (
                  <div className="space-y-2">
                    <label className="block text-sm dark:text-white">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.musicVolume}
                      onChange={(e) => onSettingChange('musicVolume', Number(e.target.value))}
                      className="w-full"
                    />
                    <YouTubeEmbed volume={settings.musicVolume} />
                  </div>
                )}
              </div>

              {/* Voice Selection */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 dark:text-white" />
                  <span className="dark:text-white">Voice Type</span>
                </div>
                <select
                  value={settings.voiceType}
                  onChange={(e) => onSettingChange('voiceType', e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {voices.map((voice, index) => (
                    <option key={index} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto Scroll Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ScrollText className="w-5 h-5 dark:text-white" />
                  <span className="dark:text-white">Auto Scroll</span>
                </div>
                <button
                  onClick={() => onSettingChange('autoScroll', !settings.autoScroll)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoScroll ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoScroll ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};