'use client';

import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { File } from 'buffer';
import * as z from 'zod';
import {
  Button,
  Card,
  CardBody,
  Input,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import { CustomButton } from '@/components/custom-button';
import { Upload } from '@/components/icons';
import { useSession } from '@/providers/session-provider';

type Props = {};

type FormInput = {
  uploadType: 'url' | 'file';
  file: File;
  url: string;
};

export const LoginFormSchema = z.object({
  file: z.custom<File>(),
});

export default function ProfilePage({}: Props) {
  const { session } = useSession();

  if (!session) {
    redirect('/login');
  }

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      file: '',
      url: '',
      uploadType: 'url',
    },
    resolver: zodResolver(LoginFormSchema),
  });
  const uploadType = watch('uploadType');

  const onSubmit: SubmitHandler<FormInput> = (data) =>
    alert(JSON.stringify(data, null, 2));

  return (
    <div className='flex h-screen w-full -translate-y-[34px] flex-col items-center justify-center gap-8 md:h-[calc(100vh-114px)]'>
      <div className='font-raleway text-4xl font-bold lg:text-6xl text-center flex flex-col gap-7'>
        Welcome!
        <div className='font-medium text-2xl'>
          {`Let's start building your page`}
        </div>
      </div>
      <div className='box-border flex w-[80%] max-w-6xl justify-center gap-4 rounded-[10px] bg-[#ffffff6e] px-8 py-10 font-sans shadow-none  dark:border-[#2f2f2f6c] dark:bg-[#000000a1] md:py-20'>
        <Card
          classNames={{ base: 'bg-transparent w-full max-w-2xl rounded-none' }}
          shadow='none'
        >
          <CardBody className='p-0'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name='uploadType'
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    onChange={onChange}
                    classNames={{
                      wrapper: 'flex flex-row',
                      label:
                        'text-gray_b dark:text-white font-bold sm:text-lg ml-2',
                    }}
                    label='You Video Resume'
                    value={uploadType}
                  >
                    <Radio value='url'>URL</Radio>
                    <Radio value='file'>File</Radio>
                  </RadioGroup>
                )}
              />
              {uploadType === 'url' ? (
                <Input
                  id='video-file'
                  aria-label='video link input'
                  classNames={{
                    base: 'mt-3',
                    inputWrapper:
                      'bg-white md:h-14 rounded-lg border-border_b border md:px-6',
                    input: 'outline-none md:text-lg font-sans',
                  }}
                  variant='bordered'
                  placeholder='youtube url'
                  {...register('url', {
                    required: true,
                  })}
                  errorMessage={errors.url?.message}
                />
              ) : (
                <Button
                  className='w-full bg-white md:h-14 rounded-lg border-border_b border md:px-8 data-[pressed=true]:transform-none mt-3 md:text-lg font-sans dark:text-black'
                  endContent={<Upload className='w-6' />}
                >
                  Upload
                  <Input
                    id='video-file'
                    aria-label='video upload button'
                    classNames={{
                      base: 'absolute w-ful mt-7 h-full left-0 opacity-0 bottom-0',
                      inputWrapper: 'h-full',
                      input: 'cursor-pointer',
                    }}
                    type='file'
                    accept='video/mp4'
                    {...register('file', {
                      required: true,
                    })}
                  />
                </Button>
              )}
              <CustomButton
                className='mt-5 rounded-lg font-raleway sm:font-bold md:!h-14 text-base'
                fullWidth
                type='submit'
                variant='primary'
              >
                Get started
              </CustomButton>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
