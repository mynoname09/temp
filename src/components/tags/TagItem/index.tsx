'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BaseTagFromApi } from '@/features/tags/tag.types';

export type TagItemProps<T extends BaseTagFromApi> = {
  tag: T;
  onEdit?: (tag: T) => void;
  onDelete?: (tag: T) => void;
  showActions?: boolean;
};

export default function TagItem<T extends BaseTagFromApi>({
  tag,
  onEdit,
  onDelete,
  showActions = true,
}: TagItemProps<T>) {
  return (
    <div className="flex items-center gap-2 group">
      <Badge variant="secondary" className="text-sm py-1.5 px-3">
        {tag.nome}
      </Badge>

      {showActions && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(tag)}
              aria-label={`Editar tag ${tag.nome}`}
            >
              <Pencil className="size-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(tag)}
              aria-label={`Excluir tag ${tag.nome}`}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
