import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import {
  LinhaDoTempoFromApi,
  EventoFromApi,
  FotoEventoFromApi,
  linhaDoTempoSchema,
  eventoSchema,
  fotoEventoSchema,
} from './linha-do-tempo.schema';

/**
 * Busca a linha do tempo de um governador
 */
export async function getLinhaDoTempoByGovernadorId(
  governadorId: string,
): Promise<LinhaDoTempoFromApi | null> {
  try {
    const response = await apiAcervoPublicoFCJA.get<LinhaDoTempoFromApi>(
      `/governador/linha-do-tempo/governador/${governadorId}`,
    );
    return linhaDoTempoSchema.parse(response);
  } catch {
    // Pode não existir ainda
    return null;
  }
}

/**
 * Busca uma linha do tempo pelo ID
 */
export async function getLinhaDoTempoById(
  id: string,
): Promise<LinhaDoTempoFromApi> {
  const response = await apiAcervoPublicoFCJA.get<LinhaDoTempoFromApi>(
    `/governador/linha-do-tempo/${id}`,
  );
  return linhaDoTempoSchema.parse(response);
}

/**
 * Busca um evento pelo ID
 */
export async function getEventoById(id: string): Promise<EventoFromApi> {
  const response = await apiAcervoPublicoFCJA.get<EventoFromApi>(
    `/governador/linha-do-tempo/evento/${id}`,
  );
  return eventoSchema.parse(response);
}

/**
 * Busca todos os eventos (inclui públicos e privados)
 */
export async function getAllEventos(): Promise<EventoFromApi[]> {
  const response = await apiAcervoPublicoFCJA.get<EventoFromApi[]>(
    '/governador/linha-do-tempo/eventos/todos',
  );
  return response;
}

/**
 * Busca eventos públicos
 */
export async function getEventosPublicos(): Promise<EventoFromApi[]> {
  const response = await apiAcervoPublicoFCJA.get<EventoFromApi[]>(
    '/governador/linha-do-tempo/eventos/publicos',
  );
  return response;
}

/**
 * Busca uma foto pelo ID
 */
export async function getFotoById(id: string): Promise<FotoEventoFromApi> {
  const response = await apiAcervoPublicoFCJA.get<FotoEventoFromApi>(
    `/governador/linha-do-tempo/foto/${id}`,
  );
  return fotoEventoSchema.parse(response);
}
