import React, { useState, useEffect } from "react";
import { Dock, DockIcon } from "./Dock";
import { scrollToSection } from "../utils/scrollUtils";

const labels = [
  { text: "Accueil" },
  { text: "À propos" },
  { text: "Projets" },
  { text: "Contact" },
];

export function Navigation() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Handle navigation item click
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Dock>
      <div 
        className={`relative group flex flex-col items-center ${activeSection === 'home' ? 'scale-110' : ''}`}
        onMouseEnter={() => setHoveredIcon('home')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <span
          className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-eminence-100 text-eminence-700 dark:bg-skyblue-100 dark:text-skyblue-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10"
          style={{ boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.1)' }}
        >
          Accueil
        </span>
        <a href="#home" onClick={(e) => handleNavClick('home', e)}>
          <DockIcon className={activeSection === 'home' ? 'ring-2 ring-eminence-400 dark:ring-skyblue-400 ring-offset-2 ring-offset-white dark:ring-offset-skyblue-950' : ''}>
            {hoveredIcon === 'home' ? (
              <img 
                src="/icons8-home.gif" 
                alt="Accueil" 
                className="w-7 h-7" 
                style={{ 
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.1)'
                }}
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" className="w-7 h-7">
                <path fill="#E8EAF6" d="M42 39L6 39 6 23 24 6 42 23z"></path>
                <path fill="#C5CAE9" d="M39 21L34 16 34 9 39 9zM6 39H42V44H6z"></path>
                <path fill="#B71C1C" d="M24 4.3L4 22.9 6 25.1 24 8.4 42 25.1 44 22.9z"></path>
                <path fill="#D84315" d="M18 28H30V44H18z"></path>
                <path fill="#01579B" d="M21 17H27V23H21z"></path>
                <path fill="#FF8A65" d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"></path>
              </svg>
            )}
          </DockIcon>
        </a>
      </div>
      <div 
        className={`relative group flex flex-col items-center ${activeSection === 'about' ? 'scale-110' : ''}`}
        onMouseEnter={() => setHoveredIcon('about')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <span
          className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-eminence-100 text-eminence-700 dark:bg-skyblue-100 dark:text-skyblue-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10"
          style={{ boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.1)' }}
        >
          À propos
        </span>
        <a href="#about" onClick={(e) => handleNavClick('about', e)}>
          <DockIcon className={activeSection === 'about' ? 'ring-2 ring-eminence-400 dark:ring-skyblue-400 ring-offset-2 ring-offset-white dark:ring-offset-skyblue-950' : ''}>
            <img 
              src="https://img.icons8.com/color/48/info--v1.png" 
              alt="About" 
              className="w-7 h-7"
              style={{ 
                mixBlendMode: 'multiply'
              }}
            />
          </DockIcon>
        </a>
      </div>
      <div 
        className={`relative group flex flex-col items-center ${activeSection === 'projects' ? 'scale-110' : ''}`}
        onMouseEnter={() => setHoveredIcon('projects')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <span
          className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-eminence-100 text-eminence-700 dark:bg-skyblue-100 dark:text-skyblue-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10"
          style={{ boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.1)' }}
        >
          Projets
        </span>
        <a href="#projects" onClick={(e) => handleNavClick('projects', e)}>
          <DockIcon className={activeSection === 'projects' ? 'ring-2 ring-eminence-400 dark:ring-skyblue-400 ring-offset-2 ring-offset-white dark:ring-offset-skyblue-950' : ''}>
            {hoveredIcon === 'projects' ? (
              <img 
                src="/icons8-folder.gif" 
                alt="Projects" 
                className="w-7 h-7" 
                style={{ 
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.1)'
                }}
              />
            ) : (
              <img 
                src="https://img.icons8.com/color/48/folder-invoices--v1.png" 
                alt="Projects" 
                className="w-7 h-7"
                style={{ 
                  mixBlendMode: 'multiply'
                }}
              />
            )}
          </DockIcon>
        </a>
      </div>
      <div 
        className={`relative group flex flex-col items-center ${activeSection === 'contact' ? 'scale-110' : ''}`}
        onMouseEnter={() => setHoveredIcon('contact')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <span
          className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-eminence-100 text-eminence-700 dark:bg-skyblue-100 dark:text-skyblue-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10"
          style={{ boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.1)' }}
        >
          Contact
        </span>
        <a href="#contact" onClick={(e) => handleNavClick('contact', e)}>
          <DockIcon className={activeSection === 'contact' ? 'ring-2 ring-eminence-400 dark:ring-skyblue-400 ring-offset-2 ring-offset-white dark:ring-offset-skyblue-950' : ''}>
            <img 
              src="https://img.icons8.com/color/48/filled-message.png" 
              alt="Contact" 
              className="w-7 h-7"
              style={{ 
                mixBlendMode: 'multiply'
              }}
            />
          </DockIcon>
        </a>
      </div>
    </Dock>
  );
}

export default Navigation;