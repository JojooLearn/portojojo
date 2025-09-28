import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // If no saved preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Add transition for smooth theme switching
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setThemeLoaded(true);
  }, [isDarkMode]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    // User has explicitly chosen a theme, so we store it
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const setTheme = (theme) => {
    if (theme === 'dark' || theme === 'light') {
      setIsDarkMode(theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  };

  const getThemeClass = () => {
    return isDarkMode ? 'dark' : 'light';
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    setTheme,
    getThemeClass,
    themeLoaded
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Custom hook for theme-dependent styles
export const useThemeStyles = (lightStyle, darkStyle) => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? darkStyle : lightStyle;
};

// Utility function for conditional class names based on theme
export const themeClass = (lightClass, darkClass) => {
  return `${lightClass} ${darkClass}:dark`;
};