import { getListaTagsDeGovernador } from '@/features/tags/governador/tag-governador.service';
import WrapperListaGovernadores from '.';

export async function ConteudoListaGovernador() {
  const tagsDeGovernadorFromApi = await getListaTagsDeGovernador();

  return (
    <WrapperListaGovernadores
      tagsDisponiveisPesquisa={tagsDeGovernadorFromApi}
    />
  );
}
