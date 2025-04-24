import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import meImage from "../assets/me.png"; // Import the profile image
import { useTheme, THEME_CHANGE_EVENT } from '../utils/themeUtils';

// Separate canvas animation component that recreates itself on theme changes
const ProfileCanvas = ({ theme: initialTheme }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [localTheme, setLocalTheme] = useState(initialTheme);
  const [forceRender, setForceRender] = useState(0);
  
  // Handle theme change events directly
  const handleThemeChange = useCallback((e) => {
    console.log('Canvas detected theme change:', e.detail.theme);
    setLocalTheme(e.detail.theme);
    setForceRender(prev => prev + 1);
  }, []);
  
  // Listen for theme change events
  useEffect(() => {
    console.log(`Canvas initializing with theme: ${initialTheme}`);
    setLocalTheme(initialTheme);
    
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    };
  }, [initialTheme, handleThemeChange]);
  
  // Force re-render when local theme changes
  useEffect(() => {
    console.log(`Canvas recreating with theme: ${localTheme}`);
    
    // This timeout ensures the DOM is fully updated
    const timeout = setTimeout(() => {
      if (canvasRef.current) {
        console.log("Canvas rendering after theme change");
        // Force a repaint by toggling a style
        canvasRef.current.style.opacity = '0.99';
        setTimeout(() => {
          if (canvasRef.current) canvasRef.current.style.opacity = '1';
        }, 50);
      }
    }, 50);
    
    return () => clearTimeout(timeout);
  }, [localTheme]);
  
  // Canvas animation setup and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas ref not available");
      return;
    }
    
    console.log(`Setting up canvas with theme: ${localTheme}`);
    
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas completely
    ctx.clearRect(0, 0, width, height);
    
    // Colors adjusted for the theme
    const colors = localTheme === 'dark' ? [
      '#94A3B8', // Light slate
      '#64748B', // Medium slate
      '#475569', // Slate blue
      '#334155', // Slate 700
      '#0F172A'  // Very dark slate (background)
    ] : [
      '#EDE9FE', // Light purple
      '#DDD6FE', // Medium purple
      '#F5F3FF', // Lighter purple
      '#F9A8D4', // Light pink
      '#FAF5FF'  // Very light purple background
    ];
    
    console.log(`Canvas colors for ${localTheme} theme:`, colors[4]);
    
    // 3D Shapes to render with fixed seeds for consistency
    let shapes = [];
    
    // Create a seeded random number generator
    const createRandom = (seed) => {
      let currentSeed = seed;
      return () => {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
      };
    };
    
    // Initialize with a fixed seed for consistency
    const pseudoRandom = createRandom(123);
    
    for (let i = 0; i < 5; i++) {
      shapes.push({
        x: width * (0.3 + 0.5 * pseudoRandom()),
        y: height * (0.3 + 0.5 * pseudoRandom()),
        radius: 30 + 50 * pseudoRandom(),
        color: colors[i % colors.length],
        speed: 0.2 + 0.3 * pseudoRandom(),
        angle: Math.PI * 2 * pseudoRandom(),
        opacity: 0.2 + 0.3 * pseudoRandom()
      });
    }
    
    // Add rounded rectangle
    shapes.push({
      x: width * 0.5,
      y: height * 0.5,
      width: width * 0.7,
      height: height * 0.7,
      radius: 30,
      color: colors[1],
      opacity: 0.3,
      isRect: true
    });
    
    const render = () => {
      // Fill background first
      ctx.fillStyle = colors[4];
      ctx.fillRect(0, 0, width, height);
      
      // Draw shapes
      shapes.forEach(shape => {
        ctx.save();
        ctx.globalAlpha = shape.opacity;
        
        if (shape.isRect) {
          // Draw rounded rectangle
          ctx.fillStyle = shape.color;
          roundedRect(ctx, shape.x - shape.width/2, shape.y - shape.height/2, 
                     shape.width, shape.height, shape.radius);
          ctx.fill();
        } else {
          // Move circles
          shape.x += Math.cos(shape.angle) * shape.speed;
          shape.y += Math.sin(shape.angle) * shape.speed;
          
          // Bounce off edges
          if (shape.x < -shape.radius) shape.x = width + shape.radius;
          if (shape.x > width + shape.radius) shape.x = -shape.radius;
          if (shape.y < -shape.radius) shape.y = height + shape.radius;
          if (shape.y > height + shape.radius) shape.y = -shape.radius;
          
          // Draw circle
          ctx.fillStyle = shape.color;
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    // Helper function for rounded rectangles
    function roundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + width, y, x + width, y + height, radius);
      ctx.arcTo(x + width, y + height, x, y + height, radius);
      ctx.arcTo(x, y + height, x, y, radius);
      ctx.arcTo(x, y, x + width, y, radius);
      ctx.closePath();
    }
    
    // Start the animation
    render();
    
    // Cleanup function
    return () => {
      console.log("Cleaning up canvas animation");
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [localTheme, forceRender]); // Re-run when theme changes or force render triggers
  
  return (
    <canvas 
      ref={canvasRef}
      width="400"
      height="400"
      className="absolute inset-0 w-full h-full rounded-3xl"
      style={{ 
        transition: 'opacity 0.1s ease',
        opacity: 1
      }}
      data-theme={localTheme} // Add data attribute for debugging
    />
  );
};

const About = () => {
  const { theme } = useTheme();
  const [handwrittenText, setHandwrittenText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullGreeting = "Enchanté de vous rencontrer";
  const timeoutRef = useRef(null);
  
  // Handwriting animation effect
  useEffect(() => {
    let index = 0;
    
    const typeNextChar = () => {
      if (index < fullGreeting.length) {
        setHandwrittenText(fullGreeting.substring(0, index + 1));
        index++;
        const randomDelay = 100 + Math.random() * 150; // Random typing speed for natural effect
        timeoutRef.current = setTimeout(typeNextChar, randomDelay);
      }
    };
    
    // Start animation
    setTimeout(() => {
      typeNextChar();
    }, 1000);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(cursorInterval);
    };
  }, []);

  const details = [
    { label: "Date de naissance", value: "3 Nov 1995" },
    { label: "Âge", value: "29" },
    { label: "Email", value: "Garozashvili25@gmail.com" },
    { label: "Téléphone", value: "(+33) 6 06 43 36 52" },
    { label: "Localisation", value: "Marseille, France" },
    { label: "Disponibilité", value: "Immédiate" },
  ];
  
  const languages = [
    { language: "Anglais", level: "C1" },
    { language: "Français", level: "B2" },
    { language: "Russe", level: "C1" },
    { language: "Géorgien", level: "Natif" },
  ];

  const skills = [
    { name: "HTML/CSS", icon: "https://img.icons8.com/color/48/html-5--v1.png" },
    { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript--v1.png" },
    { name: "React", icon: "https://img.icons8.com/color/48/react-native.png" },
    { name: "TailwindCSS", icon: "https://img.icons8.com/color/48/tailwindcss.png" },
    { name: "Node.js", icon: "https://img.icons8.com/color/48/nodejs.png" },
    { name: "MongoDB", icon: "https://img.icons8.com/color/48/mongodb.png" },
    { name: "Git", icon: "https://img.icons8.com/color/48/git.png" },
    { name: "PHP", icon: "https://img.icons8.com/officel/48/php-logo.png" },
  ];

  const experiences = [
    {
      period: "2022 - Présent",
      title: "Développeur Full Stack",
      company: "Freelance",
      description: "Développement de solutions web personnalisées pour divers clients. Conception et implémentation d'applications réactives utilisant les technologies modernes du web."
    },
    {
      period: "2020 - 2022",
      title: "Technicien Informatique",
      company: "IT Solutions Marseille",
      description: "Maintenance et dépannage des systèmes informatiques. Support technique aux utilisateurs et gestion des infrastructures réseau."
    }
  ];

  // Dynamic background styles based on theme
  const imageContainerBackgroundStyle = theme === 'dark' 
    ? {
        background: 'transparent',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.5)',
      }
    : {
        background: 'transparent',
        boxShadow: '0 10px 30px rgba(196, 93, 216, 0.15)',
      };

  // Force recreation of dynamic elements by using key prop
  const canvasKey = `profile-canvas-${theme}`;

  return (
    <section 
      id="about" 
      className="py-24 relative"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-eminence-600 to-azure-600 dark:from-slate-300 dark:to-slate-100 inline-block text-transparent bg-clip-text mb-5">
            À Propos
          </h2>
          <p className="text-xl font-medium text-eminence-700 dark:text-slate-300 max-w-2xl mx-auto">
            Développeur Full Stack passionné par la création d'expériences web exceptionnelles
          </p>
        </div>

        {/* Restructured layout - Photo on left, text on right */}
        <div className="container-fluid mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24">
          {/* Profile Image with Animation - Now on left */}
          <div className="lg:col-span-4 flex justify-center">
            <div 
              className="relative w-full max-w-[400px] h-[400px] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              style={imageContainerBackgroundStyle}
            >
              {/* Background animation canvas with key prop to force recreation */}
              <ProfileCanvas theme={theme} key={canvasKey} />
              
              {/* Profile image container with mask to prevent overflow */}
              <div className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-500 group">
                {/* Outer glow ring (light theme: purple, dark theme: slate) */}
                <div className="absolute w-[85%] h-[85%] rounded-full animate-pulse-slow z-[1] opacity-60"
                  style={{ 
                    background: theme === 'dark' 
                      ? 'radial-gradient(circle, rgba(148, 163, 184, 0.3) 0%, rgba(148, 163, 184, 0) 70%)' 
                      : 'radial-gradient(circle, rgba(196, 93, 216, 0.3) 0%, rgba(196, 93, 216, 0) 70%)',
                    animationDuration: '4s' 
                  }}>
                </div>
                
                {/* Image container with border - fixed overflow */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-[85%] h-[85%] overflow-hidden rounded-full border-[5px] border-white dark:border-slate-800 shadow-lg hover:rotate-3 transition-all duration-500 group-hover:shadow-xl"
                  style={{ 
                    boxShadow: theme === 'dark' 
                      ? '0 0 25px rgba(148, 163, 184, 0.4), 0 0 5px rgba(255, 255, 255, 0.2)' 
                      : '0 0 25px rgba(196, 93, 216, 0.3), 0 0 5px rgba(255, 255, 255, 0.6)',
                  }}>
                    {/* Add an isolating container for the image */}
                    <div className="relative w-full h-full overflow-hidden isolation-auto">
                      {/* Subtle contrast-enhancing background */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/5 to-black/5 dark:from-white/10 dark:to-black/10 z-0"></div>
                      
                      <img 
                        src={meImage} 
                        alt="Konstantine Garozashvili" 
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 mix-blend-normal brightness-[1.02] contrast-[1.05]"
                        style={{ 
                          objectPosition: "center 10%",
                          isolation: "isolate"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated decorative elements - theme-dependent colors */}
              <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full -z-10 animate-float-slow ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-slate-600/40 to-slate-700/30' 
                  : 'bg-gradient-to-br from-purple-200/70 to-pink-200/50'
              }`}></div>
              
              <div className={`absolute -top-8 -left-8 w-32 h-32 rounded-full -z-10 animate-float-slow ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-slate-500/40 to-slate-600/30' 
                  : 'bg-gradient-to-br from-violet-200/70 to-violet-300/40'
              }`} style={{ animationDelay: '1.5s' }}></div>
              
              <div className={`absolute bottom-1/3 -right-6 w-16 h-16 rounded-full -z-10 animate-float-slow ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-slate-400/30 to-slate-500/20' 
                  : 'bg-gradient-to-br from-eminence-200/60 to-eminence-300/30'
              }`} style={{ animationDelay: '3s' }}></div>

              {/* Subtle particle animations (smaller floating elements) */}
              <div className={`absolute top-1/4 left-1/4 w-3 h-3 rounded-full animate-pulse-slow ${
                theme === 'dark' ? 'bg-slate-300/30' : 'bg-eminence-300/30'
              }`} style={{ animationDuration: '3s' }}></div>
              
              <div className={`absolute top-3/4 right-1/3 w-2 h-2 rounded-full animate-pulse-slow ${
                theme === 'dark' ? 'bg-slate-400/30' : 'bg-purple-300/30'
              }`} style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              
              <div className={`absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full animate-pulse-slow ${
                theme === 'dark' ? 'bg-slate-500/20' : 'bg-violet-300/30'
              }`} style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Profile Text - Now wider on right */}
          <div className="lg:col-span-8">
            <div className="h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg border border-white/20 dark:border-slate-700/60">
              {/* Handwritten animated title */}
              <div className="mb-4 md:mb-6 relative">
                <div className="h-10">
                  <h3 className="font-['Caveat',_cursive] text-3xl text-eminence-700 dark:text-white inline relative">
                    {handwrittenText}
                    {showCursor && <span className="ml-1 absolute -bottom-1 animate-pulse">_</span>}
                  </h3>
                </div>
                <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-gradient-to-r from-eminence-500/80 via-azure-500/60 dark:from-slate-400/80 dark:via-slate-300/80 to-transparent"></div>
              </div>
              
              <p className="text-eminence-800 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                Bienvenue dans mon univers numérique. Je suis Konstantine Garozashvili, un développeur Full Stack basé à Marseille, alliant expertise technique et créativité pour concevoir des expériences web innovantes.
                <br /><br />
                Fort d'une solide formation en informatique et d'une expérience pratique dans le développement web, je maîtrise l'ensemble de la chaîne de création numérique - de la conception d'interfaces élégantes au déploiement d'architectures robustes.
                <br /><br />
                Ma philosophie professionnelle s'articule autour de trois piliers : l'excellence technique, l'innovation constante et l'attention méticuleuse aux détails.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                {details.map((detail, index) => (
                  <div key={index} className="flex flex-col hover:translate-x-2 transition-transform duration-300">
                    <span className="text-xs md:text-sm font-medium text-eminence-500 dark:text-slate-300">{detail.label}:</span>
                    <span className="font-semibold text-sm md:text-base text-eminence-800 dark:text-white break-words">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Affichage des langues dans un format plus adapté */}
              <div className="mb-6">
                <span className="text-xs md:text-sm font-medium text-eminence-500 dark:text-slate-300 block mb-2">Langues:</span>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center bg-white/50 dark:bg-slate-800/70 px-3 py-1 rounded-full">
                      <span className="font-medium text-eminence-700 dark:text-white mr-2">{lang.language}</span>
                      <span className="text-xs py-0.5 px-2 bg-eminence-100 dark:bg-slate-700 text-eminence-700 dark:text-slate-200 rounded-full">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-5 py-2 rounded-xl bg-gradient-to-r from-eminence-500 to-eminence-600 hover:from-eminence-600 hover:to-eminence-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white transition-all transform hover:scale-105 shadow-md"
                >
                  <span className="font-medium">Me contacter</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
                <a 
                  href="/cv.pdf" 
                  target="_blank"
                  className="inline-flex items-center px-5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-eminence-200 dark:border-slate-600 text-eminence-700 dark:text-white hover:bg-eminence-50 dark:hover:bg-slate-700 transition-all transform hover:scale-105 shadow-md"
                >
                  <span className="font-medium">Télécharger CV</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-12 text-eminence-700 dark:text-white">
            Parcours Professionnel
          </h3>
          
          <div className="relative border-l-2 border-eminence-300 dark:border-slate-600 pl-8 ml-4 space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[40px] top-0 w-6 h-6 rounded-full bg-eminence-500 dark:bg-slate-500 border-4 border-white dark:border-slate-950"></div>
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-md border-0 dark:border dark:border-slate-700/60">
                  <span className="text-sm font-medium text-eminence-500 dark:text-slate-300">{exp.period}</span>
                  <h4 className="text-xl font-bold text-eminence-700 dark:text-white mt-1">{exp.title}</h4>
                  <p className="text-eminence-600 dark:text-slate-300 font-medium">{exp.company}</p>
                  <p className="mt-3 text-eminence-800 dark:text-gray-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-eminence-700 dark:text-white">
            Compétences Techniques
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center transition-all hover:shadow-xl hover:scale-105 hover:-translate-y-2 backdrop-blur-md border border-white/20 dark:border-slate-700/60"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-azure-100 to-azure-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mb-4 shadow-sm border-0 dark:border dark:border-slate-600/40">
                  <img src={skill.icon} alt={skill.name} className="w-12 h-12" />
                </div>
                <span className="text-eminence-700 dark:text-white font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 