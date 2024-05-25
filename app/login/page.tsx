'use client';

import React, { MouseEventHandler, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UpdateOptions, toast } from 'react-toastify';
import { redirect, usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { serialize } from 'object-to-formdata';
import * as z from 'zod';
import { Card, CardBody } from '@nextui-org/react';
import { googleOAuthAction } from '@/actions/o-auth';
import { sendMailAction } from '@/actions/send-mail';
import {
  ContainerWithoutNav,
  ExtendedButton,
  StyledOAuthButton,
} from '@/components/_styled-components';
import DividerWithText from '@/components/divider-with-text';
import { StyledInput } from '@/components/form/input-field';
import { Google } from '@/components/icons';
import { OTPInputModal } from '@/components/otp-input-modal';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';
import { useSession } from '@/providers/session-provider';
import { LoginFormSchema } from '@/utils/validation-schema/login-form-schema';

type FormInput = z.infer<typeof LoginFormSchema>;

type OAuth = 'google';

type Props = {};

export default function LoginPage({}: Props) {
  const { user, session } = useSession();
  if (session) {
    redirect(`/user/${user.id}`);
  }

  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { onOpen: modalOpen } = useModalDisclosureContext();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const email = watch('email');
  console.log(errors);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const formData = serialize(data);

    startTransition(async () => {
      const toastID = toast.loading('Sending email...');
      const result = await sendMailAction(formData);

      const toastConfig: UpdateOptions = {
        autoClose: null,
        closeButton: null,
        isLoading: false,
        render: result.message,
        type: result.code === 1 ? 'success' : 'error',
      };

      if (result.code === 1 || result.code === 2) {
        modalOpen();
      }
      toast.update(toastID, toastConfig);
    });
  };

  const handleGoogleOAuth: MouseEventHandler<HTMLButtonElement> = (e) => {
    startTransition(async () => {
      switch (e.currentTarget.name as OAuth) {
        case 'google':
          await googleOAuthAction();
          break;
        default:
          break;
      }
    });
  };

  return (
    <ContainerWithoutNav>
      <div className='font-raleway text-4xl font-bold lg:text-6xl'>
        {pathname === '/signup' ? 'Sign up for free' : 'Sign in'}
      </div>
      <div className='box-border flex w-[80%] max-w-6xl justify-center gap-4 rounded-10 bg-[#ffffff6e] px-8 py-10 font-sans shadow-none  dark:border-[#2f2f2f6c] dark:bg-[#000000a1] md:py-20'>
        <Card
          classNames={{
            base: 'w-full max-w-2xl rounded-none bg-transparent',
          }}
          shadow='none'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className='flex flex-col items-center p-0'>
              <Controller
                name='email'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledInput
                    isDisabled={isPending}
                    label='Email'
                    placeholder='example@gmail.com'
                    labelPlacement='outside'
                    onChange={onChange}
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                  />
                )}
              />
              <ExtendedButton
                variant='primary'
                className='mt-5 w-97 lg:w-98'
                fullWidth
                type='submit'
                isDisabled={isPending}
              >
                {`Sign ${pathname === '/signup' ? 'up' : 'in'} with email OTP`}
              </ExtendedButton>
            </CardBody>
          </form>
          <DividerWithText>OR</DividerWithText>
          <StyledOAuthButton
            startContent={
              <div className='rounded-full bg-white p-1 dark:invert sm:scale-110'>
                <Google width={12} fill='black' />
              </div>
            }
            name='google'
            isDisabled={isPending}
            onClick={handleGoogleOAuth}
          >
            Continue with Google
          </StyledOAuthButton>
        </Card>
        <OTPInputModal email={email} />
      </div>
    </ContainerWithoutNav>
  );
}
