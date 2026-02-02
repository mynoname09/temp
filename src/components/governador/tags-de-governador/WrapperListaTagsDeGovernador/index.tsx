import GerenciadorTags, { TagActions } from '@/components/tags/GerenciadorTags';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';

type WrapperListaTagsDeGovernadorProps = {
  initialTags: TagDeGovernadorFromApi[];
  actions: TagActions<TagDeGovernadorFromApi>;
};

export default function WrapperListaTagsDeGovernador({
  initialTags,
  actions,
}: WrapperListaTagsDeGovernadorProps) {
  return (
    <GerenciadorTags<TagDeGovernadorFromApi>
      initialTags={initialTags}
      actions={actions}
      entityName='governador'
      searchPlaceholder='Buscar tags de governador...'
    />
  );
}
