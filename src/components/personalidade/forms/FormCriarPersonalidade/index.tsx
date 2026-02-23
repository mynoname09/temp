'use client';

import { toast } from 'sonner';
import { PersonalidadeForm } from '@/components/personalidade/forms/FormPersonalidade';
import { createPersonalidadeAction } from '@/app/actions/personalidade/create-personalidade.action';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { useRouter } from 'next/navigation';
import { buildPersonalidadeFormData } from '@/utils/form-data-builder';

type FormCriarPersonalidadeProps = {
  tagsDisponiveis: TagDePersonalidadeFromApi[];
};

export default function FormCriarPersonalidade({
  tagsDisponiveis,
}: FormCriarPersonalidadeProps) {
  const router = useRouter();

  async function onSubmit(data: PersonalidadeBaseFormValues) {
    // Converter dados do formulário para FormData (suporta upload de arquivo)
    const formData = buildPersonalidadeFormData(data);

    const result = await createPersonalidadeAction(formData);

    if (!result?.success) {
      toast.error(result?.errors?.join('\n') ?? 'Erro ao criar personalidade');
      return;
    }

    toast.success('Personalidade criada com sucesso!');

    const responseData = result.data;
    if (responseData && !Array.isArray(responseData)) {
      router.push(`/personalidade/${responseData.slug}`);
    } else {
      router.push('/personalidade');
    }
  }

  return (
    <PersonalidadeForm
      tagsDisponiveis={tagsDisponiveis}
      onSubmit={onSubmit}
      submitLabel='Salvar Personalidade'
    />
  );
}
