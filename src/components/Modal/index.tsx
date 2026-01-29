import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  // Fecha ao apertar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 bg-black/50 z-9999 flex items-center justify-center p-4 animate-fade-in'
      onClick={e => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className='bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in'
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
