import { Suspense } from 'react';
import WrapperListaTagsDeGovernador from '@/components/governador/tags-de-governador/WrapperListaTagsDeGovernador';
import { TagsLoadingFallback } from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade/fall-back';
import { LayoutGerenciamentoTag } from '@/components/LayoutGerenciamentoTag';

export default function ListaTagsGovernador() {
  return (
    <LayoutGerenciamentoTag>
      <Suspense fallback={<TagsLoadingFallback />}>
        <WrapperListaTagsDeGovernador />
      </Suspense>
    </LayoutGerenciamentoTag>
  );
}
