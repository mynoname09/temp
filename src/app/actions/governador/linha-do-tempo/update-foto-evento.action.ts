'use server';

import { FotoEventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para atualizar uma foto
 */
export async function updateFotoEventoAction(
  id: string,
  formData: FormData,
): Promise<ActionResult<FotoEventoFromApi>> {
  try {
    const responseApi = await apiAcervoPublicoFCJA.patch<FotoEventoFromApi>(
      `/governador/linha-do-tempo/foto/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao atualizar foto:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao atualizar foto. Tente novamente mais tarde.'],
    });
  }
}
