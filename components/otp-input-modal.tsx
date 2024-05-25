'use client';

import { KeyboardEvent, useEffect, useState, useTransition } from 'react';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/navigation';
import { OTPInput, SlotProps } from 'input-otp';
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import Loading from '@/app/loading';
import { useModalDisclosureContext } from '@/providers/modal-disclosure-provider';
import { cn } from '@/utils/cn';
import { varifyOTP } from '@/utils/verify-otp';

export const OTPInputModal = ({ email }: { email: string }) => {
  const { isOpen, onOpenChange, onClose } = useModalDisclosureContext();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setError('');
    }
  }, [isOpen]);

  const handleComplete = async (otp: string) => {
    startTransition(async () => {
      const result = await varifyOTP(email, otp);
      if (result.success) {
        router.push(`/user/${result.userId}`);
        onClose();
      } else {
        setError(result.message);
      }
    });
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      size='sm'
      classNames={{
        base: cn('rounded-medium', { 'animate-shake': error }),
        closeButton: 'outline-none',
      }}
      hideCloseButton={isMobile}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Backspace') {
          setError('');
        }
      }}
    >
      <ModalContent className='flex aspect-video items-center justify-center overflow-hidden'>
        {(onClose) => (
          <>
            {isPending && (
              <div
                className='absolute z-50 flex h-full w-full items-center justify-center bg-white opacity-30 dark:opacity-10'
                onKeyDown={() => null}
              >
                <Loading />
              </div>
            )}
            <ModalBody className='w-fit flex-grow-0 items-start justify-center'>
              <div
                className={cn(
                  'mb-2 self-start pt-0 font-raleway text-lg font-bold',
                  {
                    'text-danger': error,
                  }
                )}
              >
                Verify OTP
              </div>
              <OTPInput
                onComplete={handleComplete}
                maxLength={6}
                inputMode='numeric'
                containerClassName='group flex has-[:disabled:opacity-30'
                render={({ slots }) => (
                  <>
                    <div className='mx-auto flex w-full'>
                      {slots.slice(0, 6).map((slot, idx) => (
                        <Slot key={idx} {...slot} error={error} />
                      ))}
                    </div>
                  </>
                )}
              />
              <p
                className={cn('w-72 text-sm', {
                  'text-danger': error,
                })}
              >
                {error ||
                  'Please enter the one-time password sent to your email.'}
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

function Slot(props: SlotProps & { error: string }) {
  return (
    <div
      className={cn(
        'relative aspect-square w-12 text-2xl',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md',
        'group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20',
        'outline outline-0 outline-accent-foreground/20',
        {
          'outline-4 outline-accent-foreground': props.isActive,
          'text-danger outline-danger': props.error,
        }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className='pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center'>
      <div className='h-8 w-px bg-black dark:bg-white' />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className='flex w-10 items-center justify-center'>
      <div className='h-[2px] w-3 rounded-full bg-border_b dark:bg-white' />
    </div>
  );
}
