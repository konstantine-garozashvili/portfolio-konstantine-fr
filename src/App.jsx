import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import { useEffect, useState } from 'react';
import { getInitialTheme, setTheme } from './utils/themeUtils';
import { initSmoothScroll } from './utils/scrollUtils';

function App() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on page load
  useEffect(() => {
    // Apply the theme class
    const initialIsDark = getInitialTheme();
    setTheme(initialIsDark);
    setIsDark(initialIsDark);
    setMounted(true);
    
    // Initialize smooth scrolling
    initSmoothScroll();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  // Prevent flash of incorrect theme
  if (!mounted) {
    return <div style={{ visibility: "hidden" }} />;
  }

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div 
        className={`transition-all duration-500 animated-splashes ${isDark ? 'dark-gradient' : 'light-gradient'}`}
        style={{
          position: 'relative',
          zIndex: 0
        }}
      >
        {/* Enhanced overlay for dark mode */}
        {isDark && (
          <div 
            className="absolute inset-0 bg-gradient-to-b from-slate-950/40 to-slate-950/10 z-0 pointer-events-none"
            style={{ mixBlendMode: 'multiply' }}
          ></div>
        )}
        
        {/* Animated color splashes */}
        <div className="splash-container" style={{ zIndex: 1 }}>
          <div className="splash"></div>
          <div className="splash"></div>
          <div className="splash"></div>
          <div className="splash"></div>
          <div className="splash"></div>
        </div>
        
        {/* Components have higher z-index to ensure they stay bright */}
        <div className="relative z-10">
          <About />
        </div>
      </div>
      
      <Navigation />
    </div>
  );
}

export default App;
