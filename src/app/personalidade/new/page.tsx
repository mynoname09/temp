import { Separator } from '@/components/ui/separator';
import FormCriarPersonalidade from '@/components/personalidade/FormCriarPersonalidade';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';

export default async function CriarPersonalidadePage() {
  const tagsDisponiveis: TagDePersonalidadeFromApi[] =
    await getListaTagsDePersonalidade();

  return (
    <div className='min-h-screen items-center justify-center px-10 py-8'>
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

      <FormCriarPersonalidade tagsDisponiveis={tagsDisponiveis} />
    </div>
  );
}
