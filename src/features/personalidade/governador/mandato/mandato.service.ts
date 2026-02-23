import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { MandatoFromApi, listaMandatosSchema } from './mandato.schema';

/**
 * Busca todos os mandatos
 */
export async function getAllMandatos(): Promise<MandatoFromApi[]> {
  const response = await apiAcervoPublicoFCJA.get<MandatoFromApi[]>(
    '/governador/mandato',
  );
  return listaMandatosSchema.parse(response);
}

/**
 * Busca um mandato pelo ID
 */
export async function getMandatoById(id: string): Promise<MandatoFromApi> {
  const response = await apiAcervoPublicoFCJA.get<MandatoFromApi>(
    `/governador/mandato/${id}`,
  );
  return response;
}

/**
 * Busca mandatos de um governador específico
 */
export async function getMandatosByGovernadorId(
  governadorId: string,
): Promise<MandatoFromApi[]> {
  const allMandatos = await getAllMandatos();
  return allMandatos.filter((m) => m.governador.id === governadorId);
}
