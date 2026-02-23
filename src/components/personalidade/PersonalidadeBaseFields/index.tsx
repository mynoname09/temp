'use client';

import { useState, useRef } from 'react';
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { RequiredLabel } from '@/components/ui/form/required-label';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { TagSelector } from '@/components/tags/TagSelector';

interface PersonalidadeBaseFieldsProps {
  form: UseFormReturn<PersonalidadeBaseFormValues>;
  tagsDisponiveis: TagDePersonalidadeFromApi[];
  /** URL da imagem de perfil existente (para edição) */
  urlImagemPerfilExistente?: string | null;
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
  urlImagemPerfilExistente,
}: PersonalidadeBaseFieldsProps) {
  // Preview local (nova imagem selecionada) ou null
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  // Controla se a imagem existente foi removida
  const [imagemExistenteRemovida, setImagemExistenteRemovida] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // URL da imagem para exibir: nova imagem local > imagem existente (se não removida)
  const imagemUrlExistente = urlImagemPerfilExistente
    ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${urlImagemPerfilExistente}`
    : null;
  const previewUrl = localPreviewUrl || (!imagemExistenteRemovida ? imagemUrlExistente : null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Atualiza o form
      form.setValue('imagemPerfil', file, { shouldValidate: true });
      // Reseta flag de remoção já que está adicionando nova imagem
      form.setValue('removerImagemPerfil', false);

      // Cria preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Se tinha imagem existente removida, reseta o estado
      setImagemExistenteRemovida(false);
    }
  };

  const handleRemoveImage = () => {
    form.setValue('imagemPerfil', null);
    setLocalPreviewUrl(null);
    setImagemExistenteRemovida(true);
    // Setar flag para remover imagem no backend (se tinha imagem existente)
    if (urlImagemPerfilExistente) {
      form.setValue('removerImagemPerfil', true);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 m-0',
        'md:grid-cols-2 md:gap-5',
        'lg:gap-6',
        '2xl:gap-8',
      )}
    >
      {/* Imagem de Perfil */}
      <div className={cn('col-span-1', 'md:col-span-2')}>
        <FormField
          control={form.control}
          name='imagemPerfil'
          render={({ field: { onChange: _onChange, value: _value, ref: _ref, ...field } }) => (
            <FormItem>
              <FormLabel>Foto de Perfil</FormLabel>
              <FormDescription className='text-sm'>
                Formatos aceitos: JPG, JPEG, PNG ou WEBP. Máximo 5MB.
              </FormDescription>
              <FormControl>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
                  {/* Preview da imagem */}
                  <div
                    className={cn(
                      'relative w-32 h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted/50',
                      previewUrl && 'border-solid border-primary/50',
                    )}
                  >
                    {previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt='Preview'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <span className='text-muted-foreground text-xs text-center px-2'>
                        Sem imagem
                      </span>
                    )}
                  </div>

                  {/* Controles */}
                  <div className='flex flex-col gap-2'>
                    <Input
                      type='file'
                      accept='image/jpeg,image/jpg,image/png,image/webp'
                      ref={inputFileRef}
                      onChange={handleImageChange}
                      className='w-full max-w-xs cursor-pointer'
                      name={field.name}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                    {previewUrl && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={handleRemoveImage}
                        className='w-fit cursor-pointer'
                      >
                        Remover imagem
                      </Button>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
