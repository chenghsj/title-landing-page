'use client';

import Image from 'next/legacy/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { ScreenIcon, StarIcon } from '@/components/icons';
import { cn } from '@/utils/cn';
import { section_padding } from '@/utils/styles';

const jobsWall = [
  {
    id: 1,
    icon: 'star',
    name: 'Model',
    description:
      'From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.',
  },
  {
    id: 2,
    icon: 'star',
    name: 'Model',
    description:
      'From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.',
  },
  {
    id: 3,
    icon: 'star',
    name: 'Model',
    description:
      'From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.',
  },
  {
    id: 4,
    icon: 'star',
    name: 'Model',
    description:
      'From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.',
  },
];

const newsWall = [
  {
    id: 1,
    name: 'Catwalk',
    description:
      'From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.',
  },
  {
    id: 2,
    name: 'EBC News',
    description:
      'From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.',
  },
];

export default function Home() {
  return (
    <>
      <section
        className={cn('flex w-full flex-col items-center', section_padding)}
      >
        <div
          className={cn(
            'flex h-[60%] w-full flex-col items-center justify-center'
          )}
        >
          <p
            className={cn(
              'my-2 text-center font-bold text-gray_b lg:whitespace-nowrap',
              'font-raleway text-3xl font-bold sm:text-5xl md:text-7xl',
              'dark:text-white'
            )}
          >
            Enter with a dream <br />
            Edit with the next Big thing
          </p>
          <div className='mt-8 flex h-16 w-full items-center md:mt-[72px]'>
            <Button
              className={cn(
                'mx-auto min-h-[46px] min-w-[269px] rounded-10 bg-gray_b px-8 py-4 font-mulish text-white',
                'font-bold data-[pressed=true]:transform-none dark:bg-white dark:text-gray_b'
              )}
              as={Link}
              href='/signup'
            >
              Sign Up For Free
            </Button>
          </div>
        </div>
      </section>
      <section
        className={cn('flex flex-col items-center gap-8', section_padding)}
      >
        <p className='my-2 text-center font-raleway text-5xl font-bold md:text-7xl'>
          Job? Get It
        </p>
        <div className='grid gap-8'>
          <div className='bg-grad relative grid grid-cols-1 gap-8 rounded sm:grid-cols-2 lg:grid-cols-4'>
            <div className='absolute right-0 top-0 z-10 hidden aspect-square w-40 -translate-y-[55%] translate-x-[40%] dark:invert sm:block xl:w-72'>
              <Image
                src='/asterisk/asterisk_1x.webp'
                layout='fill'
                objectFit='contain'
                alt='decoration icon'
              />
            </div>
            {jobsWall.map((singleJob) => (
              <Card
                key={singleJob.id}
                classNames={{
                  base: 'box-border flex gap-4 rounded-lg border border-[#ffffffb2] bg-[#ffffff6e] px-5 py-6 font-sans shadow-none dark:border-[#2f2f2f6c] dark:bg-[#6666666d]',
                }}
              >
                <CardHeader className='p-0'>
                  <div className='flex flex-col gap-4 text-gray_b'>
                    <div
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-lg bg-gray_l6',
                        'dark:bg-gray_b'
                      )}
                    >
                      <StarIcon width={24} height={24} />
                    </div>
                    <div className='dark:text-gray_l6'>{singleJob.name}</div>
                  </div>
                </CardHeader>
                <CardBody className='p-0 text-sm text-gray_l5 dark:text-gray_l1'>
                  {singleJob.description}
                </CardBody>
              </Card>
            ))}
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {newsWall.map((singleNew) => (
              <Card
                key={singleNew.id}
                classNames={{
                  base: 'box-border flex gap-4 rounded-lg border border-white bg-[#ffffff6e] px-5 py-6 font-sans shadow-none dark:border-[#2f2f2f6c] dark:bg-[#6666666d]',
                }}
              >
                <CardBody className='p-0 text-sm text-gray_l5'>
                  <div className='flex flex-row gap-4'>
                    <div className='flex flex-col gap-4'>
                      <div
                        className={cn(
                          'flex h-11 w-11 items-center justify-center rounded-lg bg-gray_l6 py-3',
                          'dark:bg-gray_b'
                        )}
                      >
                        <ScreenIcon width={24} height={24} />
                      </div>
                      <div className='text-gray_b dark:text-gray_l6'>
                        {singleNew.name}
                      </div>
                      <div className='dark:text-gray_l1'>
                        {singleNew.description}
                      </div>
                    </div>
                    <div className=' right-3 aspect-square h-full w-full rounded-md bg-[#665FFF]' />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* recommend video section */}

      {/* accordion section */}
      <section className='w-full'>
        <div
          className={cn('flex flex-col items-center', section_padding)}
        ></div>
      </section>
    </>
  );
}
