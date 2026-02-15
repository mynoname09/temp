import { cache } from 'react';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { BaseTagFromApi, TagServiceConfig } from './@types/tag.types';

export function createTagService<
  TCreateDto,
  TUpdateDto,
  T extends BaseTagFromApi = BaseTagFromApi,
>(config: TagServiceConfig) {
  const { basePath, entityName } = config;

  const getAll = cache(async function getAll(): Promise<T[]> {
    try {
      const response: T[] = await apiAcervoPublicoFCJA.get(basePath);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar tags de ${entityName}:`, error);
      return [];
    }
  });

  async function create(data: TCreateDto): Promise<T> {
    const response: T = await apiAcervoPublicoFCJA.post(basePath, data);
    return response;
  }
  async function update(id: string, data: Partial<TUpdateDto>): Promise<T> {
    const response: T = await apiAcervoPublicoFCJA.patch(
      `${basePath}/${id}`,
      data,
    );
    return response;
  }

  async function remove(id: string): Promise<void> {
    await apiAcervoPublicoFCJA.delete<T>(`${basePath}/${id}`);
  }

  return {
    getAll,
    create,
    update,
    remove,
  };
}

export type TagService<
  TCreateDto,
  TUpdateDto,
  T extends BaseTagFromApi = BaseTagFromApi,
> = ReturnType<typeof createTagService<TCreateDto, TUpdateDto, T>>;
