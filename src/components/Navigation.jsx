import React, { useState, useEffect } from "react";
import { Dock, DockIcon } from "./Dock";
import { scrollToSection } from "../utils/scrollUtils";
import HomeIcon from "./icons/HomeIcon";
import FolderIcon from "./icons/FolderIcon";
import InfoIcon from "./icons/InfoIcon";
import MessageIcon from "./icons/MessageIcon";

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
            <span
              className={`transition-transform duration-300 ${hoveredIcon === 'home' ? 'scale-110' : ''}`}
              style={{
                filter: hoveredIcon === 'home'
                  ? 'drop-shadow(0 0 12px #C45DD8) brightness(1.15)'
                  : 'none',
                transition: 'filter 0.3s, transform 0.3s cubic-bezier(.4,2,.6,1)',
                display: 'inline-block'
              }}
            >
              <HomeIcon className="w-7 h-7" />
            </span>
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
            <span
              className={`transition-transform duration-300 ${hoveredIcon === 'about' ? 'scale-110' : ''}`}
              style={{
                filter: hoveredIcon === 'about'
                  ? 'drop-shadow(0 0 12px #C45DD8) brightness(1.15)'
                  : 'none',
                transition: 'filter 0.3s, transform 0.3s cubic-bezier(.4,2,.6,1)',
                display: 'inline-block'
              }}
            >
              <InfoIcon className="w-7 h-7" />
            </span>
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
            <span
              className={`transition-transform duration-300 ${hoveredIcon === 'projects' ? 'scale-110' : ''}`}
              style={{
                filter: hoveredIcon === 'projects'
                  ? 'drop-shadow(0 0 12px #0EA5E9) brightness(1.12)'
                  : 'none',
                transition: 'filter 0.3s, transform 0.3s cubic-bezier(.4,2,.6,1)',
                display: 'inline-block'
              }}
            >
              <FolderIcon className="w-7 h-7" />
            </span>
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
            <span
              className={`transition-transform duration-300 ${hoveredIcon === 'contact' ? 'scale-110' : ''}`}
              style={{
                filter: hoveredIcon === 'contact'
                  ? 'drop-shadow(0 0 12px #C45DD8) brightness(1.15)'
                  : 'none',
                transition: 'filter 0.3s, transform 0.3s cubic-bezier(.4,2,.6,1)',
                display: 'inline-block'
              }}
            >
              <MessageIcon className="w-7 h-7" />
            </span>
          </DockIcon>
        </a>
      </div>
    </Dock>
  );
}

export default Navigation;