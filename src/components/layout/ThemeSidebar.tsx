'use client';

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import { useState } from 'react';

export default function ThemeSidebar() {
  const [visible, setVisible] = useState(false);
  const { currentTheme, themes, setTheme } = useTheme();
  const toast = useToast();

  const handleThemeChange = (theme: typeof currentTheme) => {
    setTheme(theme);
    toast.showSuccess('Theme Updated', `Switched to ${theme.label} theme`);
    setVisible(false);
  };

  const getThemeDescription = (theme: typeof currentTheme) => {
    const baseDesc = theme.isDark ? 'Dark theme with ' : 'Light theme with ';
    if (theme.name.includes('indigo')) return baseDesc + 'modern indigo accents';
    if (theme.name.includes('deeppurple')) return baseDesc + 'rich purple accents';
    if (theme.name.includes('blue')) return baseDesc + 'calming ocean tones';
    if (theme.name.includes('green')) return baseDesc + 'natural forest colors';
    if (theme.name.includes('orange')) return baseDesc + 'warm sunset hues';
    return baseDesc + 'custom accents';
  };

  const darkThemes = themes.filter(t => t.isDark);
  const lightThemes = themes.filter(t => !t.isDark);

  return (
    <>
      <Button
        icon="pi pi-palette"
        onClick={() => setVisible(true)}
        className="p-button-text p-button-rounded"
        tooltip="Change Theme"
        tooltipOptions={{ position: 'left' }}
        pt={{
          root: { className: 'w-8 h-8' }
        }}
      />

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="w-80"
        pt={{
          header: { className: 'pb-4 border-b border-surface-200' },
          content: { className: 'p-4' }
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-200">
            <i className="pi pi-palette text-xl" />
            <h2 className="text-lg font-semibold m-0">Theme Customization</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Dark Themes */}
            <div>
              <h3 className="text-sm font-semibold text-surface-600 dark:text-surface-400 mb-2">Dark Themes</h3>
              <div className="grid grid-cols-1 gap-2">
                {darkThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:surface-hover
                      ${currentTheme.name === theme.name ? 'border-2 border-primary' : 'border border-surface-200'}`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 text-white">
                      <i className="pi pi-moon text-lg" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{theme.label}</span>
                      <span className="text-sm opacity-70">{getThemeDescription(theme)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Light Themes */}
            <div>
              <h3 className="text-sm font-semibold text-surface-600 dark:text-surface-400 mb-2">Light Themes</h3>
              <div className="grid grid-cols-1 gap-2">
                {lightThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:surface-hover
                      ${currentTheme.name === theme.name ? 'border-2 border-primary' : 'border border-surface-200'}`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200">
                      <i className="pi pi-sun text-lg" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{theme.label}</span>
                      <span className="text-sm opacity-70">{getThemeDescription(theme)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
} 