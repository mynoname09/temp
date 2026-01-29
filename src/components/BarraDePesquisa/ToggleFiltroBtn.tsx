import { ChevronDownIcon, FilterIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToggleFiltrosBtnProps = {
  isOpen: boolean;
  onClick: () => void;
  activeCount: number;
};

export default function ToggleFiltrosBtn({
  isOpen,
  onClick,
  activeCount,
}: ToggleFiltrosBtnProps) {
  return (
    <div className='flex justify-center -mt-0.5 relative z-10'>
      <div className='absolute top-1/2 left-4 right-4 h-px bg-border -z-10' />

      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 px-4 py-1.5 rounded-b-xl border-b border-r border-l border-border shadow-sm text-sm font-medium transition-all duration-200 cursor-pointer',
          'bg-card hover:bg-muted text-muted-foreground',
          isOpen && 'bg-muted text-highlight border-highlight/30',
        )}
      >
        <FilterIcon className='w-3.5 h-3.5' />
        <span>Filtros</span>
        {activeCount > 0 && (
          <span className='bg-highlight text-white text-[10px] px-1.5 rounded-full min-w-5 h-4 flex items-center justify-center'>
            {activeCount}
          </span>
        )}
        <ChevronDownIcon
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
        />
      </button>
    </div>
  );
}
