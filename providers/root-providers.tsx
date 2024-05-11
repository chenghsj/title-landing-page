'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { NextUIProvider } from '@nextui-org/system';
import { validateRequest } from '@/lib/auth';
import { SessionProvider } from './session-provider';
import { TanstackQueryProvider } from './tanstack-query-provider';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: Awaited<ReturnType<typeof validateRequest>>;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  return (
    <TanstackQueryProvider>
      <SessionProvider session={session}>
        <NextUIProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </TanstackQueryProvider>
  );
}
