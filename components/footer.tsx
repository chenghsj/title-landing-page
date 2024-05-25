import React from 'react';
import Image from 'next/legacy/image';
import { Link } from '@nextui-org/link';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className='w-full bg-gray_b px-10 py-5 dark:bg-gray_l4 sm:py-9 md:px-[108px]'>
      <div className='flex items-center justify-between border-t-[0.5px] border-b-gray_l1 md:py-5'>
        <div>
          <div className='relative w-32 py-10 invert md:w-[200px] lg:py-11'>
            <Image
              src='/logo/logo_1x.webp'
              layout='fill'
              objectFit='contain'
              alt='footer logo'
            />
          </div>

          <span className='text-xs italic text-gray_l1 sm:text-sm'>
            © 2024 Lorem ipsum dolor sit amet
          </span>
        </div>
        <div className='flex gap-x-3'>
          <Link isExternal href={siteConfig.links.twitter} aria-label='Twitter'>
            <TwitterIcon className='text-white' />
          </Link>
          <Link isExternal href={siteConfig.links.discord} aria-label='Discord'>
            <DiscordIcon className='text-white' />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label='Github'>
            <GithubIcon className='text-white' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
