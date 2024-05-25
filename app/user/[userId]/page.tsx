'use client';

import React, { ChangeEvent, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { serialize } from 'object-to-formdata';
import * as z from 'zod';
import { Button, Card, CardBody, Radio, RadioGroup } from '@nextui-org/react';
import { uploadAction } from '@/actions/upload';
import {
  ContainerWithoutNav,
  ExtendedButton,
} from '@/components/_styled-components';
import { ErrorMessage } from '@/components/form/error-message';
import { StyledInput } from '@/components/form/input-field';
import { Upload } from '@/components/icons';
import { useSession } from '@/providers/session-provider';
import { cn } from '@/utils/cn';
import { uploadFormSchema } from '@/utils/validation-schema/upload-form-schema';

type Props = {};

type FormInput = Omit<z.infer<typeof uploadFormSchema>, 'file'> & {
  file?: File;
};

export default function ProfilePage({}: Props) {
  const { session } = useSession();
  if (!session) {
    redirect('/signin');
  }

  const [isPending, startTransition] = useTransition();
  const {
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      uploadType: 'url',
    },
    resolver: zodResolver(uploadFormSchema),
  });
  const uploadType = watch('uploadType');
  const file = watch('file');

  console.log(errors);
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setValue('file', e.target.files[0]);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
    const formData = serialize(data);
    startTransition(() => {
      uploadAction(formData);
    });
  };

  const hasErrorMessage =
    (uploadType === 'url' && errors.url?.message) ||
    (uploadType === 'file' && !file && errors.file?.message);

  return (
    <ContainerWithoutNav>
      <div className='flex flex-col gap-7 text-center font-raleway text-4xl font-bold lg:text-6xl'>
        Welcome!
        <div className='text-2xl font-medium'>
          {`Let's start building your page`}
        </div>
      </div>
      <div className='box-border flex w-[80%] max-w-6xl justify-center gap-4 rounded-10 bg-[#ffffff6e] px-8 py-10 font-sans shadow-none  dark:border-[#2f2f2f6c] dark:bg-[#000000a1] md:py-20'>
        <Card
          classNames={{ base: 'w-full max-w-2xl rounded-none bg-transparent' }}
          shadow='none'
        >
          <CardBody className='flex flex-col items-center p-0'>
            <form
              className='flex w-full flex-col items-center'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                control={control}
                name='uploadType'
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    classNames={{
                      base: 'w-full',
                      wrapper: 'flex flex-row',
                      label: cn(
                        'ml-2 font-bold text-gray_b dark:text-white sm:text-lg',
                        hasErrorMessage && 'text-danger'
                      ),
                    }}
                    label='You Video Resume'
                    onChange={onChange}
                    value={value}
                  >
                    <Radio value='url'>URL</Radio>
                    <Radio value='file'>File</Radio>
                  </RadioGroup>
                )}
              />
              {uploadType === 'url' ? (
                <Controller
                  name='url'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <StyledInput
                      className='mt-3'
                      value={value}
                      onChange={onChange}
                      placeholder='youtube url'
                      errorMessage={errors.url?.message}
                      isInvalid={!!errors.url}
                    />
                  )}
                />
              ) : (
                <>
                  <Button
                    className='mt-3 w-97 rounded-lg border border-border_b bg-white data-[pressed=true]:transform-none dark:text-black sm:h-14 md:px-8 md:text-lg lg:w-98'
                    endContent={<Upload className='w-6' />}
                  >
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                      {file ? file.name : 'Upload'}
                    </div>
                    <Controller
                      name='file'
                      control={control}
                      render={({ field }) => (
                        <input
                          type='file'
                          // accept='video/mp4'
                          className='absolute bottom-0 left-0 h-full w-full cursor-pointer opacity-0'
                          onChange={handleUpload}
                        />
                      )}
                    />
                  </Button>
                  {uploadType === 'file' && !file && errors.file?.message && (
                    <ErrorMessage>{errors.file?.message}</ErrorMessage>
                  )}
                </>
              )}
              <ExtendedButton
                variant='primary'
                className='mt-5 w-97 lg:w-98'
                fullWidth
                type='submit'
              >
                Get started
              </ExtendedButton>
            </form>
          </CardBody>
        </Card>
      </div>
    </ContainerWithoutNav>
  );
}
