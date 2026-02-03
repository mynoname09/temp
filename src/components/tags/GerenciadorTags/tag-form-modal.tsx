import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BaseTagFromApi } from '@/features/tags/tag.types';
import FormTag, { FormTagData } from '../FormTag';

type TagFormModalProps<T extends BaseTagFromApi> = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingTag: T | null;
  entityName: string;
  onSubmit: (data: FormTagData) => Promise<void>;
  onCancel: () => void;
};

export function TagFormModal<T extends BaseTagFromApi>({
  isOpen,
  onOpenChange,
  editingTag,
  entityName,
  onSubmit,
  onCancel,
}: TagFormModalProps<T>) {
  const isEditing = editingTag !== null;
  const modalTitle = isEditing ? `Editar tag: ${editingTag.nome}` : 'Nova tag';
  const modalDescription = isEditing
    ? 'Altere o nome da tag abaixo.'
    : `Adicione uma nova tag de ${entityName}.`;

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>

        <FormTag
          key={editingTag?.id ?? 'new'}
          defaultValues={editingTag ? { nome: editingTag.nome } : undefined}
          onSubmitAction={onSubmit}
          onCancelAction={onCancel}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}
