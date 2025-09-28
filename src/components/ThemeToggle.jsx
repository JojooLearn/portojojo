import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode, setTheme, themeLoaded } = useTheme();

  if (!themeLoaded) {
    return (
      <button className="theme-toggle loading">
        <div className="loading-spinner-small"></div>
      </button>
    );
  }

  return (
    <div className="theme-toggle-container">
      <button
        onClick={toggleDarkMode}
        className={cn(
          "theme-toggle",
          "p-2 rounded-full",
          "bg-gray-200 dark:bg-gray-700",
          "text-gray-600 dark:text-gray-300",
          "transition-all duration-300",
          "hover:bg-gray-300 dark:hover:bg-gray-600",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          "relative"
        )}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? (
          <Sun size={20} className="theme-icon" />
        ) : (
          <Moon size={20} className="theme-icon" />
        )}
      </button>
      
      {/* Optional: Theme selection dropdown for advanced users */}
      <div className="theme-options">
        <button
          onClick={() => setTheme('light')}
          className={cn(
            "theme-option",
            !isDarkMode && "active"
          )}
          aria-label="Light theme"
        >
          <Sun size={16} />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            "theme-option",
            isDarkMode && "active"
          )}
          aria-label="Dark theme"
        >
          <Moon size={16} />
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(systemDark ? 'dark' : 'light');
          }}
          className="theme-option"
          aria-label="System theme"
        >
          <Monitor size={16} />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;