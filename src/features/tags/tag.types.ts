export interface BaseTagFromApi {
  id: string;
  nome: string;
  slug: string;
}

export interface CreateTagDto {
  nome: string;
}

export interface TagServiceConfig {
  basePath: string;
  entityName: string;
}
