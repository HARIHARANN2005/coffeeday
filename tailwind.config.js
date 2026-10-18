/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f4',
          100: '#f7eee4',
          200: '#ebd8c4',
          300: '#ddbc9b',
          400: '#cc9c72',
          500: '#be8152',
          600: '#a86741',
          700: '#8c5035',
          800: '#71422f',
          900: '#5c382a',
          950: '#321c14',
        },
        amberGold: {
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
        },
        roastDark: '#1c130e',
        roastCharcoal: '#140c08',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -5px rgba(92, 56, 42, 0.25)',
        'warm-lg': '0 20px 40px -10px rgba(92, 56, 42, 0.35)',
        'glow': '0 0 25px rgba(217, 119, 6, 0.35)',
      },
      animation: {
        'steam': 'steam 3s ease-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '15%': { opacity: '0.6' },
          '50%': { transform: 'translateY(-15px) scaleX(1.2)', opacity: '0.4' },
          '95%': { opacity: '0.05' },
          '100%': { transform: 'translateY(-30px) scaleX(1.5)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
