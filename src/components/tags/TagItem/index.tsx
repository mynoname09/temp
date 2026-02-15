'use client';

import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseTagFromApi } from '@/features/tags/@types/tag.types';
import { cn } from '@/lib/utils';

export type TagItemProps<T extends BaseTagFromApi> = {
  tag: T;
  onEditAction?: (tag: T) => void;
  onDeleteAction?: (tag: T) => void;
};

export default function TagItem<T extends BaseTagFromApi>({
  tag,
  onEditAction,
  onDeleteAction,
}: TagItemProps<T>) {
  return (
    <div className='flex items-center gap-1 group border-2 rounded-md'>
      <Button
        variant='ghost'
        onClick={() => onEditAction?.(tag)}
        aria-label={`Editar tag ${tag.nome}`}
        className={cn(
          'cursor-pointer h-full rounded-r-none rounded-l-[14px] px-2 pr-1 font-medium',
          'hover:bg-transparent dark:bg-transparent dark:hover:bg-transparentdark:bg-transparent dark:hover:bg-transparent',
        )}
      >
        {tag.nome}
      </Button>

      {/* Separador vertical centralizado visualmente */}
      <span className='h-4 w-px bg-border shrink-0' />

      <div className='flex items-center justify-center group-hover:opacity-100 transition-opacity'>
        <Button
          variant='ghost'
          onClick={() => onDeleteAction?.(tag)}
          aria-label={`Excluir tag ${tag.nome}`}
          className={cn(
            'text-highlight cursor-pointer size-8 rounded-full',
            'hover:bg-transparent hover:text-highlight-hover dark:bg-transparent dark:hover:bg-transparentdark:bg-transparent dark:hover:bg-transparent',
          )}
        >
          <Trash2Icon className='size-4 mr-1' />
        </Button>
      </div>
    </div>
  );
}
