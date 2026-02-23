'use server';

import { LinhaDoTempoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para criar uma nova linha do tempo para um governador
 */
export async function createLinhaDoTempoAction(
  governadorId: string,
): Promise<ActionResult<LinhaDoTempoFromApi>> {
  try {
    const responseApi = await apiAcervoPublicoFCJA.post<LinhaDoTempoFromApi>(
      '/governador/linha-do-tempo',
      { governador_id: governadorId },
    );

    return createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao criar linha do tempo:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao criar linha do tempo. Tente novamente mais tarde.'],
    });
  }
}
