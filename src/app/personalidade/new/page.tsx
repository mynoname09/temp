import { Separator } from '@/components/ui/separator'; //
import { getListaTagsDePersonalidade } from '@/features/tags/tag-de-personalidade/service/tag-de-personalidade.service';
import { TagDePersonalidadeFromApi } from '@/features/tags/tag-de-personalidade/tag-de-personalidade.schema';
import FormCriarPersonalidade from '@/components/personalidade/FormCriarPersonalidade';

export default async function CriarPersonalidadePage() {
  // 1. Busca os dados no lado do servidor (Rápido, seguro e sem loading spinner no cliente)
  const tagsDisponiveis: TagDePersonalidadeFromApi[] =
    await getListaTagsDePersonalidade();

  return (
    <div className='max-w-3xl mx-auto py-10'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Nova Personalidade
        </h1>
        <p className='text-muted-foreground'>
          Cadastre uma personalidade geral (sem cargo político ou artístico
          vinculado).
        </p>
      </div>

      <Separator className='my-6' />

      {/* 2. Passa os dados para o componente cliente */}
      <FormCriarPersonalidade tagsDisponiveis={tagsDisponiveis} />
    </div>
  );
}
