'use client';

import { BaseTagFromApi } from '@/features/tags/tag.types';
import TagItem from '../TagItem';

export type ListaTagsProps<T extends BaseTagFromApi> = {
  tags: T[];
  onEditAction?: (tag: T) => void;
  onDeleteAction?: (tag: T) => void;
  showActions?: boolean;
  emptyMessage?: string;
};

export default function ListaTags<T extends BaseTagFromApi>({
  tags,
  onEditAction,
  onDeleteAction,
  emptyMessage = 'Nenhuma tag encontrada.',
}: ListaTagsProps<T>) {
  if (tags.length === 0) {
    return (
      <p className='text-muted-foreground text-sm text-center py-4'>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {tags.map(tag => (
        <TagItem
          key={tag.id}
          tag={tag}
          onEditAction={onEditAction}
          onDeleteAction={onDeleteAction}
        />
      ))}
    </div>
  );
}
