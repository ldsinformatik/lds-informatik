/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004AAD',
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#004AAD',
          600: '#052659',
          700: '#021634',
          900: '#010B1F',
        },
        brand: {
          blue:  '#004AAD',
          deep:  '#052659',
          dark:  '#021634',
          black: '#010B1F',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp .5s ease both',
        'fade-in':   'fadeIn .4s ease both',
        'slide-in':  'slideIn .4s ease both',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn:  { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: .4 } },
      }
    },
  },
  plugins: [],
}
