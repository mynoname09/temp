import { GerenciadorTagsShell } from "@/components/tags/GerenciadorTags/gerenciador-shell";
import ListaTagsSkeleton from "@/components/tags/ListaTags/skeleton-lista-tags";


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
