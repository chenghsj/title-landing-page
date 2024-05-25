import styled from 'styled-components';
import { Button, extendVariants } from '@nextui-org/react';
import { cn } from '@/utils/cn';

export const ContainerWithoutNav = styled('div').attrs({
  className:
    'flex h-screen w-full -translate-y-nav_offset md:-translate-y-nav_offset_md flex-col items-center justify-center gap-8 md:h-h_/w_nav_md',
})``;

export const ExtendedButton = extendVariants(Button, {
  variants: {
    variant: {
      bordered: cn(
        'bg-white dark:bg-transparent',
        'border-1 border-primary dark:border-white',
        'font-raleway text-primary dark:text-white',
        'rounded-lg sm:rounded-10'
      ),
      primary: cn(
        'sm:!h-14 bg-primary border-none',
        'font-raleway font-bold text-white sm:text-base',
        'rounded-lg sm:rounded-10'
      ),
      signup: cn('bg-primary text-white', 'rounded-lg sm:rounded-10'),
    },
    color: {
      primary: 'bg-primary text-white',
    },
    defaultVariants: {
      color: 'primary',
    },
  },
});

export const StyledOAuthButton = styled(ExtendedButton).attrs({
  variant: 'primary',
  className:
    'bg-gray_b text-white dark:border-white dark:bg-white dark:text-gray_b w-97 lg:w-98',
})``;
