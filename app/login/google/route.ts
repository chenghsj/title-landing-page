import { cookies } from 'next/headers';
import { generateCodeVerifier, generateState } from 'arctic';
import { googleProvider } from '@/lib/auth';

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleProvider.createAuthorizationURL(state, codeVerifier, {
    scopes: ['profile', 'email'],
  });

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

  return Response.redirect(url);
}
