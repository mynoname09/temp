import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { TagDePersonalidadeFromApi } from '../tag-de-personalidade.schema';
import { cache } from 'react';

const BASE_PATH = '/personalidade/tags';

export const getListaTagsDePersonalidade = cache(
  async function getListaTagsDePersonalidade(): Promise<
    TagDePersonalidadeFromApi[]
  > {
    try {
      const response: TagDePersonalidadeFromApi[] = await apiAcervoPublicoFCJA.get(
        `${BASE_PATH}`,
      );

      console.log('Tags de Personalidade recebidas:', response);
      return response;
    } catch (error) {
      console.error('Erro ao buscar tags de personalidade:', error);
      return [];
    }
  },
);
