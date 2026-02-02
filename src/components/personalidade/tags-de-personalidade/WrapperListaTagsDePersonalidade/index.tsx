import GerenciadorTags, { TagActions } from '@/components/tags/GerenciadorTags';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';

type WrapperListaTagsDePersonalidadeProps = {
  initialTags: TagDePersonalidadeFromApi[];
  actions: TagActions<TagDePersonalidadeFromApi>;
};

export default function WrapperListaTagsDePersonalidade({
  initialTags,
  actions,
}: WrapperListaTagsDePersonalidadeProps) {
  return (
    <GerenciadorTags<TagDePersonalidadeFromApi>
      initialTags={initialTags}
      actions={actions}
      entityName='personalidade'
      searchPlaceholder='Buscar tags de personalidade...'
    />
  );
}
