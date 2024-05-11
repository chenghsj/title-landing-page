'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { CustomButton } from '@/components/custom-button';
import DividerWithText from '@/components/divider-with-text';
import { Google } from '@/components/icons';
import { useSession } from '@/providers/session-provider';

type FormInputType = {
  email: string;
};

type Props = {};

const LoginFormSchema = z.object({
  email: z.string().email('Invalid email'),
});

export default function Signin({}: Props) {
  const { user, session } = useSession();

  if (session) {
    redirect(`/user/${user.id}`);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<FormInputType> = (data) =>
    alert(JSON.stringify(data, null, 2));

  return (
    <div className='flex h-screen w-full -translate-y-[34px] flex-col items-center justify-center gap-8 md:h-[calc(100vh-114px)]'>
      <div className='font-raleway text-4xl font-bold lg:text-6xl'>
        Sign up for free
      </div>
      <div className='box-border flex w-[80%] max-w-6xl justify-center gap-4 rounded-[10px] bg-[#ffffff6e] px-8 py-10 font-sans shadow-none  dark:border-[#2f2f2f6c] dark:bg-[#000000a1] md:py-20'>
        <Card
          classNames={{ base: 'bg-transparent w-full max-w-2xl rounded-none' }}
          shadow='none'
        >
          <CardBody className='p-0'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                classNames={{
                  base: 'mt-7',
                  label: 'text-gray_b dark:text-white font-bold md:-mt-[10px]',
                  inputWrapper:
                    'bg-white md:h-14 rounded-lg border-border_b border',
                  input: 'outline-none',
                }}
                variant='bordered'
                type='email'
                label='Email'
                placeholder='example@gmail.com'
                labelPlacement='outside'
                {...register('email', {
                  required: true,
                })}
                errorMessage={errors.email?.message}
              />
              <CustomButton
                className='mt-5 rounded-lg font-raleway font-bold md:!h-14'
                fullWidth
                type='submit'
                variant='primary'
              >
                Log in with email
              </CustomButton>
            </form>
          </CardBody>
          <DividerWithText>OR</DividerWithText>
          <Button
            className='mt-4 rounded-lg bg-gray_b text-white dark:border-white dark:bg-white  dark:text-gray_b md:h-14'
            as={Link}
            href='/login/google'
            startContent={
              <div className='rounded-full bg-white p-1 font-raleway font-bold dark:invert'>
                <Google width={12} fill='black' />
              </div>
            }
          >
            Continue with Google
          </Button>
        </Card>
      </div>
    </div>
  );
}
