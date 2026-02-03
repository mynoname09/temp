import { GerenciadorTagsShell } from "@/components/tags/GerenciadorTags/gerenciador-shell";
import ListaTagsSkeleton from "@/components/tags/ListaTags/skeleton-lista-tags";

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
