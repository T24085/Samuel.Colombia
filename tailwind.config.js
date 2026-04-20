/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#eef7f4',
          100: '#d7ebe6',
          200: '#b0d6ce',
          300: '#7fb7ab',
          400: '#4f9587',
          500: '#0F4B43',
          600: '#0d433c',
          700: '#0A332D',
          800: '#072520',
          900: '#041915',
        },
        gold: {
          50: '#fdf8ed',
          100: '#f7e8c8',
          200: '#ebcf95',
          300: '#ddba6c',
          400: '#cfa34e',
          500: '#C6A15B',
          600: '#A88443',
          700: '#7d602d',
          800: '#5a431e',
          900: '#38290f',
        },
        ivory: '#F5F0E6',
        parchment: '#E8DFCF',
        ink: '#111111',
        charcoal: '#1E1E1E',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        script: ['var(--font-script)'],
      },
      boxShadow: {
        luxury:
          '0 18px 60px rgba(0,0,0,0.32), 0 0 0 1px rgba(198,161,91,0.2)',
      },
      backgroundImage: {
        'fan-radial':
          'radial-gradient(circle at top, rgba(198,161,91,0.18), transparent 45%)',
      },
      letterSpacing: {
        luxe: '0.28em',
      },
    },
  },
  plugins: [],
}
