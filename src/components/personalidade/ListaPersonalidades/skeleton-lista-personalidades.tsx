import CardPersonalidadeSkeleton from '../CardPersonalidade/skeleton-card-personalidades';

type ListaPersonalidadesSkeletonProps = {
  quantidade?: number;
  simple?: boolean;
};

export default function ListaPersonalidadesSkeleton({
  quantidade = 8,
  simple = false,
}: ListaPersonalidadesSkeletonProps) {
  const skeletons = Array.from({ length: quantidade }).map((_, index) => (
    <CardPersonalidadeSkeleton key={index} />
  ));

  if (simple) {
    return <>{skeletons}</>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {skeletons}
    </div>
  );
}
