import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { BasePersonalidadeFromApi } from '../personalidade.type';

export async function getPersonalidadeBySlug(
  slug: string,
): Promise<BasePersonalidadeFromApi> {
  const response = await apiAcervoPublicoFCJA.get<BasePersonalidadeFromApi>(
    `/personalidade/find/${slug}`,
  );

  console.log(response);

  return response;
}
