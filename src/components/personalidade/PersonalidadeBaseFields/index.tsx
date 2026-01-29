'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { TagDePersonalidadeFromApi } from '@/features/tags/tag-de-personalidade/tag-de-personalidade.schema';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
import { RequiredLabel } from '@/components/ui/form/required-label';

interface PersonalidadeBaseFieldsProps {
  form: UseFormReturn<PersonalidadeBaseFormValues>;
  tagsDisponiveis: TagDePersonalidadeFromApi[];
}

export function PersonalidadeBaseFields({
  form,
  tagsDisponiveis: tagsIniciais,
}: PersonalidadeBaseFieldsProps) {
  const [tagsLocais, setTagsLocais] =
    useState<TagDePersonalidadeFromApi[]>(tagsIniciais);

  const [inputValue, setInputValue] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateTag(nomeDaTag: string) {
    if (!nomeDaTag) return;

    // Previne múltiplos cliques
    setIsCreating(true);

    try {
      const novaTag =
        await apiAcervoPublicoFCJA.post<TagDePersonalidadeFromApi>(
          '/personalidade/tags',
          { nome: nomeDaTag },
        );

      setTagsLocais(prev => [...prev, novaTag]);

      const currentValues = form.getValues('id_tag_personalidade') || [];
      // Se certifique de que está salvando apenas o ID (string)
      form.setValue('id_tag_personalidade', [...currentValues, novaTag.id]);

      toast.success(`Tag "${novaTag.nome}" criada e selecionada!`);
      setInputValue('');
      // Opcional: Fechar o popover após criar
      // setOpenCombobox(false);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar tag. Verifique se ela já existe.');
    } finally {
      setIsCreating(false);
    }
  }

  const toggleTag = (tagId: string, currentIds: string[]) => {
    if (currentIds.includes(tagId)) {
      form.setValue(
        'id_tag_personalidade',
        currentIds.filter(id => id !== tagId),
      );
    } else {
      form.setValue('id_tag_personalidade', [...currentIds, tagId]);
    }
  };

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
            <FormLabel>Naturalidade (Opcional)</FormLabel>
            <FormDescription>
              Use o formato: Cidade, Estado (ex: Recife, Pernambuco)
            </FormDescription>
            <FormControl>
              <Input
                placeholder='Ex: Recife, Pernambuco'
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tags de Personalidade */}
      <div className='col-span-1 md:col-span-2'>
        <FormField
          control={form.control}
          name='id_tag_personalidade'
          render={({ field }) => {
            const selectedIds = field.value || [];

            return (
              <FormItem className='flex flex-col gap-2'>
                <div className='space-y-1'>
                  <FormLabel className='text-base font-medium'>
                    Tags de Personalidade
                  </FormLabel>
                  <FormDescription className='text-sm'>
                    Categorize a personalidade selecionando tags existentes ou
                    criando novas.
                  </FormDescription>
                </div>

                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between h-auto min-h-11 px-3 py-2 border-2 transition-colors',
                          'hover:bg-accent/50 hover:border-primary/30',
                          openCombobox && 'border-primary ring-2 ring-primary/20',
                          !selectedIds.length && 'text-muted-foreground',
                        )}
                      >
                        {selectedIds.length > 0 ? (
                          <div className='flex items-center gap-2 text-left'>
                            <span className='text-sm font-medium text-foreground'>
                              {selectedIds.length}{' '}
                              {selectedIds.length === 1
                                ? 'tag selecionada'
                                : 'tags selecionadas'}
                            </span>
                          </div>
                        ) : (
                          <span className='flex items-center gap-2'>
                            <Plus className='h-4 w-4' />
                            Clique para selecionar ou criar tags...
                          </span>
                        )}
                        <ChevronsUpDown
                          className={cn(
                            'ml-2 h-4 w-4 shrink-0 transition-transform duration-200',
                            openCombobox && 'rotate-180',
                          )}
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent
                    className='w-(--radix-popover-trigger-width) p-0 shadow-lg border-2'
                    align='start'
                  >
                    <Command className='rounded-lg'>
                      <CommandInput
                        placeholder='🔍 Buscar ou digitar nova tag...'
                        value={inputValue}
                        onValueChange={setInputValue}
                        className='h-11'
                      />
                      <CommandList>
                        <CommandEmpty className='py-4 px-4'>
                          {inputValue.trim().length > 0 ? (
                            <div className='flex flex-col items-center gap-3 text-center'>
                              <div className='rounded-full bg-muted p-3'>
                                <Plus className='h-5 w-5 text-muted-foreground' />
                              </div>
                              <div className='space-y-1'>
                                <p className='text-sm font-medium'>
                                  Tag não encontrada
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  Deseja criar uma nova tag?
                                </p>
                              </div>
                              <Button
                                type='button'
                                variant='default'
                                size='sm'
                                className='w-full gap-2'
                                onClick={() => handleCreateTag(inputValue)}
                                disabled={isCreating}
                              >
                                <Plus className='h-4 w-4' />
                                {isCreating
                                  ? 'Criando...'
                                  : `Criar "${inputValue}"`}
                              </Button>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center gap-2 text-center py-2'>
                              <p className='text-sm text-muted-foreground'>
                                Nenhuma tag disponível.
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                Digite para criar uma nova.
                              </p>
                            </div>
                          )}
                        </CommandEmpty>

                        <CommandGroup
                          heading='Tags disponíveis'
                          className='max-h-56 overflow-y-auto'
                        >
                          {tagsLocais.map(tag => {
                            const isSelected = selectedIds.includes(tag.id);
                            return (
                              <CommandItem
                                key={tag.id}
                                value={tag.nome}
                                onSelect={() => {
                                  toggleTag(tag.id, selectedIds);
                                }}
                                className={cn(
                                  'flex items-center gap-2 cursor-pointer transition-colors',
                                  isSelected && 'bg-primary/10',
                                )}
                              >
                                <div
                                  className={cn(
                                    'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
                                    isSelected
                                      ? 'border-primary bg-primary text-primary-foreground'
                                      : 'border-muted-foreground/30',
                                  )}
                                >
                                  {isSelected && <Check className='h-3 w-3' />}
                                </div>
                                <span
                                  className={cn(
                                    'flex-1',
                                    isSelected && 'font-medium',
                                  )}
                                >
                                  {tag.nome}
                                </span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {selectedIds.length > 0 && (
                  <div className='rounded-lg border bg-muted/30 p-3 space-y-2'>
                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
                      Tags selecionadas ({selectedIds.length})
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {selectedIds.map(id => {
                        const tag = tagsLocais.find(t => t.id === id);
                        if (!tag) return null;
                        return (
                          <Badge
                            key={id}
                            variant='secondary'
                            className='pl-3 pr-1.5 py-1.5 text-sm font-medium flex items-center gap-1.5 bg-background border shadow-sm hover:shadow transition-shadow'
                          >
                            {tag.nome}
                            <button
                              type='button'
                              className='ml-1 p-0.5 rounded-full hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-colors'
                              onClick={() => toggleTag(id, selectedIds)}
                              aria-label={`Remover tag ${tag.nome}`}
                            >
                              <X className='h-3.5 w-3.5 text-muted-foreground hover:text-destructive transition-colors' />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
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
          <FormItem className='md:col-span-2'>
            <RequiredLabel>Resumo Biográfico</RequiredLabel>
            <FormControl>
              <textarea
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
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
          <FormItem className='md:col-span-2'>
            <FormLabel>Contribuição Cultural (Opcional)</FormLabel>
            <FormControl>
              <textarea
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
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
