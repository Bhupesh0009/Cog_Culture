/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: 'rgba(17, 24, 39, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          indigo: '#6366F1',
          teal: '#14B8A6',
          violet: '#8B5CF6',
        },
        status: {
          verified: '#10B981',
          inaccurate: '#F59E0B',
          false: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 3s infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.6', filter: 'blur(40px)' },
          '100%': { transform: 'scale(1.1)', opacity: '0.8', filter: 'blur(60px)' },
        }
      }
    },
  },
  plugins: [],
}
