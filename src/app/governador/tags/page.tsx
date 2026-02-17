import { Suspense } from 'react';
import WrapperListaTagsDeGovernador from '@/components/governador/tags-de-governador/WrapperListaTagsDeGovernador';
import { TagsLoadingFallback } from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade/fall-back';
import { WrapperGerenciamentoTags } from '@/components/LayoutGerenciamentoTag';

export default function ListaTagsGovernador() {
  return (
    <WrapperGerenciamentoTags
      titulo='Gerenciamento de Tags de Governador'
      descricao='Crie, busque e gerencie as tags de governador para categorizar os perfis.'
    >
      <Suspense fallback={<TagsLoadingFallback />}>
        <WrapperListaTagsDeGovernador />
      </Suspense>
    </WrapperGerenciamentoTags>
  );
}
