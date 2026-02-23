import ListaGovernadoresSkeleton from '../ListaGovernadores/skeleton-lista-governadores';

export function GovernadoresLoadingFallback() {
  return (
    <section className='pb-8.5 px-4 min-h-[50vh]'>
      <div className='container mx-auto'>
        <ListaGovernadoresSkeleton quantidade={8} />
      </div>
    </section>
  );
}
