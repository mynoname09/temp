import { createTagService } from '../tag.service';
import {
  CreateTagDePersonalidadeDto,
  TagDePersonalidadeFromApi,
  UpdateTagDePersonalidadeDto,
} from './tag-personalidade.schema';

export const tagPersonalidadeService = createTagService<
  CreateTagDePersonalidadeDto,
  UpdateTagDePersonalidadeDto,
  TagDePersonalidadeFromApi
>({
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
