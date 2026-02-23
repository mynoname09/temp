'use server';

import { MandatoFromApi } from '@/features/personalidade/governador/mandato/mandato.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para atualizar um mandato
 */
export async function updateMandatoAction(
  id: string,
  data: {
    periodo?: string;
    contexto_historico?: string;
    data_inicio?: string;
    data_fim?: string;
    partidos_id?: string[];
  },
): Promise<ActionResult<MandatoFromApi>> {
  let response: ActionResult<MandatoFromApi>;

  try {
    const responseApi = await apiAcervoPublicoFCJA.patch<MandatoFromApi>(
      `/governador/mandato/${id}`,
      data,
    );

    response = createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao atualizar mandato:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao atualizar mandato. Tente novamente mais tarde.'],
    });
  }

  return response;
}
