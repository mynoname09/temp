'use client';

import { useState } from 'react';
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { BaseTagFromApi } from '@/features/tags/tag.types';
import { SelectedTagsDisplay } from './tags-selecionadas';

export interface TagSelectorProps<TTag extends BaseTagFromApi> {
  tagsDisponiveis: TTag[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onCreateTag?: (nome: string) => Promise<TTag>;
  onTagsUpdate?: (tags: TTag[]) => void;
  searchPlaceholder?: string;
  emptySelectionText?: string;
  groupHeading?: string;
  disabled?: boolean;
}

export function TagSelector<TTag extends BaseTagFromApi>({
  tagsDisponiveis,
  selectedIds,
  onSelectionChange,
  onCreateTag,
  onTagsUpdate,
  searchPlaceholder = '🔍 Buscar ou digitar nova tag...',
  emptySelectionText = 'Clique para selecionar ou criar tags...',
  groupHeading = 'Tags disponíveis',
  disabled = false,
}: TagSelectorProps<TTag>) {
  const [tagsLocais, setTagsLocais] = useState<TTag[]>(tagsDisponiveis);
  const [inputValue, setInputValue] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTag = async (nomeDaTag: string) => {
    if (!nomeDaTag || !onCreateTag) return;

    setIsCreating(true);

    try {
      const novaTag = await onCreateTag(nomeDaTag);
      const novasTags = [...tagsLocais, novaTag];

      setTagsLocais(novasTags);
      onTagsUpdate?.(novasTags);
      onSelectionChange([...selectedIds, novaTag.id]);
      setInputValue('');
    } catch (error) {
      console.error('Erro ao criar tag:', error);
      throw error; // Re-throw para que o componente pai possa tratar
    } finally {
      setIsCreating(false);
    }
  };

  const toggleTag = (tagId: string) => {
    if (selectedIds.includes(tagId)) {
      onSelectionChange(selectedIds.filter(id => id !== tagId));
    } else {
      onSelectionChange([...selectedIds, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    onSelectionChange(selectedIds.filter(id => id !== tagId));
  };

  return (
    <div className='flex flex-col gap-2 md:gap-3'>
      <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            disabled={disabled}
            className={cn(
              'w-full justify-between h-auto min-h-11 px-3 py-2 border-2 transition-colors',
              'hover:bg-accent/50 hover:border-primary/30 cursor-pointer',
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
                <PlusIcon className='h-4 w-4' />
                {emptySelectionText}
              </span>
            )}
            <ChevronsUpDownIcon
              className={cn(
                'ml-2 h-4 w-4 shrink-0 transition-transform duration-200',
                openCombobox && 'rotate-180',
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className='w-(--radix-popover-trigger-width) p-0 shadow-lg border-2'
          align='start'
        >
          <Command className='rounded-lg'>
            <CommandInput
              placeholder={searchPlaceholder}
              value={inputValue}
              onValueChange={setInputValue}
              className='h-11'
            />
            <CommandList>
              <CommandEmpty className='py-4 px-4'>
                {inputValue.trim().length > 0 ? (
                  <div className='flex flex-col items-center gap-3 text-center'>
                    <div className='rounded-full bg-muted p-3'>
                      <PlusIcon className='h-5 w-5 text-muted-foreground' />
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Tag não encontrada</p>
                      <p className='text-xs text-muted-foreground'>
                        Deseja criar uma nova tag?
                      </p>
                    </div>
                    {onCreateTag && (
                      <Button
                        type='button'
                        variant='default'
                        size='sm'
                        className='w-full gap-2'
                        onClick={() => handleCreateTag(inputValue)}
                        disabled={isCreating}
                      >
                        <PlusIcon className='h-4 w-4' />
                        {isCreating ? 'Criando...' : `Criar "${inputValue}"`}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className='flex flex-col items-center gap-2 text-center py-2'>
                    <p className='text-sm text-muted-foreground'>
                      Nenhuma tag disponível.
                    </p>
                    {onCreateTag && (
                      <p className='text-xs text-muted-foreground'>
                        Digite para criar uma nova.
                      </p>
                    )}
                  </div>
                )}
              </CommandEmpty>

              <CommandGroup
                heading={groupHeading}
                className='max-h-56 overflow-y-auto'
              >
                {tagsLocais.map(tag => {
                  const isSelected = selectedIds.includes(tag.id);
                  return (
                    <CommandItem
                      key={tag.id}
                      value={tag.nome}
                      onSelect={() => toggleTag(tag.id)}
                      className={cn(
                        'flex items-center gap-2 cursor-pointer transition-colors',
                        'aria-selected:bg-transparent data-[selected=true]:bg-transparent',
                        'aria-selected:text-foreground data-[selected=true]:text-foreground',
                        'hover:text-accent-foreground!',
                        isSelected && 'text-accent-foreground! font-medium',
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
                        {isSelected && <CheckIcon className='h-3 w-3' />}
                      </div>
                      <span className='flex-1'>{tag.nome}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Tags selecionadas */}
      {selectedIds.length > 0 && (
        <SelectedTagsDisplay
          selectedIds={selectedIds}
          tags={tagsLocais}
          onRemoveTag={removeTag}
        />
      )}
    </div>
  );
}
