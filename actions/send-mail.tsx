'use server';

import { EmailOTP, User } from '@prisma/client';
import { render } from '@react-email/render';
import { TimeSpan, generateIdFromEntropySize } from 'lucia';
import nodemailer from 'nodemailer';
import { createDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { VerifyIdentityEmail } from '@/components/mail-template';
import prisma from '@/lib/prisma';

export async function sendMailAction(formData: FormData) {
  let userId = generateIdFromEntropySize(10);
  const email = formData.get('email') as string;

  try {
    let existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        emailOTP: true,
      },
    });

    if (existingUser?.emailOTP?.expiresAt! > new Date()) {
      return {
        code: 2,
        success: false,
        message: 'Email already sent. Please check your inbox.',
      };
    }

    if (!existingUser) {
      existingUser = (await prisma.user.create({
        data: {
          id: userId,
          email,
          username: userId,
        },
      })) as User & { emailOTP: EmailOTP };
    }

    const emailOTP = await generateOTP(existingUser.id);

    await sendMail({ to: email, validationCode: emailOTP });

    return {
      code: 1,
      success: true,
      message: 'Email sent successfully!',
    };
  } catch (error: any) {
    console.error({ error });
    return {
      code: 0,
      success: false,
      message: 'Failed to send email!',
    };
  }
}

async function generateOTP(userId: string): Promise<string> {
  await prisma.emailOTP.deleteMany({
    where: {
      userId,
    },
  });
  const validationCode = generateRandomString(6, alphabet('0-9'));
  await prisma.emailOTP.create({
    data: {
      userId,
      OTP: validationCode,
      expiresAt: createDate(new TimeSpan(5, 'm')), // 5 minutes
    },
  });

  return validationCode;
}

async function sendMail({
  to,
  validationCode,
}: {
  to: string;
  validationCode: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    await transport.verify();
  } catch (error) {
    console.log({ error });
    return;
  }

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject: 'Sign in to your account',
      html: render(<VerifyIdentityEmail validationCode={validationCode} />),
    });
  } catch (error) {
    console.log(error);
  }
}
