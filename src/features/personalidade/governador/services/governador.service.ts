import {
  CursorPaginationResult,
  apiAcervoPublicoFCJA,
} from '@/utils/api/acervoPublicoFCJA.api';
import {
  listaGovernadoresArraySchema,
  ListaGovernadoresFromApi,
  QueryGovernador,
} from '../governador.schema';

const BASE_PATH = '/governador';

type RequestOptions = {
  signal?: AbortSignal;
};

export async function getListaGovernadores(
  query?: QueryGovernador,
  options?: RequestOptions,
): Promise<CursorPaginationResult<ListaGovernadoresFromApi>> {
  const tagsGovernadorString = query?.id_tags_de_governador?.length
    ? query.id_tags_de_governador.join(',')
    : undefined;

  const tagsPersonalidadeString = query?.id_tags_personalidade?.length
    ? query.id_tags_personalidade.join(',')
    : undefined;

  const params = {
    nome: query?.nome,
    limit: 10,
    id_tags_de_governador: tagsGovernadorString,
    id_tags_personalidade: tagsPersonalidadeString,
    cursor: query?.cursor,
  };

  const response = await apiAcervoPublicoFCJA.get<
    CursorPaginationResult<ListaGovernadoresFromApi>
  >(`${BASE_PATH}`, {
    params,
    signal: options?.signal,
  });

  const parsed = listaGovernadoresArraySchema.safeParse(response.data);

  if (!parsed.success) {
    console.error('Erro ao validar lista de governadores', {
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
