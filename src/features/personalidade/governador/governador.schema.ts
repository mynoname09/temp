import { z } from 'zod';

// Schema para mandato resumido
export const mandatoResumoSchema = z.object({
  id: z.string(),
  periodo: z.string(),
  data_inicio: z.string(),
  data_fim: z.string().nullable().optional(),
  partidos: z.array(z.string()).nullable().optional(),
});

export const governadorResponseSchema = z.object({
  id: z.string(),
  url_imagem_perfil: z.string().nullable().optional(),
  nome: z.string(),
  sobrenome: z.string(),
  apelido: z.string().nullable().optional(),
  slug: z.string(),
  data_nascimento: z.string().nullable().optional(),
  data_falecimento: z.string().nullable().optional(),
  naturalidade: z.string().nullable().optional(),
  contexto_historico: z.string(),
  tags_de_governador: z.array(z.string()).nullable().optional(),
  tags_de_personalidade: z.array(z.string()).nullable().optional(),
  mandatos: z.array(mandatoResumoSchema).nullable().optional(),
  linha_do_tempo_path: z.string().nullable().optional(),
  criado_em: z.string(),
});

export const listaGovernadoresArraySchema = z.array(governadorResponseSchema);

export type MandatoResumo = z.infer<typeof mandatoResumoSchema>;
export type ListaGovernadoresFromApi = z.infer<typeof governadorResponseSchema>;
export type GovernadorDeListaFromApi = z.infer<typeof governadorResponseSchema>;

export const queryGovernadorSchema = z.object({
  nome: z.string().nullable().optional(),
  id_tags_de_governador: z.array(z.string()).optional().nullable(),
  id_tags_personalidade: z.array(z.string()).optional().nullable(),
  cursor: z.string().nullable().optional(),
});
export type QueryGovernador = z.infer<typeof queryGovernadorSchema>;
