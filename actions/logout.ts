'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia, validateRequest } from '@/lib/auth';

interface ActionResult {
  error: string | null;
}

export async function logoutAction(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/signin');
}
