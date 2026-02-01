import WrapperListaTagsDePersonalidade from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import {
  createTagPersonalidadeAction,
  updateTagPersonalidadeAction,
  deleteTagPersonalidadeAction,
} from '@/app/actions/personalidade/tag-personalidade.actions';

export default async function ListaTagsPersonalidade() {
  const tagsDisponiveisPesquisa = await getListaTagsDePersonalidade();

  return (
    <WrapperListaTagsDePersonalidade
      initialTags={tagsDisponiveisPesquisa}
      actions={{
        create: createTagPersonalidadeAction,
        update: updateTagPersonalidadeAction,
        remove: deleteTagPersonalidadeAction,
      }}
    />
  );
}
