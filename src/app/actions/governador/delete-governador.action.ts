'use server';

import { GovernadorFromApi } from '@/features/personalidade/governador/governador.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

export async function deleteGovernadorAction(
  id: string,
  deletarPersonalidade: boolean = false,
): Promise<ActionResult<GovernadorFromApi>> {
  let response: ActionResult<GovernadorFromApi>;

  try {
    await apiAcervoPublicoFCJA.delete<GovernadorFromApi>(
      `/governador/${id}?deletarPersonalidade=${deletarPersonalidade}`,
    );

    response = createActionResult({
      success: true,
    });
  } catch (error) {
    console.error('Erro ao excluir governador:', error);
    response = createActionResult({
      success: false,
      errors: ['Erro ao excluir governador'],
    });
  }

  return response;
}
