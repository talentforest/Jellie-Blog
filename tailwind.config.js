/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      bg: 'var(--bg)',
      text: 'var(--text)',
      indigo: 'var(--indigo)',
      yellow: 'var(--yellow)',
      'light-yellow': 'var(--light-yellow)',
      blue: 'var(--blue)',
      teal: 'var(--teal)',
      slate: 'var(--slate)',
      white: 'var(--white)',
      gray: 'var(--gray)',
      black: 'var(--black)',
      box: 'var(--box)',
      transparent: 'transparent',
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
