'use server';

import { EventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para atualizar um evento
 */
export async function updateEventoAction(
  id: string,
  data: {
    titulo?: string;
    descricao?: string;
    data?: string;
    publico?: boolean;
  },
): Promise<ActionResult<EventoFromApi>> {
  try {
    const responseApi = await apiAcervoPublicoFCJA.patch<EventoFromApi>(
      `/governador/linha-do-tempo/evento/${id}`,
      data,
    );

    return createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao atualizar evento. Tente novamente mais tarde.'],
    });
  }
}
