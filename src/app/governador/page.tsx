import { Suspense } from 'react';
import { ConteudoListaGovernador } from '@/components/governador/WrapperLista/conteudo-lista-governador';
import { GovernadoresLoadingFallback } from '@/components/governador/WrapperLista/fallback-conteudo-lista-de-governador';

export default function GovernadoresPage() {
  return (
    <main className='flex-1 w-full flex flex-col'>
      <section className='py-7 md:py-10 pb-2 px-1'>
        <div className='container mx-auto text-center'>
          <div className='mx-auto text-center'>
            <h1 className='text-5xl md:text-5xl font-bold mb-6 text-red-900'>
              Governadores da Paraíba
            </h1>
            <p className='text-lg text-muted-foreground'>
              Conheça os governadores que marcaram a história política do estado
              da Paraíba.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<GovernadoresLoadingFallback />}>
        <ConteudoListaGovernador />
      </Suspense>
    </main>
  );
}
