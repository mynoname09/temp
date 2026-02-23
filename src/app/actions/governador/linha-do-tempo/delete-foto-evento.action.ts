'use server';

import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para deletar uma foto
 */
export async function deleteFotoEventoAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await apiAcervoPublicoFCJA.delete(`/governador/linha-do-tempo/foto/${id}`);

    return createActionResult({
      success: true,
      data: undefined,
    });
  } catch (error) {
    console.error('Erro ao deletar foto:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao deletar foto. Tente novamente mais tarde.'],
    });
  }
}
