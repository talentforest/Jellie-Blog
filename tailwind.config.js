/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      bg: 'var(--bg)',
      text: 'var(--text)',
      indigo: 'var(--indigo)',
      yellow: 'var(--yellow)',
      'light-blue': 'var(--light-blue)',
      'light-yellow': 'var(--light-yellow)',
      blue: 'var(--blue)',
      teal: 'var(--teal)',
      white: 'var(--white)',
      slate: 'var(--slate)',
      'light-gray': 'var(--light-gray)',
      'medium-gray': 'var(--medium-gray)',
      gray: 'var(--gray)',
      black: 'var(--black)',
      box: 'var(--box)',
      hoverbox: 'var(--hoverbox)',
      transparent: 'transparent',
    },
    extend: {
      fontFamily: {
        king: ['var(--font-king-sejong)'],
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
        },
      },
      shadow: {
        'box-shadow': '30px 35px 35px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
