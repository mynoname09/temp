'use server';

import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para deletar um mandato
 */
export async function deleteMandatoAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await apiAcervoPublicoFCJA.delete(`/governador/mandato/${id}`);

    return createActionResult({
      success: true,
      data: undefined,
    });
  } catch (error) {
    console.error('Erro ao deletar mandato:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao deletar mandato. Tente novamente mais tarde.'],
    });
  }
}
