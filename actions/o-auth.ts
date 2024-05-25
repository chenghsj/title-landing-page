'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateCodeVerifier, generateState } from 'arctic';
import { googleProvider } from '@/lib/auth';

export async function googleOAuthAction(): Promise<void> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleProvider.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile', 'email'],
  });
  // url.searchParams.set('prompt', 'consent');

  cookies().set('github_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  cookies().set('code_verifier', codeVerifier, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  redirect(url.toString());
}
