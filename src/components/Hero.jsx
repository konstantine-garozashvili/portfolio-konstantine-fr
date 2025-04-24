import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../utils/themeUtils';

const Hero = () => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing-name'); // phases: typing-name, typing-title, deleting-title, deleting-name, complete
  const fullName = "Kostantine Garozashvili";
  const fullTitle = "Je suis Développeur Full Stack";
  const finalMessage = "Développeur Full Stack";
  const textIndex = useRef(0);
  const nameIndex = useRef(0);
  const timeoutRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (phase === 'typing-name' && textIndex.current < fullName.length) {
      // Typing the name
      timeoutRef.current = setTimeout(() => {
        setText(fullName.substring(0, textIndex.current + 1));
        textIndex.current += 1;
      }, 100); // Speed of typing
    } 
    else if (phase === 'typing-name' && textIndex.current === fullName.length) {
      // Pause after typing name before starting title
      timeoutRef.current = setTimeout(() => {
        setPhase('typing-title');
        textIndex.current = 0;
      }, 1000);
    }
    else if (phase === 'typing-title' && textIndex.current < fullTitle.length) {
      // Typing the title
      timeoutRef.current = setTimeout(() => {
        setText(fullName + "\n" + fullTitle.substring(0, textIndex.current + 1));
        textIndex.current += 1;
      }, 100);
    }
    else if (phase === 'typing-title' && textIndex.current === fullTitle.length) {
      // Pause after typing title before deleting
      timeoutRef.current = setTimeout(() => {
        setPhase('deleting-title');
        textIndex.current = fullTitle.length;
      }, 2000);
    }
    else if (phase === 'deleting-title' && textIndex.current > 0) {
      // Deleting the title text character by character (backspace effect)
      timeoutRef.current = setTimeout(() => {
        setText(fullName + "\n" + fullTitle.substring(0, textIndex.current - 1));
        textIndex.current -= 1;
      }, 50);
    }
    else if (phase === 'deleting-title' && textIndex.current === 0) {
      // When title is fully deleted, start deleting the name
      timeoutRef.current = setTimeout(() => {
        setPhase('deleting-name');
        nameIndex.current = fullName.length;
      }, 500);
    }
    else if (phase === 'deleting-name' && nameIndex.current > 0) {
      // Deleting the name character by character
      timeoutRef.current = setTimeout(() => {
        setText(fullName.substring(0, nameIndex.current - 1));
        nameIndex.current -= 1;
      }, 50);
    }
    else if (phase === 'deleting-name' && nameIndex.current === 0) {
      // Transition to complete phase after deleting everything
      timeoutRef.current = setTimeout(() => {
        setPhase('complete');
        setShowButtons(true);
      }, 500);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [phase, text]);

  return (
    <div 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=1800&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {phase !== 'complete' ? (
          <div className="mb-8">
            <pre className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans whitespace-pre-wrap leading-relaxed">
              {text}
              <span className="animate-pulse">|</span>
            </pre>
          </div>
        ) : (
          <div className="transition-all duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 pb-2 border-b-4 border-eminence-500 dark:border-slate-400 inline-block font-['Playfair_Display',serif]">
              {fullName}
            </h1>
            <p className="text-2xl md:text-4xl font-medium text-white/90 mt-8 mb-10 font-['Playfair_Display',serif] italic">
              {finalMessage}
            </p>
          </div>
        )}
        
        {showButtons && (
          <div className="transition-opacity duration-1000 opacity-100 mt-16">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#about" 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-eminence-500 to-eminence-600 hover:from-eminence-600 hover:to-eminence-700 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-800 dark:hover:to-slate-900 text-white text-center transition-all transform hover:scale-105 shadow-md text-lg"
              >
                En savoir plus
              </a>
              <a 
                href="#projects" 
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white text-center transition-all transform hover:scale-105 shadow-md hover:bg-white/20 text-lg"
              >
                Voir mes projets
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70 text-sm mb-2">Découvrir</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 