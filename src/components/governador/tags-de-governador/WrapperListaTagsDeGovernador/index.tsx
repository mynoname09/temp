import GerenciadorTags, { TagActions } from '@/components/tags/GerenciadorTags';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';

type WrapperListaTagsDeGovernadorProps = {
  initialTags: TagDeGovernadorFromApi[];
  actions: TagActions<TagDeGovernadorFromApi>;
};

// Componente específico para gerenciar tags de governador
// Utiliza o componente genérico GerenciadorTags
export default function WrapperListaTagsDeGovernador({
  initialTags,
  actions,
}: WrapperListaTagsDeGovernadorProps) {
  return (
    <GerenciadorTags<TagDeGovernadorFromApi>
      initialTags={initialTags}
      actions={actions}
      entityName="governador"
      title="Tags de Governador"
      searchPlaceholder="Buscar tags de governador..."
    />
  );
}
