'use server';

import { EventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para criar um novo evento na linha do tempo
 */
export async function createEventoAction(
  data: {
    titulo: string;
    descricao?: string;
    data: string;
    publico?: boolean;
    linha_do_tempo_id: string;
  },
): Promise<ActionResult<EventoFromApi>> {
  try {
    const responseApi = await apiAcervoPublicoFCJA.post<EventoFromApi>(
      '/governador/linha-do-tempo/evento',
      data,
    );

    return createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao criar evento:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao criar evento. Tente novamente mais tarde.'],
    });
  }
}
