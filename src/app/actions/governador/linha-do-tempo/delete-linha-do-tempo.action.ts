'use server';

import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para deletar uma linha do tempo
 */
export async function deleteLinhaDoTempoAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await apiAcervoPublicoFCJA.delete(`/governador/linha-do-tempo/${id}`);

    return createActionResult({
      success: true,
      data: undefined,
    });
  } catch (error) {
    console.error('Erro ao deletar linha do tempo:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao deletar linha do tempo. Tente novamente mais tarde.'],
    });
  }
}
