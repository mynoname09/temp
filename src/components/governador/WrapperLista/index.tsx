'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { BaseTagFromApi } from '@/features/tags/@types/tag.types';
import { FiltroFormSchema } from '@/lib/pesquisa/pesquisa.schemas';
import BarraDePesquisa from '@/components/BarraDePesquisa';
import { getListaGovernadores } from '@/features/personalidade/governador/services/governador.service';
import { CursorPaginationResult } from '@/utils/api/acervoPublicoFCJA.api';
import { ListaGovernadoresFromApi } from '@/features/personalidade/governador/governador.schema';
import ListaGovernadores from '../ListaGovernadores';
import ListaGovernadoresSkeleton from '../ListaGovernadores/skeleton-lista-governadores';
import { isAbortError } from '@/utils/api/erro.helper';

type Props = {
  tagsDisponiveisPesquisa?: BaseTagFromApi[];
};

export default function WrapperListaGovernadores({
  tagsDisponiveisPesquisa,
}: Props) {
  const [resultados, setResultados] =
    useState<CursorPaginationResult<ListaGovernadoresFromApi>>();

  const [filtrosAtuais, setFiltrosAtuais] = useState<FiltroFormSchema>({
    termo: '',
    id_tags: [],
  });

  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const dados = await getListaGovernadores();
        setResultados(dados);
        setHasMore(!!dados.next_cursor);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    });
  }, []);

  const handleBusca = async (dados: FiltroFormSchema) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setFiltrosAtuais(dados);
    setIsLoadingMore(false);
    setHasMore(true);

    const newController = new AbortController();
    abortControllerRef.current = newController;

    startTransition(async () => {
      try {
        const dadosRetornados = await getListaGovernadores(
          {
            nome: dados.termo,
            id_tags_de_governador: dados.id_tags,
          },
          { signal: newController.signal },
        );

        setResultados(dadosRetornados);
        setHasMore(!!dadosRetornados.next_cursor);
      } catch (error) {
        if (isAbortError(error)) {
          return;
        }
      } finally {
        if (abortControllerRef.current === newController) {
          abortControllerRef.current = null;
        }
      }
    });
  };

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || !resultados?.next_cursor) return;

    setIsLoadingMore(true);

    const cursorParaBusca = resultados.next_cursor;
    const filtrosParaBusca = filtrosAtuais;

    try {
      const novosDados = await getListaGovernadores({
        nome: filtrosParaBusca.termo,
        id_tags_de_governador: filtrosParaBusca.id_tags,
        cursor: cursorParaBusca,
      });

      setResultados(prev => {
        if (!prev) return novosDados;

        // Race condition protection
        if (prev.next_cursor !== cursorParaBusca) {
          return prev;
        }

        return {
          data: [...prev.data, ...novosDados.data],
          next_cursor: novosDados.next_cursor,
        };
      });

      setHasMore(!!novosDados.next_cursor);
    } catch (error) {
      console.error('Erro ao carregar mais itens:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, filtrosAtuais, isLoadingMore, resultados?.next_cursor]);

  const isLoading = !resultados || isPending;

  const handleItemDeleted = (idDoGovernador: string) => {
    setResultados(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        data: prev.data.filter(item => item.id !== idDoGovernador),
      };
    });
  };

  return (
    <>
      <BarraDePesquisa
        tagsPesquisa={tagsDisponiveisPesquisa}
        gatilhoBuscaAction={handleBusca}
        placeholderInput='Digite o nome do governador...'
      />

      <section className='pb-8.5 px-4 min-h-[50vh]'>
        <div className='container mx-auto'>
          {isLoading ? (
            <ListaGovernadoresSkeleton quantidade={8} />
          ) : (
            resultados && (
              <ListaGovernadores
                governadores={resultados.data}
                onLoadMoreAction={handleLoadMore}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                onItemDeletedAction={handleItemDeleted}
              />
            )
          )}
        </div>
      </section>
    </>
  );
}
