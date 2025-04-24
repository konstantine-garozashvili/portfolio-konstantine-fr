/**
 * Utility functions for smooth scrolling
 */

// Smooth scroll to the element with the given ID
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Smooth scroll to a specific section
export const scrollToSection = (sectionId) => {
  scrollToElement(sectionId);
  
  // Update URL but without page jump
  const url = new URL(window.location);
  url.hash = sectionId;
  window.history.pushState({}, '', url);
};

// Register smooth scroll for all anchor links
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      if (targetId) {
        scrollToSection(targetId);
      }
    });
  });
}; 