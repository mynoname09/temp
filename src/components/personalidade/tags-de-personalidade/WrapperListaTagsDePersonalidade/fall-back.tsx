import { GerenciadorTagsShell, ListaTagsSkeleton } from '@/components/tags';

export function TagsLoadingFallback() {
  return (
    <GerenciadorTagsShell
      entityName='personalidade'
      searchPlaceholder='Buscar tags de personalidade...'
    >
      <ListaTagsSkeleton quantidade={12} />
    </GerenciadorTagsShell>
  );
}
