import { createTagService } from '../tag.service';
import { TagDeGovernadorFromApi } from './tag-governador.schema';

export const tagGovernadorService = createTagService<TagDeGovernadorFromApi>({
  basePath: '/governador/tags',
  entityName: 'governador',
});

export const {
  getAll: getListaTagsDeGovernador,
  // getById: getTagDeGovernadorById,
  create: createTagDeGovernador,
  update: updateTagDeGovernador,
  remove: removeTagDeGovernador,
} = tagGovernadorService;
