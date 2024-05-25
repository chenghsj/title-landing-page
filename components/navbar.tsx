'use client';

import { useEffect, useState, useTransition } from 'react';
import { isMobile } from 'react-device-detect';
import Image from 'next/legacy/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/react';
import { logoutAction } from '@/actions/logout';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { useSession } from '@/providers/session-provider';
import { cn } from '@/utils/cn';
import { disableScroll, enableScroll } from '@/utils/disable-scroll';
import { ExtendedButton } from './_styled-components';

export const Navbar = () => {
  const { user, session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isMenuOpen]);

  // fix: if using <form action={...} />, the button only triggers when double-tapped on mobile.
  // using onClick and onTouchEnd for now to fix this issue.
  const handleLogout = () => {
    startTransition(() => {
      logoutAction();
    });
  };

  return (
    <NextUINavbar
      maxWidth='xl'
      classNames={{
        base: 'w-screen bg-transparent',
        wrapper: 'h-16 md:h-20 sm:px-10 lg:px-28 md:max-w-none gap-0 sm:gap-4',
        toggleIcon: 'dark:text-white text-black',
      }}
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarMenuToggle className='lg:hidden' />
        <NavbarBrand as='li' className='h-full'>
          <NextLink
            className='flex h-full w-24 items-center justify-start gap-1 md:w-36'
            href='/'
          >
            <div className='relative h-full w-full'>
              <Image
                className='dark:invert'
                src='/logo/logo_1x.webp'
                layout='fill'
                objectFit='contain'
                alt='navbar logo'
              />
            </div>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <ul
          className={cn(
            'mx-auto hidden gap-8 rounded-2xl p-5 px-14 lg:flex',
            'bg-white bg-opacity-60 dark:bg-gray_b dark:bg-opacity-100'
          )}
        >
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              className={cn(
                'text-gray_l5',
                item.href === pathname &&
                  'font-bold text-gray_b dark:text-white',
                'transition duration-150 hover:scale-110'
              )}
              key={item.href}
            >
              <NextLink href={item.href}>{item.label}</NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className={cn(
          'basis-1 sm:flex sm:basis-full ',
          session ? 'gap-4' : 'gap-0 sm:gap-4'
        )}
        justify='end'
      >
        <ThemeSwitch />
        {session ? (
          <Dropdown placement='bottom-end' radius='sm'>
            <DropdownTrigger>
              <Avatar
                isBordered
                className='cursor-pointer'
                src={user?.avatarURL || ''}
                name={user?.name || ''}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                className='text-black dark:text-white'
                href={`/user/${user?.id}`}
                as={Link}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                className='text-danger'
                color='danger'
                onClick={!isMobile ? handleLogout : undefined}
                onTouchEnd={isMobile ? handleLogout : undefined}
              >
                <button className='w-full text-start'>Sign out</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className='=flex'>
              <Button
                className='bg-transparent font-raleway text-gray_l5 dark:text-white'
                as={Link}
                href='/signin'
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem className='=flex'>
              <ExtendedButton variant='signup' as={Link} href='/signup'>
                Sign Up
              </ExtendedButton>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <div
        className={cn(
          'z-40 h-[calc(100dvh-6rem)] w-[250px] list-none rounded-xl p-5 transition-all md:h-[calc(100dvh-9rem)]',
          'bg-white dark:bg-black',
          'opacity-95 dark:opacity-90',
          'absolute top-[5rem] md:top-[6rem]',
          `${isMenuOpen ? `left-3` : '-left-[250px]'}`
        )}
      >
        <div className={cn('absolute flex w-full flex-col gap-2')}>
          {siteConfig.navItems.map((item, index) => (
            <Link
              key={`${item}-${index}`}
              className={cn(
                'text-gray_l5',
                item.href === pathname &&
                  'font-bold text-gray_b dark:text-white',
                'origin-left transition duration-150 hover:scale-110'
              )}
              href={item.href}
              size='lg'
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div
        // vertical menu background mask
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          'h-screen w-screen bg-gray-800 transition-opacity',
          ' absolute left-0 top-[64px] md:top-[80px]',
          isMenuOpen ? 'visible' : 'invisible',
          isMenuOpen ? 'opacity-40 dark:opacity-60' : 'opacity-0'
        )}
      />
    </NextUINavbar>
  );
};
