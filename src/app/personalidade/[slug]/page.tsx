import FormContainer from '@/components/LayoutFormCadastro';
import FormEditarPersonalidade from '@/components/personalidade/forms/FormEditarPersonalidade';
import { getPersonalidadeBySlug } from '@/features/personalidade/base/services/get-personalidade-slug';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar personalidade',
};

type PersonalidadeSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PersonalidadeSlugPage({
  params,
}: PersonalidadeSlugPageProps) {
  const { slug } = await params;

  const tagsDisponiveis: TagDePersonalidadeFromApi[] =
    await getListaTagsDePersonalidade();

  const personalidade = await getPersonalidadeBySlug(slug);

  return (
    <FormContainer
      titulo='Editar Personalidade'
      descricao='Edite uma personalidade geral (sem cargo político ou artístico vinculado).'
    >
      <FormEditarPersonalidade
        tagsDisponiveis={tagsDisponiveis}
        personalidade={personalidade}
      />
    </FormContainer>
  );
}
