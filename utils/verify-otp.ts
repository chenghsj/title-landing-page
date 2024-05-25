'use server';

import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const varifyOTP = async (email: string, OTP: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        emailOTP: true,
      },
    });

    if (!existingUser) {
      return {
        success: false,
        message: 'User not found!',
      };
    }

    if (existingUser?.emailOTP?.OTP !== OTP) {
      return {
        success: false,
        message: 'Invalid OTP!',
      };
    }

    if (existingUser?.emailOTP?.expiresAt < new Date()) {
      return {
        success: false,
        message: 'OTP expired!',
      };
    }

    await prisma.emailOTP.deleteMany({
      where: {
        userId: existingUser.id,
      },
    });

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      userId: existingUser.id,
      success: true,
      message: 'OTP validated successfully!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to validate OTP!',
    };
  }
};
