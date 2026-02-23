'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListaGovernadoresFromApi } from '@/features/personalidade/governador/governador.schema';
import CardGovernador from '../CardGovernador';
import ListaGovernadoresSkeleton from './skeleton-lista-governadores';

type ListaGovernadoresProps = {
  governadores: ListaGovernadoresFromApi[];
  hasMore: boolean;
  onLoadMoreAction: () => void;
  isLoadingMore: boolean;
  onItemDeletedAction: (id: string) => void;
};

export default function ListaGovernadores({
  governadores,
  hasMore,
  onLoadMoreAction,
  isLoadingMore,
  onItemDeletedAction: onItemDeleted,
}: ListaGovernadoresProps) {
  const { ref, inView } = useInView({
    rootMargin: '800px',
  });

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      onLoadMoreAction();
    }
  }, [inView, hasMore, isLoadingMore, onLoadMoreAction]);

  if (!governadores || governadores.length === 0) {
    return (
      <p className='text-center text-muted-foreground mt-10'>
        Nenhum resultado encontrado.
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {governadores.map(item => (
          <CardGovernador
            key={item.id}
            governador={item}
            onItemDeletedAction={onItemDeleted}
          />
        ))}

        {hasMore && (
          <ListaGovernadoresSkeleton quantidade={6} simple={true} />
        )}
      </div>

      {/* Sentinela (ref) - Serve apenas para detectar o scroll */}
      {hasMore && (
        <div
          ref={ref}
          className='w-full h-4 bg-transparent'
          aria-hidden='true'
        />
      )}

      {!hasMore && (
        <p className='text-center text-muted-foreground mt-4'>
          Todos os itens foram carregados.
        </p>
      )}
    </div>
  );
}
