import {
  CursorPaginationResult,
  apiAcervoPublicoFCJA,
} from '@/utils/api/acervoPublicoFCJA.api';
import {
  listaPersonalidadesArraySchema,
  ListaPersonalidadesFromApi,
  QueryPersonalidade,
} from '../personalidade.schema';

const BASE_PATH = '/personalidade';

type RequestOptions = {
  signal?: AbortSignal;
};

export async function getListaPersonalidades(
  query?: QueryPersonalidade,
  options?: RequestOptions,
): Promise<CursorPaginationResult<ListaPersonalidadesFromApi>> {
  const tagsString = query?.id_tags_de_personalidade?.length
    ? query.id_tags_de_personalidade.join(',')
    : undefined;

  await new Promise(resolve => setTimeout(resolve, 2000));

  const params = {
    nome_personalidade: query?.termo,
    limit: 10,
    id_tags_personalidade: tagsString,
    cursor: query?.cursor,
  };

  const response = await apiAcervoPublicoFCJA.get<
    CursorPaginationResult<ListaPersonalidadesFromApi>
  >(`${BASE_PATH}/lista`, {
    params,
    signal: options?.signal,
  });

  const parsed = listaPersonalidadesArraySchema.safeParse(response.data);

  if (!parsed.success) {
    console.error('Erro ao validar lista de personalidades', {
      issues: parsed.error.issues,
      response: response.data,
    });

    throw new Error('Resposta da API em formato inválido');
  }

  return {
    data: response.data,
    next_cursor: response.next_cursor,
  };
}
