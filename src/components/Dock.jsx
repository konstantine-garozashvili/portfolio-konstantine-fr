import React from "react";
import { useTheme } from '../utils/themeUtils';

export const Dock = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-8 py-6 rounded-3xl gap-8 glass"
      style={{ 
        minWidth: '320px', 
        maxWidth: '90vw',
        boxShadow: theme === 'dark' 
          ? '0 8px 32px rgba(15, 23, 42, 0.25)' 
          : '0 8px 32px rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(10px)',
        border: theme === 'dark'
          ? '1.5px solid rgba(30, 41, 59, 0.4)'
          : '1.5px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '24px',
      }}
    >
      {children}
    </nav>
  );
};

export const DockIcon = ({ children, className = "" }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-14 h-14 flex items-center justify-center rounded-full transition-all hover:scale-110 bg-gradient-to-br from-skyblue-100/90 to-white/80 dark:from-slate-700/60 dark:to-slate-800/60 ${className}`}
      style={{
        boxShadow: theme === 'dark'
          ? '0 4px 10px -2px rgba(15, 23, 42, 0.3)'
          : '0 4px 10px -2px rgba(0, 0, 0, 0.1)',
        border: theme === 'dark'
          ? '1px solid rgba(51, 65, 85, 0.5)'
          : '1px solid rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(5px)',
      }}
    >
      {children}
    </div>
  );
};