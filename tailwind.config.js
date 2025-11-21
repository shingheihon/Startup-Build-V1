/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFFEF9',
          100: '#FAF9F6',
        },
        sage: {
          500: '#A8BBA6',
        },
        warm: {
          grey: '#E5E1DA',
        },
        charcoal: '#2D3748',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 187, 166, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 187, 166, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}