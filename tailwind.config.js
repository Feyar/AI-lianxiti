/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81'
        }
      },
      keyframes: {
        'fade-in': { from: { opacity: 0, transform: 'translateY(4px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'pop': { '0%': { transform: 'scale(0.96)' }, '50%': { transform: 'scale(1.02)' }, '100%': { transform: 'scale(1)' } }
      },
      animation: { 'fade-in': 'fade-in 0.2s ease-out', 'pop': 'pop 0.25s ease-out' }
    }
  },
  plugins: []
}
