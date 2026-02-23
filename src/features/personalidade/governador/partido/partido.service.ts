import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { PartidoFromApi, partidoSchema } from '../mandato/mandato.schema';
import { z } from 'zod';

const listaPartidosSchema = z.array(partidoSchema);

/**
 * Busca todos os partidos
 */
export async function getAllPartidos(): Promise<PartidoFromApi[]> {
  const response = await apiAcervoPublicoFCJA.get<PartidoFromApi[]>(
    '/governador/partido',
  );
  return listaPartidosSchema.parse(response);
}

/**
 * Busca um partido pelo ID
 */
export async function getPartidoById(id: string): Promise<PartidoFromApi> {
  const response = await apiAcervoPublicoFCJA.get<PartidoFromApi>(
    `/governador/partido/${id}`,
  );
  return partidoSchema.parse(response);
}
