import GerenciadorDeBuscaPersonalidades from '@/components/personalidade/WrapperLista';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';

export default async function WrapperListaPersonalidades() {
  // throw new Error('Página desativada temporariamente.');

  const tagsDePersonalidadeFromApi = await getListaTagsDePersonalidade();

  return (
    <main className='flex-1 w-full flex flex-col'>
      <section className='py-7 md:py-10 pb-2 px-1'>
        <div className='container mx-auto text-center'>
          <div className='mx-auto text-center'>
            <h1 className='text-5xl md:text-5xl font-bold  mb-6 text-red-900'>
              Memória e Protagonismo Paraibano
            </h1>
            <p className='text-lg text-muted-foreground'>
              Artistas, intelectuais e figuras públicas cujas contribuições
              permanecem vivas na memória do estado.
            </p>
          </div>
        </div>
      </section>

      <GerenciadorDeBuscaPersonalidades
        tagsDisponiveisPesquisa={tagsDePersonalidadeFromApi}
      />
    </main>
  );
}
