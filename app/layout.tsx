import { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Metadata, Viewport } from 'next';
import '@/app/globals.scss';
import { _ToastContainer } from '@/components/_toast-container';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { fontMono, fontMulish, fontRaleway, fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { validateRequest } from '@/lib/auth';
import { Providers } from '@/providers/root-providers';

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
      <body className='background flex min-h-screen !overflow-x-clip bg-background antialiased'>
        <Providers
          session={session}
          themeProps={{ attribute: 'class', defaultTheme: 'light' }}
        >
          <div className='flex min-h-screen flex-col justify-between bg-gray_l6 bg-[url(../public/bg/bg_1x.webp)] bg-auto bg-nav_top dark:bg-gray_b md:pt-nav_offset xl:bg-cover'>
            <Navbar />
            <main className='z-20 flex w-full flex-1 flex-col'>{children}</main>
            <Footer />
          </div>
          <_ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
