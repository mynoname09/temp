import { createTagService } from '../tag.service';
import { TagDePersonalidadeFromApi } from './tag-personalidade.schema';

export const tagPersonalidadeService =
  createTagService<TagDePersonalidadeFromApi>({
    basePath: '/personalidade/tags',
    entityName: 'personalidade',
  });

export const {
  getAll: getListaTagsDePersonalidade,
  // getById: getTagDePersonalidadeById,
  create: createTagDePersonalidade,
  update: updateTagDePersonalidade,
  remove: removeTagDePersonalidade,
} = tagPersonalidadeService;
