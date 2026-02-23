'use client';

import { deleteGovernadorAction } from '@/app/actions/governador/delete-governador.action';
import { ConfirmDialog } from '@/components/Dialog';
import { GovernadorFromApi } from '@/features/personalidade/governador/governador.type';
import { ActionResult } from '@/lib/@types/action-result';
import { toast } from 'sonner';

export async function handleDeleteGovernador(
  id: string,
  nome: string,
  closeModal: () => void,
  onSuccess: () => void,
) {
  const confirmed = await ConfirmDialog({
    title: `Excluir ${nome}?`,
    content: `Essa ação não pode ser desfeita.\n
    Este governador será removido permanentemente do sistema.
    `,
  });

  if (confirmed) {
    const result: ActionResult<GovernadorFromApi> =
      await deleteGovernadorAction(id);

    if (result.success) {
      toast.success('Governador excluído com sucesso!');
      closeModal();
      onSuccess();
    } else {
      toast.error(result.errors?.join('\n') ?? 'Erro ao excluir governador');
    }
  } else {
    console.log('Exclusão cancelada pelo usuário.');
  }
}
