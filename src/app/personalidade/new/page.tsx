import FormCriarPersonalidade from '@/components/personalidade/forms/FormCriarPersonalidade';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import FormContainer from '@/components/LayoutFormCadastro';

export default async function CriarPersonalidadePage() {
  const tagsDisponiveis: TagDePersonalidadeFromApi[] =
    await getListaTagsDePersonalidade();

  return (
    <FormContainer
      titulo='Nova Personalidade'
      descricao='Cadastre uma personalidade geral (sem cargo político ou artístico vinculado).'
    >
      <FormCriarPersonalidade tagsDisponiveis={tagsDisponiveis} />
    </FormContainer>
  );
}
