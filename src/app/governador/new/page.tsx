import FormCriarGovernador from '@/components/governador/forms/FormCriarGovernador';
import FormContainer from '@/components/LayoutFormCadastro';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { getListaTagsDeGovernador } from '@/features/tags/governador/tag-governador.service';

export default async function CadastroGovernador() {
  const tagsDePersonalidadeDisponiveis: TagDePersonalidadeFromApi[] =
    await getListaTagsDePersonalidade();

  const tagsDeGovernadorDisponiveis: TagDeGovernadorFromApi[] =
    await getListaTagsDeGovernador();

  return (
    <FormContainer titulo='Novo Governador' descricao='Cadastre um governador.'>
      <FormCriarGovernador
        tagsDePersonalidadeDisponiveis={tagsDePersonalidadeDisponiveis}
        tagsDeGovernadorDisponiveis={tagsDeGovernadorDisponiveis}
      />
    </FormContainer>
  );
}
