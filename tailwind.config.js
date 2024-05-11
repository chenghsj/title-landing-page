import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        raleway: ['var(--font-raleway)'],
        mulish: ['var(--font-mulish)'],
      },
      transitionProperty: {
        height: 'height',
      },
      colors: {
        primary: '#4E47FF',
        gray_l1: '#DDDBE7',
        gray_l2: '#555266',
        gray_l3: '#353340',
        gray_l4: '#17171A',
        gray_l5: '#8987A1',
        gray_l6: '#F5F8FF',
        gray_l7: '#4C4C4C',
        gray_b: '#252432',
        border_b: '#433B71',
        record: '#FF6565',
      },
    },
    container: {
      center: true,
    },
    backgroundPosition: {
      nav_top: 'center -34px',
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {},
    }),
    require('tailwindcss-safe-area'),
  ],
  mode: 'jit',
};
