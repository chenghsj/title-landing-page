import { ReactElement } from 'react';
import { Metadata, Viewport } from 'next';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { fontMono, fontMulish, fontRaleway, fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { validateRequest } from '@/lib/auth';
import { Providers } from '@/providers/root-providers';
import '@/styles/globals.scss';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: true,
  manifest: '/manifest.json',
};

type RootLayoutType = {
  children: ReactElement;
};

export default async function RootLayout({ children }: RootLayoutType) {
  const session = await validateRequest();
  return (
    <html
      lang='en'
      className={`${fontRaleway.variable} ${fontMulish.variable} ${fontMono.variable} ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className='background flex min-h-screen overflow-x-clip bg-background antialiased'>
        <Providers
          session={session}
          themeProps={{ attribute: 'class', defaultTheme: 'light' }}
        >
          <div className='bg-nav_top flex min-h-screen flex-col justify-between bg-gray_l6 bg-[url(../public/bg/bg_1x.webp)] bg-auto dark:bg-gray_b md:pt-[34px] xl:bg-cover'>
            <Navbar />
            <main className='flex w-full flex-1 flex-col'>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
