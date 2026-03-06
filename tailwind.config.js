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
          50: '#E6F4F7',
          500: '#1B8A9E',
          600: '#157080',
          700: '#0F5562',
        },
        warm: {
          grey: '#E5E1DA',
        },
        charcoal: '#0F3052',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(27, 138, 158, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(27, 138, 158, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}