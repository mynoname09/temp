import FormCriarGovernador from '@/components/governador/forms/FormCriarGovernador';
import LayoutFormCadastro from '@/components/LayoutFormCadastro';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';

export default async function CadastroGovernador() {
  const tagsDePersonalidadeDisponiveis: TagDePersonalidadeFromApi[] =
    await getListaTagsDePersonalidade();

  return (
    <LayoutFormCadastro
      titulo='Novo Governador'
      descricao='Cadastre um governador.'
    >
      <FormCriarGovernador tagsDisponiveis={tagsDePersonalidadeDisponiveis} />
    </LayoutFormCadastro>
  );
}
