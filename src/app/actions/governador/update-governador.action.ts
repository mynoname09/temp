'use server';

import { GovernadorFromApi } from '@/features/personalidade/governador/governador.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para atualizar um governador existente
 * @param id - ID do governador a ser atualizado
 * @param formData - FormData contendo os dados atualizados e imagem de perfil (opcional)
 */
export async function updateGovernadorAction(
  id: string,
  formData: FormData,
): Promise<ActionResult<GovernadorFromApi>> {
  let response: ActionResult<GovernadorFromApi>;

  try {
    const responseApi = await apiAcervoPublicoFCJA.patch<GovernadorFromApi>(
      `/governador/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    response = createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao editar governador:', error);
    response = createActionResult({
      success: false,
      errors: ['Erro ao editar governador'],
    });
  }

  return response;
}
