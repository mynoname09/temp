import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { GovernadorFromApi } from '../governador.type';

export async function getGovernadorById(
  id: string,
): Promise<GovernadorFromApi> {
  const response = await apiAcervoPublicoFCJA.get<GovernadorFromApi>(
    `/governador/${id}`,
  );

  return response;
}
