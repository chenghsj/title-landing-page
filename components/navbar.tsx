'use client';

import { useState } from 'react';
import Image from 'next/legacy/image';
import NextLink from 'next/link';
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
import { logout } from '@/actions/logout';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { useSession } from '@/providers/session-provider';
import cn from '@/utils/cn';
import { CustomButton } from './custom-button';

export const Navbar = () => {
  const { user, session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      maxWidth='xl'
      classNames={{
        base: 'w-screen bg-transparent',
        wrapper: 'h-16 md:h-20 sm:px-10 lg:px-28 md:max-w-none',
      }}
      onMenuOpenChange={setIsMenuOpen}
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
            'mx-auto hidden gap-8 rounded-2xl bg-white bg-opacity-60 p-5 px-14 lg:flex',
            'dark:bg-gray_b dark:bg-opacity-100'
          )}
        >
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className='font-bold active:text-gray_l2'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden basis-1/5 sm:flex sm:basis-full'
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
                href={`/user/${user.id}`}
                as={Link}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                className='text-danger'
                color='danger'
                onPress={() => logout()}
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className='hidden md:flex'>
              <Button
                className='bg-transparent font-raleway text-primary dark:text-white'
                as={Link}
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem className='hidden sm:flex'>
              <CustomButton variant='primary' as={Link} href='/login'>
                Sign Up
              </CustomButton>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
        <ThemeSwitch />
        {session ? (
          <Dropdown placement='bottom-end' radius='sm'>
            <DropdownTrigger>
              <Avatar
                size='sm'
                isBordered
                className='cursor-pointer'
                src={user?.avatarURL || ''}
                name={user?.name || ''}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                className='text-black dark:text-white'
                href={`/user/${user.id}`}
                as={Link}
                showDivider
              >
                Profile
              </DropdownItem>
              <DropdownItem>
                <form action={() => logout()}>Sign out</form>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem className='flex'>
            <CustomButton variant='primary' as={Link} href='/login'>
              Sign Up
            </CustomButton>
          </NavbarItem>
        )}
      </NavbarContent>

      <div
        className={cn(
          'absolute left-0 top-[3.5rem] w-screen list-none bg-white opacity-95 transition-height md:top-[5rem]',
          `${isMenuOpen ? `h-[100dvh]` : 'h-0'}`
        )}
      />
      <div
        className={cn(
          'absolute top-[4rem] mx-4 mt-2 flex w-screen flex-col gap-2 md:top-[5.5rem]',
          `${isMenuOpen ? `visible` : 'invisible'}`
        )}
      >
        {siteConfig.navItems.map((item, index) => (
          <Link
            key={`${item}-${index}`}
            color={
              index === siteConfig.navMenuItems.length - 1
                ? 'danger'
                : 'primary'
            }
            href={item.href}
            size='lg'
          >
            {item.label}
          </Link>
        ))}
      </div>
    </NextUINavbar>
  );
};
