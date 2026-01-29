import { z } from 'zod';
import { obrasArtistaResponseSchema } from '../artistas/artes/arteArtista.schema';

export const personalidadesResponseSchema = z.object({
  id: z.string(),
  url_imagem_perfil: z.string().nullable().optional(),
  nome: z.string(),
  sobrenome: z.string(),
  apelido: z.string().nullable().optional(),
  slug: z.string(),
  data_nascimento: z.string().nullable(),
  data_falecimento: z.string().nullable(),
  naturalidade: z.string().nullable(),
  nome_tags_de_personalidade: z.array(z.string()).nullable(),
  obras: z.array(obrasArtistaResponseSchema).nullable(),
  resumo_biografico: z.string().nullable(),
  contribuicao_cultural: z.string().nullable(),
});

export const listaPersonalidadesArraySchema = z.array(
  personalidadesResponseSchema,
);

export type ListaPersonalidadesFromApi = z.infer<
  typeof personalidadesResponseSchema
>;
export type PersonalidadeDeListaFromApi = z.infer<
  typeof personalidadesResponseSchema
>;

export const queryPersonalidadeSchema = z.object({
  termo: z.string().nullable().optional(),
  id_tags_de_personalidade: z.array(z.string()).optional().nullable(),
  cursor: z.string().nullable().optional(),
});
export type QueryPersonalidade = z.infer<typeof queryPersonalidadeSchema>;
