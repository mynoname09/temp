import GerenciadorDeBuscaPersonalidades from '@/components/personalidade/WrapperLista';
import { getListaTagsDePersonalidade } from '@/features/tags/tag-de-personalidade/service/tag-de-personalidade.service';

export default async function WrapperListaPersonalidades() {
  const tagsDePersonalidadeFromApi = await getListaTagsDePersonalidade();

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <main className='flex-1 w-full'>
        <section className='py-20 pb-2 px-1'>
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
    </div>
  );
}
