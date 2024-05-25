'use client';

import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';

export function _ToastContainer() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position='top-center'
      transition={Slide}
      stacked
      limit={3}
      autoClose={3000}
      hideProgressBar
      className='font-raleway'
      theme={theme}
    />
  );
}
