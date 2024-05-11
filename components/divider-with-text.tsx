import React, { FC, ReactNode } from 'react';
import cn from '@/utils/cn';

type ClassNamesType = {
  base: string;
  divider: string;
  content: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  classNames?: Partial<ClassNamesType>;
};

const DividerWithText: FC<Props> = ({
  children,
  className,
  classNames,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center px-1 py-5',
        className,
        classNames?.base
      )}
      {...rest}
    >
      <div
        className={cn(
          'flex-grow border-t border-gray_b dark:border-white',
          classNames?.divider
        )}
      />
      <span
        className={cn(
          'mx-4 flex-shrink text-sm text-gray_b dark:text-white',
          classNames?.content
        )}
      >
        {children}
      </span>
      <div
        className={cn(
          'flex-grow border-t border-gray_b dark:border-white',
          classNames?.divider
        )}
      />
    </div>
  );
};

export default DividerWithText;
