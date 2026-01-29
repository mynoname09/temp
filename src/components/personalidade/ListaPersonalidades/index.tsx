'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListaPersonalidadesFromApi } from '@/features/personalidade/base/personalidade.schema';
import CardPersonalidade from '../CardPersonalidade';
import ListaPersonalidadesSkeleton from './skeleton-lista-personalidades';

type ListaPersonalidadesProps = {
  personalidades: ListaPersonalidadesFromApi[];
  hasMore: boolean;
  onLoadMoreAction: () => void;
  isLoadingMore: boolean;
};

export default function ListaPersonalidades({
  personalidades,
  hasMore,
  onLoadMoreAction,
  isLoadingMore,
}: ListaPersonalidadesProps) {
  const { ref, inView } = useInView({
    rootMargin: '800px',
  });

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      onLoadMoreAction();
    }
  }, [inView, hasMore, isLoadingMore, onLoadMoreAction]);

  if (!personalidades || personalidades.length === 0) {
    return (
      <p className='text-center text-muted-foreground mt-10'>
        Nenhum resultado encontrado.
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {personalidades.map(item => (
          <CardPersonalidade key={item.id} personalidade={item} />
        ))}

        {hasMore && (
          <ListaPersonalidadesSkeleton quantidade={6} simple={true} />
        )}
      </div>

      {/* Sentinela (ref).
         Serve APENAS para detectar o scroll.
         Não coloque conteúdo visual aqui dentro para não quebrar o layout.
      */}
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
