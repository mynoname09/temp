import FormEditarGovernador from '@/components/governador/forms/FormEditarGovernador';
import { getGovernadorById } from '@/features/personalidade/governador/services/get-governador-by-id';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { getListaTagsDePersonalidade } from '@/features/tags/personalidade/tag-personalidade.service';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { getListaTagsDeGovernador } from '@/features/tags/governador/tag-governador.service';
import { getMandatosByGovernadorId } from '@/features/personalidade/governador/mandato/mandato.service';
import { getAllPartidos } from '@/features/personalidade/governador/partido/partido.service';
import { getLinhaDoTempoByGovernadorId } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.service';
import { Metadata } from 'next';
import { GovernadorEditPageClient } from './client';

export const metadata: Metadata = {
  title: 'Editar governador',
};

type GovernadorSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GovernadorSlugPage({
  params,
}: GovernadorSlugPageProps) {
  const { slug } = await params;

  // Buscar dados em paralelo
  const [
    tagsDePersonalidadeDisponiveis,
    tagsDeGovernadorDisponiveis,
    governador,
    partidos,
  ] = await Promise.all([
    getListaTagsDePersonalidade(),
    getListaTagsDeGovernador(),
    getGovernadorById(slug),
    getAllPartidos(),
  ]);

  // Buscar mandatos e linha do tempo do governador específico
  const [mandatos, linhaDoTempo] = await Promise.all([
    getMandatosByGovernadorId(governador.id),
    getLinhaDoTempoByGovernadorId(governador.id),
  ]);

  return (
    <GovernadorEditPageClient
      governador={governador}
      tagsDePersonalidadeDisponiveis={tagsDePersonalidadeDisponiveis}
      tagsDeGovernadorDisponiveis={tagsDeGovernadorDisponiveis}
      mandatos={mandatos}
      partidos={partidos}
      linhaDoTempo={linhaDoTempo}
    />
  );
}
