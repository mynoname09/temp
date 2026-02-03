'use client';

import { UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { RequiredLabel } from '@/components/ui/form/required-label';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { TagSelector } from '@/components/tags/TagSelector';

interface PersonalidadeBaseFieldsProps {
  form: UseFormReturn<PersonalidadeBaseFormValues>;
  tagsDisponiveis: TagDePersonalidadeFromApi[];
}

// TODO: RENOMEAR
/**
 * Cria uma nova tag de personalidade via API
 */
async function criarTagDePersonalidade(
  nome: string,
): Promise<TagDePersonalidadeFromApi> {
  const novaTag = await apiAcervoPublicoFCJA.post<TagDePersonalidadeFromApi>(
    '/personalidade/tags',
    { nome },
  );
  toast.success(`Tag "${novaTag.nome}" criada e selecionada!`);
  return novaTag;
}

/**
 * Trata erros na criação de tags
 */
function handleTagCreationError(error: unknown): never {
  console.error(error);
  toast.error('Erro ao criar tag. Verifique se ela já existe.');
  throw error;
}

export function PersonalidadeBaseFields({
  form,
  tagsDisponiveis,
}: PersonalidadeBaseFieldsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 m-0',
        'md:grid-cols-2 md:gap-5',
        'lg:gap-6',
        '2xl:gap-8',
      )}
    >
      <FormField
        control={form.control}
        name='nome'
        render={({ field }) => (
          <FormItem>
            <RequiredLabel>Nome</RequiredLabel>
            <FormControl>
              <Input placeholder='Ex: Ariano' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='sobrenome'
        render={({ field }) => (
          <FormItem>
            <RequiredLabel>Sobrenome</RequiredLabel>
            <FormControl>
              <Input placeholder='Ex: Suassuna' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Apelido */}
      <FormField
        control={form.control}
        name='apelido'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Apelido (Opcional)</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Naturalidade */}
      <FormField
        control={form.control}
        name='naturalidade'
        render={({ field }) => (
          <FormItem>
            {/* Usamos um flex no label para colocar a dica na mesma linha */}
            <div className='flex items-center gap-2'>
              <FormLabel className='mb-0'>Naturalidade (Opcional)</FormLabel>
              {/* barra vertical */}
              <span className='h-4 w-px bg-border inline-block' />
              <span className='text-xs text-muted-foreground font-normal hidden sm:inline-block'>
                (Formato: Cidade, Estado)
              </span>
            </div>

            <FormControl>
              <Input
                placeholder='Ex: Recife, Pernambuco'
                {...field}
                value={field.value || ''}
              />
            </FormControl>

            {/* O FormDescription/p foi removido daqui para não gerar altura extra */}
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tags de Personalidade */}
      <div className={cn('col-span-1', 'md:col-span-2')}>
        <FormField
          control={form.control}
          name='id_tag_personalidade'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 md:gap-3'>
              <div className='space-y-1'>
                <FormLabel className='text-base font-medium'>
                  Tags de Personalidade
                </FormLabel>
                <FormDescription className='text-sm'>
                  Categorize a personalidade selecionando tags existentes ou
                  criando novas.
                </FormDescription>
              </div>

              <FormControl>
                <TagSelector<TagDePersonalidadeFromApi>
                  tagsDisponiveis={tagsDisponiveis}
                  selectedIds={field.value || []}
                  onSelectionChange={(ids: string[]) =>
                    form.setValue('id_tag_personalidade', ids)
                  }
                  onCreateTag={async (nome: string) => {
                    try {
                      return await criarTagDePersonalidade(nome);
                    } catch (error) {
                      handleTagCreationError(error);
                    }
                  }}
                  searchPlaceholder='🔍 Buscar ou digitar nova tag...'
                  emptySelectionText='Clique para selecionar ou criar tags...'
                  groupHeading='Tags disponíveis'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Data nascimento */}
      <FormField
        control={form.control}
        name='data_nascimento'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de Nascimento</FormLabel>
            <FormControl>
              <Input
                type='date'
                {...field}
                value={field.value?.toString() ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Data falecimento */}
      <FormField
        control={form.control}
        name='data_falecimento'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de Falecimento</FormLabel>
            <FormControl>
              <Input
                type='date'
                {...field}
                value={field.value?.toString() ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* resumo bibliografico */}
      <FormField
        control={form.control}
        name='resumo_biografico'
        render={({ field }) => (
          <FormItem className={cn('col-span-1', 'md:col-span-2')}>
            <RequiredLabel>Resumo Biográfico</RequiredLabel>
            <FormControl>
              <textarea
                className={cn(
                  // Base (mobile)
                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-25 resize-y',
                  // md
                  'md:text-base md:min-h-30',
                  // 2xl (4K)
                  '2xl:min-h-35',
                )}
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* contribuicao cultural */}
      <FormField
        control={form.control}
        name='contribuicao_cultural'
        render={({ field }) => (
          <FormItem className={cn('col-span-1', 'md:col-span-2')}>
            <FormLabel>Contribuição Cultural (Opcional)</FormLabel>
            <FormControl>
              <textarea
                className={cn(
                  // Base (mobile)
                  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-25 resize-y',
                  // md
                  'md:text-base md:min-h-30',
                  // 2xl (4K)
                  '2xl:min-h-35',
                )}
                rows={4}
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
