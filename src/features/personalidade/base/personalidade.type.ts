/* 
{
  "id": "534de446-df6b-43f8-a05c-e2ca7c99a76a",
  "nome": "João",
  "sobrenome": "Silva",
  "apelido": "Zé Ramalho",
  "data_nascimento": "1980-05-15T00:00:00.000Z",
  "data_falecimento": "2020-10-20T00:00:00.000Z",
  "contribuicao_cultural": "Destacou-se na vida pública brasileira como um dos principais representantes da Paraíba.",
  "naturalidade": "São Paulo, Brasil",
  "resumo_biografico": "João Silva foi um importante político brasileiro...",
  "slug": "joao-hf50q3",
  "url_imagem_perfil": "https://example.com/imagens/joao-silva.jpg",
  "tags_personalidade": [
    {
      "id": "6fbc67c2-c201-4f38-9f1e-266517d4b07d",
      "nome": "Escritor(a)",
      "slug": "escritor"
    }
  ],
  "codigos_tipo_personalidade": []
}
*/

import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';

export interface BasePersonalidadeFromApi {
  id: string;
  nome: string;
  sobrenome: string;
  apelido?: string;
  data_nascimento?: string | null;
  data_falecimento?: string | null;
  naturalidade?: string;
  resumo_biografico: string;
  contribuicao_cultural?: string;
  url_imagem_perfil?: string;
  slug: string;
  tags_personalidade: TagDePersonalidadeFromApi[];
  codigos_tipo_personalidade: string[]; // Ex: ["governador", "artista"]
}
