import { createTagService } from '../tag.service';
import {
  CreateTagDeGovernadorDto,
  TagDeGovernadorFromApi,
  UpdateTagDeGovernadorDto,
} from './tag-governador.schema';

export const tagGovernadorService = createTagService<
  CreateTagDeGovernadorDto,
  UpdateTagDeGovernadorDto,
  TagDeGovernadorFromApi
>({
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
