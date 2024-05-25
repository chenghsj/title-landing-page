import React, { FC, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const ErrorMessage: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
}) => {
  return (
    <div className='relative block w-full flex-col gap-1.5 p-1 group-data-[has-helper=true]:flex'>
      <p className={cn(`mt-1 text-sm text-danger`, className)}>{children}</p>
    </div>
  );
};
