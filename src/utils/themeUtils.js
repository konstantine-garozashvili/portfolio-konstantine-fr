/**
 * Utility functions for theme management
 */
import { useState, useEffect } from 'react';

// Custom event for theme changes
export const THEME_CHANGE_EVENT = 'themeChanged';

// Dispatch a theme change event
export const dispatchThemeChange = (theme) => {
  console.log(`Dispatching theme change event: ${theme}`);
  if (typeof window !== 'undefined') {
    const event = new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } });
    window.dispatchEvent(event);
  }
};

// Check if the user prefers dark mode
export const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  return false;
};

// Set theme in localStorage and apply to document
export const setTheme = (isDark) => {
  if (typeof window !== 'undefined') {
    const theme = isDark ? 'dark' : 'light';
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    dispatchThemeChange(theme);
  }
};

// Toggle the current theme
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme');
  const newIsDark = currentTheme !== 'dark';
  setTheme(newIsDark);
  return newIsDark;
};

// Hook for accessing and modifying theme
export const useTheme = () => {
  const [theme, setThemeState] = useState(() => {
    const isDark = getInitialTheme();
    return isDark ? 'dark' : 'light';
  });

  const toggleThemeState = () => {
    const newIsDark = toggleTheme();
    const newTheme = newIsDark ? 'dark' : 'light';
    setThemeState(newTheme);
    return newTheme;
  };

  // Sync with system/localStorage changes and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      const isDark = localStorage.getItem('theme') === 'dark';
      setThemeState(isDark ? 'dark' : 'light');
    };

    const handleThemeChange = (e) => {
      console.log('Theme change event detected:', e.detail.theme);
      setThemeState(e.detail.theme);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e) => {
      // Only update if no preference was saved
      if (!localStorage.getItem('theme')) {
        const isDark = e.matches;
        setThemeState(isDark ? 'dark' : 'light');
        setTheme(isDark);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return { theme, toggleTheme: toggleThemeState };
}; 