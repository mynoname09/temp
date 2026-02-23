'use server';

import { FotoEventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para criar uma nova foto em um evento
 */
export async function createFotoEventoAction(
  formData: FormData,
): Promise<ActionResult<FotoEventoFromApi>> {
  try {
    const responseApi = await apiAcervoPublicoFCJA.post<FotoEventoFromApi>(
      '/governador/linha-do-tempo/foto',
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
    console.error('Erro ao criar foto:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao criar foto. Tente novamente mais tarde.'],
    });
  }
}
