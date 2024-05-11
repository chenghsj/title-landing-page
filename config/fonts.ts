import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Mulish,
  Raleway,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontRaleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const fontMulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
});
