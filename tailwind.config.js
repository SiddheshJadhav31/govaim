/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A154B',
          light: '#611f5d',
          dark: '#2c0d2d'
        },
        secondary: {
          DEFAULT: '#36C5F0',
          light: '#50d4ff',
          dark: '#2596b8'
        },
        accent: {
          DEFAULT: '#ECB22E',
          light: '#ffc547',
          dark: '#d4a01f'
        },
        workspace: '#F7F7F8',
        'nav-hover': 'rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'card-hover': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
      }
    },
  },
  plugins: [],
}