import { BaseTagFromApi } from '@/features/tags/@types/tag.types';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';

interface SelectedTagsDisplayProps<TTag extends BaseTagFromApi> {
  selectedIds: string[];
  tags: TTag[];
  onRemoveTag: (id: string) => void;
}

export function SelectedTagsDisplay<TTag extends BaseTagFromApi>({
  selectedIds,
  tags,
  onRemoveTag,
}: SelectedTagsDisplayProps<TTag>) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-muted/30 p-2.5 space-y-2',
        'md:p-3',
        '2xl:p-4',
      )}
    >
      <p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
        Tags selecionadas ({selectedIds.length})
      </p>
      <div className='flex flex-wrap gap-2'>
        {selectedIds.map(id => {
          const tag = tags.find(t => t.id === id);
          if (!tag) return null;
          return (
            <div
              key={id}
              className='flex items-center gap-1 border-2 rounded-md p-0.5'
            >
              <div
                className={cn(
                  'h-full rounded-r-none rounded-l-[14px] px-2 pr-1 text-sm',
                  'hover:bg-transparent',
                )}
              >
                {tag.nome}
              </div>

              {/* Separador vertical centralizado visualmente */}
              <span className='h-4 w-px bg-border shrink-0' />

              <div className='flex items-center justify-center transition-opacity'>
                <button
                  type='button'
                  className={cn(
                    'cursor-pointer text-muted-foreground transition-colors',
                    'hover:text-highlight-hover',
                  )}
                  onClick={() => onRemoveTag(id)}
                  aria-label={`Remover tag ${tag.nome}`}
                >
                  <XIcon className='size-4 mr-1' />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
