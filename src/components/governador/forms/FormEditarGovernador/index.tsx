'use client';

import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { GovernadorForm } from '../FormGovernador';
import { toast } from 'sonner';
import { GovernadorFormValues } from '@/features/personalidade/governador/form-schemas';
import { GovernadorFromApi } from '@/features/personalidade/governador/governador.type';
import { updateGovernadorAction } from '@/app/actions/governador/update-governador.action';
import { useRouter } from 'next/navigation';
import { buildFormData } from '@/utils/form-data-builder';

type FormEditarGovernadorProps = {
  tagsDePersonalidadeDisponiveis: TagDePersonalidadeFromApi[];
  tagsDeGovernadorDisponiveis: TagDeGovernadorFromApi[];
  governador: GovernadorFromApi;
};

export default function FormEditarGovernador({
  tagsDePersonalidadeDisponiveis,
  tagsDeGovernadorDisponiveis,
  governador,
}: FormEditarGovernadorProps) {
  const router = useRouter();

  if (!governador) {
    return <div className='text-center p-4'>Governador não encontrado.</div>;
  }

  const defaultValuesFormatados: Partial<GovernadorFormValues> = {
    nome: governador.nome,
    sobrenome: governador.sobrenome,
    apelido: governador.apelido,
    data_nascimento: governador.data_nascimento,
    data_falecimento: governador.data_falecimento,
    naturalidade: governador.naturalidade,
    resumo_biografico: governador.resumo_biografico,
    contribuicao_cultural: governador.contribuicao_cultural,
    contexto_historico: governador.contexto_historico,
    id_tags_de_governador:
      governador.tags_de_governador?.map(tag => tag.id) || [],
    id_tag_personalidade: [],
  };

  async function onSubmit(updatedData: GovernadorFormValues) {
    try {
      // Converter dados do formulário para FormData (suporta upload e remoção de arquivo)
      const formData = buildFormData(updatedData);

      const result = await updateGovernadorAction(governador.id, formData);

      if (!result?.success) {
        toast.error(result?.errors?.join('\n') ?? 'Erro ao editar governador');
        return;
      }

      toast.success('Governador editado com sucesso!');
      router.refresh();
    } catch (error) {
      console.error('Erro inesperado ao editar governador:', error);
      toast.error('Ocorreu um erro inesperado.');
    }
  }

  return (
    <GovernadorForm
      tagsDePersonalidadeDisponiveis={tagsDePersonalidadeDisponiveis}
      tagsDeGovernadorDisponiveis={tagsDeGovernadorDisponiveis}
      onSubmit={onSubmit}
      defaultValues={defaultValuesFormatados}
      submitLabel='Salvar Alterações'
      urlImagemPerfilExistente={governador.url_imagem_perfil}
    />
  );
}
