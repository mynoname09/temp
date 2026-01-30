export type {
  BaseTagFromApi,
  CreateTagDto,
  TagServiceConfig,
} from './tag.types';

export { baseTagSchema } from './tag.schema';

export { createTagService, type TagService } from './tag.service';

export type { TagDePersonalidadeFromApi } from './personalidade';
export {
  tagPersonalidadeService,
  getListaTagsDePersonalidade,
  getTagDePersonalidadeById,
  createTagDePersonalidade,
  updateTagDePersonalidade,
  removeTagDePersonalidade,
} from './personalidade';

export type { TagDeGovernadorFromApi } from './governador';
export {
  tagGovernadorService,
  getListaTagsDeGovernador,
  getTagDeGovernadorById,
  createTagDeGovernador,
  updateTagDeGovernador,
  removeTagDeGovernador,
} from './governador';
