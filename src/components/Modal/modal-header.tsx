import { XIcon } from 'lucide-react';

type ModalHeaderProps = {
  title: string | React.ReactNode;
  onClose: () => void;
};

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className='flex items-center justify-between p-6 border-b border-border shrink-0'>
      {typeof title === 'string' ? (
        <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
      ) : (
        title
      )}
      <button
        onClick={onClose}
        className='p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground'
      >
        <XIcon className='w-6 h-6' />
      </button>
    </div>
  );
}
