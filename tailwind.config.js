import { nextui } from '@nextui-org/theme';

const nav_offset = '34px';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      width: {
        97: '97%',
        98: '98%',
      },
      height: {
        'h_/w_nav_md': 'calc(100vh - 114px)',
      },
      padding: {
        nav_offset,
      },
      borderRadius: {
        10: '10px',
      },
      translate: {
        nav_offset: '68px',
        nav_offset_md: '34px',
      },
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundPosition: {
        nav_top: `center -${nav_offset}`,
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        shake: 'shake 0.7s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {},
    }),
    // require('tailwindcss-safe-area'),
  ],
  // mode: 'jit',
};
