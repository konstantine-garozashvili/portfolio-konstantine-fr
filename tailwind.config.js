/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eminence: {
          50:  '#FCF5FE',
          100: '#F7EBFC',
          200: '#F0D6F8',
          300: '#E6B6F1',
          400: '#D8A8EB',
          500: '#C45DD8',
          600: '#A93DBC',
          700: '#8E309B',
          800: '#792A83',
          900: '#632669',
          950: '#3F0E44',
        },
        azure: {
          50: '#F0FAFF',
          100: '#E0F4FE',
          200: '#BAE8FD',
          300: '#7DD5FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49',
        },
        skyblue: {
          50: '#E6F8FF',
          100: '#CCF1FF',
          200: '#99E2FF',
          300: '#66D4FF',
          400: '#33C5FF',
          500: '#00B7FF',
          600: '#0092CC',
          700: '#006E99',
          800: '#004966',
          900: '#002533',
          950: '#001219',
        },
        coral: {
          50: '#FFF8F6',
          100: '#FFF0EE',
          200: '#FFDBD5',
          300: '#FFBCB1',
          400: '#FF8F7D',
          500: '#FF5A3F',
          600: '#ED3C20',
          700: '#C52E16',
          800: '#9E2817',
          900: '#82271A',
          950: '#461008',
        },
        mint: {
          50: '#F1FCF6',
          100: '#E0F9ED',
          200: '#BCF2D7',
          300: '#87E6B8',
          400: '#4FD592',
          500: '#22BD6E',
          600: '#1A9D5A',
          700: '#187E49',
          800: '#17653D',
          900: '#155434',
          950: '#072E1C',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-xy': 'gradient-xy 10s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shine-right': 'shine-right 2s forwards',
        'shine-left': 'shine-left 2s forwards',
        'warp': 'warp 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'shine-right': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: 0
          },
          '50%': { opacity: 0.5 },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: 0
          }
        },
        'shine-left': {
          '0%': { 
            transform: 'translateX(100%)',
            opacity: 0
          },
          '50%': { opacity: 0.5 },
          '100%': { 
            transform: 'translateX(-100%)',
            opacity: 0
          }
        },
        'warp': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(0.9)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        }
      },
    },
  },
  plugins: [],
}

