import BarraDePesquisa from '@/components/BarraDePesquisa';
import ListaPersonalidadesSkeleton from '../ListaPersonalidades/skeleton-lista-personalidades';

export function PersonalidadesLoadingFallback() {
  const noopAction = async () => {
    'use server';
    return;
  };

  return (
    <>
      <BarraDePesquisa
        tagsPesquisa={[]}
        gatilhoBuscaAction={noopAction}
        placeholderInput='Digite o nome da personalidade...'
      />

      <section className='pb-8.5 px-4 min-h-[50vh]'>
        <div className='container mx-auto'>
          <ListaPersonalidadesSkeleton quantidade={8} />
        </div>
      </section>
    </>
  );
}
