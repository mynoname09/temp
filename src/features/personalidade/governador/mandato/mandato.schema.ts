import { z } from 'zod';

// Schema para Partido
export const partidoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  sigla: z.string(),
});

export type PartidoFromApi = z.infer<typeof partidoSchema>;

// Schema para governador resumido dentro do mandato
export const governadorResumoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  sobrenome: z.string(),
  slug: z.string(),
});

// Schema para resposta completa de mandato
export const mandatoResponseSchema = z.object({
  id: z.string(),
  periodo: z.string(),
  contexto_historico: z.string().nullable().optional(),
  data_inicio: z.string().nullable().optional(),
  data_fim: z.string().nullable().optional(),
  governador: governadorResumoSchema,
  partidos: z.array(partidoSchema).nullable().optional(),
});

export const listaMandatosSchema = z.array(mandatoResponseSchema);

export type MandatoFromApi = z.infer<typeof mandatoResponseSchema>;

// Schema para criação de mandato
export const createMandatoSchema = z.object({
  periodo: z.string().min(1, 'Período é obrigatório'),
  contexto_historico: z.string().optional(),
  data_inicio: z.string().min(1, 'Data de início é obrigatória'),
  data_fim: z.string().optional().nullable(),
  governador_id: z.string().uuid(),
  partidos_id: z.array(z.string().uuid()).optional(),
});

export type CreateMandatoForm = z.infer<typeof createMandatoSchema>;

// Schema para atualização de mandato
export const updateMandatoSchema = createMandatoSchema.partial().omit({
  governador_id: true,
});

export type UpdateMandatoForm = z.infer<typeof updateMandatoSchema>;
