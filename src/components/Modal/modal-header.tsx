import { XIcon } from 'lucide-react';

type ModalHeaderProps = {
  title: string | React.ReactNode;
  onClose: () => void;
};

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className='flex items-center justify-between p-6 border-b border-gray-100 shrink-0'>
      {typeof title === 'string' ? (
        <h2 className='text-lg font-semibold'>{title}</h2>
      ) : (
        title
      )}
      <button
        onClick={onClose}
        className='p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-500 hover:text-gray-700'
      >
        <XIcon className='w-6 h-6' />
      </button>
    </div>
  );
}
