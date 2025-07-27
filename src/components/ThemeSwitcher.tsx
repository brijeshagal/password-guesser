'use client';

import { useState } from 'react';
import { Theme, themes } from '@/lib/themes';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors text-sm"
      >
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
        <span className="font-medium text-gray-700 hidden sm:inline">{currentTheme.name}</span>
        <span className="font-medium text-gray-700 sm:hidden">Theme</span>
        <svg 
          className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Theme Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  currentTheme.id === theme.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                <span className="text-xs sm:text-sm font-medium truncate">{theme.name}</span>
                {currentTheme.id === theme.id && (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-auto text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 