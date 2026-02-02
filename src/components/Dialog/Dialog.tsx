'use client';

import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
import { useEffect, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirmAction: () => void;
  onCancelAction: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancelAction,
  onConfirmAction,
  disabled,
}: DialogProps) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  function handleBackdropClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation(); // Impede o clique de passar para elementos abaixo

    if (!disabled) {
      onCancelAction();
    }
  }

  return createPortal(
    <div
      className={cn(
        'fixed z-9999 inset-0 bg-black/60 backdrop-blur-sm',
        'flex items-center justify-center p-4',
        'animate-in fade-in duration-200',
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'bg-white p-6 rounded-xl max-w-md w-full',
          'flex flex-col gap-6',
          'shadow-2xl text-center relative',
          'animate-in zoom-in-95 duration-200',
        )}
        role='dialog'
        aria-modal={true}
        onClick={e => e.stopPropagation()}
      >
        <h3 className='text-xl font-bold text-slate-900'>{title}</h3>
        <div className='text-slate-600 text-sm leading-relaxed'>{content}</div>

        <div className='flex items-center justify-center gap-4 mt-2'>
          <Button
            autoFocus
            variant='outline'
            onClick={onCancelAction}
            disabled={disabled}
            className={cn(
              `cursor-pointer text-black`,
              `shadow-sm hover:shadow-md`,
            )}
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirmAction}
            disabled={disabled}
            className={cn('cursor-pointer', `shadow-sm hover:shadow-md`)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
