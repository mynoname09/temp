import { Suspense } from 'react';
import WrapperListaTagsDePersonalidade from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade';
import { TagsLoadingFallback } from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade/fall-back';
import { LayoutGerenciamentoTag } from '@/components/LayoutGerenciamentoTag';

export default function ListaTagsPersonalidade() {
  return (
    <LayoutGerenciamentoTag>
      <Suspense fallback={<TagsLoadingFallback />}>
        <WrapperListaTagsDePersonalidade />
      </Suspense>
    </LayoutGerenciamentoTag>
  );
}
