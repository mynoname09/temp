import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

type FloatingButtonProps = {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
};

export function FloatingButton({
  position = 'bottom-right',
  className,
  ...props
}: FloatingButtonProps) {
  return (
    <Button
      size='icon-lg'
      className={cn(
        'fixed rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 cursor-pointer',
        'hover:scale-105 active:scale-95',
        positionClasses[position],
        className,
      )}
      {...props}
    />
  );
}
