import {
  createTagGovernadorAction,
  deleteTagGovernadorAction,
  updateTagGovernadorAction,
} from '@/app/actions/governador/tag-governador.actions';
import GerenciadorTags from '@/components/tags/GerenciadorTags';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { getListaTagsDeGovernador } from '@/features/tags/governador/tag-governador.service';

export default async function WrapperListaTagsDeGovernador() {
  const initialTags = await getListaTagsDeGovernador();

  return (
    <GerenciadorTags<TagDeGovernadorFromApi>
      initialTags={initialTags}
      actions={{
        create: createTagGovernadorAction,
        update: updateTagGovernadorAction,
        remove: deleteTagGovernadorAction,
      }}
      entityName='governador'
      searchPlaceholder='Buscar tags de governador...'
    />
  );
}
