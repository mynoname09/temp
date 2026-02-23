'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PersonalidadeBaseFields } from '@/components/personalidade/PersonalidadeBaseFields';
import {
  governadorFormSchema,
  GovernadorFormValues,
} from '@/features/personalidade/governador/form-schemas';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { RequiredLabel } from '@/components/ui/form/required-label';
import { TagSelector } from '@/components/tags/TagSelector';
import { toast } from 'sonner';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

interface GovernadorFormProps {
  tagsDePersonalidadeDisponiveis: TagDePersonalidadeFromApi[];
  tagsDeGovernadorDisponiveis: TagDeGovernadorFromApi[];
  defaultValues?: Partial<GovernadorFormValues>;
  onSubmit: (data: GovernadorFormValues) => Promise<void>;
  submitLabel?: string;
  /** URL da imagem de perfil existente (para edição) */
  urlImagemPerfilExistente?: string | null;
}

/**
 * Cria uma nova tag de governador via API
 */
async function criarTagDeGovernador(
  nome: string,
): Promise<TagDeGovernadorFromApi> {
  const novaTag = await apiAcervoPublicoFCJA.post<TagDeGovernadorFromApi>(
    '/governador/tags',
    { nome },
  );
  toast.success(`Tag "${novaTag.nome}" criada e selecionada!`);
  return novaTag;
}

export function GovernadorForm({
  tagsDePersonalidadeDisponiveis,
  tagsDeGovernadorDisponiveis,
  defaultValues,
  onSubmit,
  submitLabel = 'Salvar',
  urlImagemPerfilExistente,
}: GovernadorFormProps) {
  const router = useRouter();

  const form = useForm<GovernadorFormValues>({
    resolver: zodResolver(governadorFormSchema),
    defaultValues: {
      nome: '',
      sobrenome: '',
      id_tag_personalidade: [],
      id_tags_de_governador: [],
      resumo_biografico: ' ',
      contexto_historico: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, errors =>
          console.log('ERROS DE VALIDAÇÃO:', errors),
        )}
        className={cn('w-full space-y-6', 'md:space-y-8', '2xl:space-y-10')}
      >
        <PersonalidadeBaseFields
          form={form as unknown as Parameters<typeof PersonalidadeBaseFields>[0]['form']}
          tagsDisponiveis={tagsDePersonalidadeDisponiveis}
          urlImagemPerfilExistente={urlImagemPerfilExistente}
        />

        {/* Campos específicos de Governador */}
        <div className='space-y-6 border-t pt-6'>
          <h3 className='text-lg font-semibold text-foreground'>
            Informações do Governador
          </h3>

          <FormField
            control={form.control}
            name='contexto_historico'
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Contexto Histórico</RequiredLabel>
                <FormControl>
                  <Textarea
                    placeholder='Descreva o contexto histórico do mandato...'
                    className='min-h-30 resize-y'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='id_tags_de_governador'
            render={({ field }) => (
              <FormItem>
                <TagSelector
                  tagsDisponiveis={tagsDeGovernadorDisponiveis}
                  selectedIds={field.value || []}
                  onSelectionChange={field.onChange}
                  onCreateTag={criarTagDeGovernador}
                  groupHeading='Tags de Governador'
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          className={cn(
            'flex flex-col-reverse gap-3 pt-6',
            'md:flex-row md:justify-end md:gap-4 md:pt-6',
            '2xl:pt-8',
          )}
        >
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            className={cn('cursor-pointer', 'w-full', 'md:w-auto')}
          >
            Voltar
          </Button>

          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className={cn('cursor-pointer', 'w-full', 'md:w-auto')}
          >
            {form.formState.isSubmitting ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
