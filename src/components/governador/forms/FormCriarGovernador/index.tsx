'use client';

import { toast } from 'sonner';
import { GovernadorForm } from '@/components/governador/forms/FormGovernador';
import { createGovernadorAction } from '@/app/actions/governador/create-governador.action';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { GovernadorFormValues } from '@/features/personalidade/governador/form-schemas';
import { useRouter } from 'next/navigation';
import { buildFormData } from '@/utils/form-data-builder';

type FormCriarGovernadorProps = {
  tagsDePersonalidadeDisponiveis: TagDePersonalidadeFromApi[];
  tagsDeGovernadorDisponiveis: TagDeGovernadorFromApi[];
};

export default function FormCriarGovernador({
  tagsDePersonalidadeDisponiveis,
  tagsDeGovernadorDisponiveis,
}: FormCriarGovernadorProps) {
  const router = useRouter();

  async function onSubmit(data: GovernadorFormValues) {
    // Converter dados do formulário para FormData (suporta upload de arquivo)
    const formData = buildFormData(data);

    const result = await createGovernadorAction(formData);

    if (!result?.success) {
      toast.error(result?.errors?.join('\n') ?? 'Erro ao criar governador');
      return;
    }

    toast.success('Governador criado com sucesso!');

    const responseData = result.data;
    if (responseData && !Array.isArray(responseData)) {
      router.push(`/governador/${responseData.id}`);
    } else {
      router.push('/governador');
    }
  }

  return (
    <GovernadorForm
      tagsDePersonalidadeDisponiveis={tagsDePersonalidadeDisponiveis}
      tagsDeGovernadorDisponiveis={tagsDeGovernadorDisponiveis}
      onSubmit={onSubmit}
      submitLabel='Salvar Governador'
    />
  );
}
