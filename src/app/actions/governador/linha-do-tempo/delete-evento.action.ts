'use server';

import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para deletar um evento
 */
export async function deleteEventoAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await apiAcervoPublicoFCJA.delete(`/governador/linha-do-tempo/evento/${id}`);

    return createActionResult({
      success: true,
      data: undefined,
    });
  } catch (error) {
    console.error('Erro ao deletar evento:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao deletar evento. Tente novamente mais tarde.'],
    });
  }
}
