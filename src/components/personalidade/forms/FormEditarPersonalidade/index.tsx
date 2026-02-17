'use client';

import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { PersonalidadeForm } from '../FormPersonalidade';
import { toast } from 'sonner';
import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { updatePersonalidadeAction } from '@/app/actions/personalidade/update-personalidade.acton';
import { useRouter } from 'next/navigation';

type FormEditarPersonalidadeProps = {
  tagsDisponiveis: TagDePersonalidadeFromApi[];
  personalidade: BasePersonalidadeFromApi;
};

export default function FormEditarPersonalidade({
  tagsDisponiveis,
  personalidade,
}: FormEditarPersonalidadeProps) {
  const router = useRouter();

  if (!personalidade) {
    return <div className='text-center p-4'>Personalidade não encontrada.</div>;
  }

  const defaultValuesFormatados: Partial<PersonalidadeBaseFormValues> = {
    ...personalidade,
    id_tag_personalidade:
      personalidade.tags_personalidade?.map(tag => tag.id) || [],
  };

  async function onSubmit(updatedData: PersonalidadeBaseFormValues) {
    try {
      const result = await updatePersonalidadeAction(
        personalidade.slug,
        updatedData,
      );

      if (!result?.success) {
        toast.error(
          result?.errors?.join('\n') ?? 'Erro ao editar personalidade',
        );
        return;
      }

      console.log('Dados a serem enviados para a API:', updatedData);
      toast.success('Personalidade editada com sucesso!');

      router.refresh();
    } catch (error) {
      console.error('Erro inesperado ao editar personalidade:', error);
      toast.error('Ocorreu um erro inesperado.');
    }
  }

  return (
    <PersonalidadeForm
      tagsDisponiveis={tagsDisponiveis}
      onSubmit={onSubmit}
      defaultValues={defaultValuesFormatados}
      submitLabel='Salvar Alterações'
    />
  );
}
