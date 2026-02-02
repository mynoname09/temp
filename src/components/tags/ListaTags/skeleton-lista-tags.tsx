'use client';

import { Skeleton } from '@/components/ui/skeleton';

type ListaTagsSkeletonProps = {
  quantidade?: number;
};

export default function ListaTagsSkeleton({
  quantidade = 8,
}: ListaTagsSkeletonProps) {
  return (
    <div className='flex flex-wrap gap-3'>
      {Array.from({ length: quantidade }).map((_, index) => (
        <Skeleton
          key={index}
          className='h-8 rounded-full'
          // eslint-disable-next-line react-hooks/purity
          style={{ width: `${Math.random() * 60 + 60}px` }}
        />
      ))}
    </div>
  );
}
