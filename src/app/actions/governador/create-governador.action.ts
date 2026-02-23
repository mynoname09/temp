'use server';

import { GovernadorFromApi } from '@/features/personalidade/governador/governador.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para criar um novo governador
 * @param formData - FormData contendo os dados do governador e imagem de perfil (opcional)
 */
export async function createGovernadorAction(
  formData: FormData,
): Promise<ActionResult<GovernadorFromApi>> {
  let response: ActionResult<GovernadorFromApi>;

  try {
    const responseApi = await apiAcervoPublicoFCJA.post<GovernadorFromApi>(
      '/governador',
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
    console.error('Erro ao criar governador:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao criar governador. Tente novamente mais tarde.'],
    });
  }

  return response;
}
