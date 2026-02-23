import { Skeleton } from '@/components/ui/skeleton';

interface ListaGovernadoresSkeletonProps {
  /** Quantidade de cards skeleton a exibir (padrão: 8) */
  quantidade?: number;
  /** Modo simples (sem animação de grid) */
  simple?: boolean;
}

export default function ListaGovernadoresSkeleton({
  quantidade = 8,
  simple = false,
}: ListaGovernadoresSkeletonProps) {
  const skeletonCards = Array(quantidade)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className='group bg-card rounded-lg shadow-sm border border-border overflow-hidden'
      >
        {/* Imagem Skeleton */}
        <div className='aspect-square overflow-hidden'>
          <Skeleton className='w-full h-full' />
        </div>

        {/* Conteúdo Skeleton */}
        <div className='p-4 space-y-2'>
          {/* Nome */}
          <Skeleton className='h-6 w-3/4' />
          {/* Tags */}
          <Skeleton className='h-5 w-1/2' />
          {/* Localidade */}
          <div className='flex items-center gap-1'>
            <Skeleton className='w-3 h-3 rounded-full' />
            <Skeleton className='h-3 w-20' />
          </div>
        </div>
      </div>
    ));

  if (simple) {
    return <>{skeletonCards}</>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {skeletonCards}
    </div>
  );
}
