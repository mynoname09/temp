import GerenciadorTags, { TagActions } from '@/components/tags/GerenciadorTags';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';

type WrapperListaTagsDePersonalidadeProps = {
  initialTags: TagDePersonalidadeFromApi[];
  actions: TagActions<TagDePersonalidadeFromApi>;
};

// Componente específico para gerenciar tags de personalidade
// Utiliza o componente genérico GerenciadorTags
export default function WrapperListaTagsDePersonalidade({
  initialTags,
  actions,
}: WrapperListaTagsDePersonalidadeProps) {
  return (
    <GerenciadorTags<TagDePersonalidadeFromApi>
      initialTags={initialTags}
      actions={actions}
      entityName="personalidade"
      title="Tags de Personalidade"
      searchPlaceholder="Buscar tags de personalidade..."
    />
  );
}
