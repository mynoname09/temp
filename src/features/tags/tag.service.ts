import { cache } from 'react';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { BaseTagFromApi, CreateTagDto, TagServiceConfig } from './tag.types';

export function createTagService<T extends BaseTagFromApi = BaseTagFromApi>(
  config: TagServiceConfig,
) {
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

  const getById = cache(async function getById(id: string): Promise<T | null> {
    try {
      const response: T = await apiAcervoPublicoFCJA.get(`${basePath}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar tag de ${entityName} com id ${id}:`, error);
      return null;
    }
  });

  async function create(data: CreateTagDto): Promise<T> {
    const response: T = await apiAcervoPublicoFCJA.post(basePath, data);
    return response;
  }
  async function update(id: string, data: Partial<CreateTagDto>): Promise<T> {
    const response: T = await apiAcervoPublicoFCJA.put(
      `${basePath}/${id}`,
      data,
    );
    return response;
  }

  async function remove(id: string): Promise<void> {
    await apiAcervoPublicoFCJA.delete(`${basePath}/${id}`);
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
}

export type TagService<T extends BaseTagFromApi = BaseTagFromApi> = ReturnType<
  typeof createTagService<T>
>;
