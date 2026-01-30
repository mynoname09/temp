'use client'; // <--- OBRIGATÓRIO

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PersonalidadeForm } from '@/components/personalidade/FormPersonalidade';
import { createPersonalidadeAction } from '@/app/actions/personalidade/create-personalidade.action';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';

export default function FormCriarPersonalidade({
  tagsDisponiveis,
}: {
  tagsDisponiveis: TagDePersonalidadeFromApi[];
}) {
  // A função é criada AQUI, no cliente
  async function onSubmit(data: any) {
    console.log(data);
    try {
      await createPersonalidadeAction(data); // Chama a Server Action
      toast.success('Criado com sucesso');
    } catch (err) {
      console.log(err);
      toast.error('Erro ao criar');
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
