'use client';

import { deletePersonalidadeAction } from '@/app/actions/personalidade/delete-personalidade.action';
import { ConfirmDialog } from '@/components/Dialog';
import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { ActionResult } from '@/lib/@types/action-result';
import { toast } from 'sonner';

export async function handleDelete(
  slug: string,
  nome: string,
  closeModal: () => void,
  onSuccess: () => void,
) {
  const confirmed = await ConfirmDialog({
    title: `Excluir ${nome}?`,
    content: `Essa ação não pode ser desfeita.\n
    Essa personalidade será removida permanentemente do sistema, incluindo todas as suas obras associadas.
    `,
  });

  if (confirmed) {
    const result: ActionResult<BasePersonalidadeFromApi> =
      await deletePersonalidadeAction(slug);

    if (result.success) {
      toast.success('Personalidade excluída com sucesso!');
      closeModal();

      onSuccess();
    } else {
      toast.error(result.errors?.join('\n') ?? 'Erro ao excluir personalidade');
    }
  } else {
    console.log('Exclusão cancelada pelo usuário.');
  }
}
