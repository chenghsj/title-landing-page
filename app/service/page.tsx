'use client';

import { ContainerWithoutNav } from '@/components/_styled-components';
import { title } from '@/components/primitives';
import { cn } from '@/utils/cn';
import { section_padding } from '@/utils/styles';

export default function ServicePage() {
  return (
    <ContainerWithoutNav>
      <section
        className={cn(
          title(),
          'w-full',
          'flex flex-col items-center',
          section_padding
        )}
      >
        Service
      </section>
    </ContainerWithoutNav>
  );
}
