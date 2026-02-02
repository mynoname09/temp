import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import WrapperListaPersonalidades from '.';

export async function ConteudoListaPersonalidade() {
  const tagsDePersonalidadeFromApi = await getListaTagsDePersonalidade();

  return (
    <WrapperListaPersonalidades
      tagsDisponiveisPesquisa={tagsDePersonalidadeFromApi}
    />
  );
}
