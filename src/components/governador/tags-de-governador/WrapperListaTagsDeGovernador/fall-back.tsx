import { GerenciadorTagsShell, ListaTagsSkeleton } from '@/components/tags';

export function TagsLoadingFallback() {
  return (
    <GerenciadorTagsShell
      entityName='governador'
      searchPlaceholder='Buscar tags de governador...'
    >
      <ListaTagsSkeleton quantidade={12} />
    </GerenciadorTagsShell>
  );
}
