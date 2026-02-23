'use server';

import { MandatoFromApi } from '@/features/personalidade/governador/mandato/mandato.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para criar um novo mandato
 */
export async function createMandatoAction(
  data: {
    periodo: string;
    contexto_historico?: string;
    data_inicio: string;
    data_fim?: string;
    governador_id: string;
    partidos_id?: string[];
  },
): Promise<ActionResult<MandatoFromApi>> {
  let response: ActionResult<MandatoFromApi>;

  try {
    const responseApi = await apiAcervoPublicoFCJA.post<MandatoFromApi>(
      '/governador/mandato',
      data,
    );

    response = createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao criar mandato:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao criar mandato. Tente novamente mais tarde.'],
    });
  }

  return response;
}
