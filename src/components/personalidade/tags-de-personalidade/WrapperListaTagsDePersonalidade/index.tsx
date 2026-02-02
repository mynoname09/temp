import {
  createTagPersonalidadeAction,
  deleteTagPersonalidadeAction,
  updateTagPersonalidadeAction,
} from '@/app/actions/personalidade/tag-personalidade.actions';
import GerenciadorTags from '@/components/tags/GerenciadorTags';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';

export default async function WrapperListaTagsDePersonalidade() {
  const tagsIniciais = await getListaTagsDePersonalidade();

  return (
    <GerenciadorTags<TagDePersonalidadeFromApi>
      initialTags={tagsIniciais}
      actions={{
        create: createTagPersonalidadeAction,
        update: updateTagPersonalidadeAction,
        remove: deleteTagPersonalidadeAction,
      }}
      entityName='personalidade'
      searchPlaceholder='Buscar tags de personalidade...'
    />
  );
}
