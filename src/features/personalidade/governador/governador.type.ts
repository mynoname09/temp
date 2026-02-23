import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';

export interface GovernadorFromApi {
  id: string;
  nome: string;
  sobrenome: string;
  apelido?: string;
  data_nascimento?: string | null;
  data_falecimento?: string | null;
  naturalidade?: string;
  resumo_biografico: string;
  contribuicao_cultural?: string;
  url_imagem_perfil?: string | null;
  slug: string;
  contexto_historico: string;
  tags_de_governador?: TagDeGovernadorFromApi[];
  nome_tags_de_governador?: string[];
}
