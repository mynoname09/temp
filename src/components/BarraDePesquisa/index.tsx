'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { BaseTagFromApi } from '@/features/tags/tag.types';
import { FiltroFormSchema } from '@/lib/pesquisa/pesquisa.schemas';
import InputPesquisa from './InputPesquisa';
import ToggleFiltrosBtn from './ToggleFiltroBtn';
import ListaFiltros from './ListaFiltro';

export type BarraDePesquisaProps = {
  tagsPesquisa?: Array<BaseTagFromApi>;
  placeholderInput?: string;
  gatilhoBuscaAction: (dados: FiltroFormSchema) => Promise<void>;
};

export default function BarraDePesquisa({
  tagsPesquisa = [],
  placeholderInput = 'Pesquisar...',
  gatilhoBuscaAction,
}: BarraDePesquisaProps) {
  const [showFilters, setShowFilters] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    control,
  } = useForm<FiltroFormSchema>({
    defaultValues: {
      termo: '',
      id_tags: [],
    },
  });

  const tagsSelecionadas =
    useWatch({
      control,
      name: 'id_tags',
    }) ?? [];

  const termoPesquisado = useWatch({
    control,
    name: 'termo',
  });

  const onSubmit = async (data: FiltroFormSchema) => {
    await gatilhoBuscaAction(data);
  };

  const handleToggleTag = (id: string) => {
    const novasTags = tagsSelecionadas.includes(id)
      ? tagsSelecionadas.filter(tagId => tagId !== id)
      : [...tagsSelecionadas, id];

    setValue('id_tags', novasTags);

    if (!termoPesquisado || termoPesquisado === '') {
      handleSubmit(onSubmit)().catch(error => {
        console.error(
          'Erro ao submeter o formulário após alternar a tag',
          error,
        );
      });
    }
  };

  const handleOnClear = () => {
    setValue('termo', '');

    handleSubmit(onSubmit)().catch(error => {
      console.error('Erro ao submeter o formulário ao limpar o termo', error);
    });
  };

  const temTagsDisponiveis = tagsPesquisa.length > 0;

  return (
    <section className='pb-8 px-4'>
      <div className='container mx-auto max-w-3xl relative z-20'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex items-center gap-2 w-full'>
            <div className='flex-1'>
              <InputPesquisa
                register={register('termo')}
                control={control} // Passamos o control aqui
                placeholder={placeholderInput}
                onClear={handleOnClear}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>

        {temTagsDisponiveis && (
          <>
            <ToggleFiltrosBtn
              isOpen={showFilters}
              onClick={() => setShowFilters(!showFilters)}
              activeCount={tagsSelecionadas.length}
            />

            <ListaFiltros
              isVisible={showFilters}
              options={tagsPesquisa}
              selectedIds={tagsSelecionadas}
              onToggle={handleToggleTag}
              onClear={() => {
                setValue('id_tags', []);
                handleOnClear();
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
