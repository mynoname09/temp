import { Suspense } from 'react';
import WrapperListaTagsDePersonalidade from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade';
import { TagsLoadingFallback } from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade/fall-back';
import { WrapperGerenciamentoTags } from '@/components/LayoutGerenciamentoTag';

export default function ListaTagsPersonalidade() {
  return (
    <WrapperGerenciamentoTags
      titulo='Gerenciamento de Tags de Personalidade'
      descricao='Crie, busque e gerencie as tags de personalidade para categorizar os perfis.'
    >
      <Suspense fallback={<TagsLoadingFallback />}>
        <WrapperListaTagsDePersonalidade />
      </Suspense>
    </WrapperGerenciamentoTags>
  );
}
