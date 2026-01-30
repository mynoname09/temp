// components/personalidade/PersonalidadeForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PersonalidadeBaseFields } from '@/components/personalidade/PersonalidadeBaseFields';
import {
  personalidadeBaseFormSchema,
  PersonalidadeBaseFormValues,
} from '@/features/personalidade/base/form-schemas';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';

interface PersonalidadeFormProps {
  tagsDisponiveis: TagDePersonalidadeFromApi[];
  defaultValues?: Partial<PersonalidadeBaseFormValues>; // Opcional para Create, Obrigatório para Edit
  onSubmit: (data: PersonalidadeBaseFormValues) => Promise<void>; // A lógica vem de fora
  submitLabel?: string;
}

export function PersonalidadeForm({
  tagsDisponiveis,
  defaultValues,
  onSubmit,
  submitLabel = 'Salvar',
}: PersonalidadeFormProps) {
  const router = useRouter();

  // Valores padrão inteligentes: usa o que veio (edição) ou vazio (criação)
  const form = useForm<PersonalidadeBaseFormValues>({
    resolver: zodResolver(personalidadeBaseFormSchema),
    defaultValues: {
      nome: '',
      sobrenome: '',
      id_tag_personalidade: [],
      resumo_biografico: ' ',
      ...defaultValues, // Sobrescreve se houver dados iniciais
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, errors =>
          console.log('ERROS DE VALIDAÇÃO:', errors),
        )}
        className='space-y-8'
      >
        <PersonalidadeBaseFields
          form={form}
          tagsDisponiveis={tagsDisponiveis}
        />

        <div className='flex justify-end gap-4'>
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancelar
          </Button>

          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
