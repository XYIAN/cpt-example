'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loadTheme } from '@/utils/loadTheme';

type Theme = {
  name: string;
  label: string;
  isDark: boolean;
};

const themes: Theme[] = [
  // Dark Themes
  { name: 'mdc-dark-indigo', label: 'Dark Indigo', isDark: true },
  { name: 'mdc-dark-deeppurple', label: 'Dark Deep Purple', isDark: true },
  { name: 'arya-blue', label: 'Dark Ocean', isDark: true },
  { name: 'arya-green', label: 'Dark Forest', isDark: true },
  { name: 'arya-orange', label: 'Dark Sunset', isDark: true },
  // Light Themes
  { name: 'md-light-indigo', label: 'Light Indigo', isDark: false },
  { name: 'md-light-deeppurple', label: 'Light Deep Purple', isDark: false },
  { name: 'saga-blue', label: 'Light Ocean', isDark: false },
  { name: 'saga-green', label: 'Light Forest', isDark: false },
  { name: 'saga-orange', label: 'Light Sunset', isDark: false },
];

interface ThemeContextType {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (theme: Theme) => void;
  backgroundImage: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [backgroundImage, setBackgroundImage] = useState('/cpt-bg-dark.png');

  useEffect(() => {
    // Load initial theme
    loadTheme(currentTheme.name);
  }, []);

  const setTheme = async (theme: Theme) => {
    setCurrentTheme(theme);
    // Update background image based on theme mode
    setBackgroundImage(theme.isDark ? '/cpt-bg-dark.png' : '/cpt-bg-light.png');
    // Load new theme
    await loadTheme(theme.name);
    // Remove all existing theme classes
    document.documentElement.classList.remove(...themes.map(t => t.name));
    // Add new theme class
    document.documentElement.classList.add(theme.name);
    // Update dark mode class
    if (theme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, setTheme, backgroundImage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 