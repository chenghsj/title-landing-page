'use client';

import styled from 'styled-components';
import { Input } from '@nextui-org/react';
import { cn } from '@/utils/cn';

export const StyledInput = styled(Input).attrs({
  classNames: {
    base: 'mt-8 w-97 lg:w-98',
    label: cn(
      'font-bold text-gray_b dark:text-white sm:text-lg ',
      'sm:-mt-[10px]'
    ),
    inputWrapper: cn(
      'sm:h-14 sm:px-6',
      'outline-none border-border_b border dark:border-none',
      'rounded-lg sm:rounded-10'
    ),
    input: 'outline-none sm:placeholder:text-base',
    helperWrapper: 'block',
    errorMessage: 'text-danger mt-1 text-sm self-start',
  },
})``;
