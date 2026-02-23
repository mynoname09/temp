import { z } from 'zod';

// Schema para foto do evento
export const fotoEventoSchema = z.object({
  id: z.string(),
  url: z.string(),
  descricao: z.string().nullable().optional(),
  criado_em: z.string(),
});

export type FotoEventoFromApi = z.infer<typeof fotoEventoSchema>;

// Schema para evento da linha do tempo
export const eventoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descricao: z.string().nullable().optional(),
  data: z.string(),
  publico: z.boolean(),
  criado_em: z.string(),
  atualizado_em: z.string(),
  fotos: z.array(fotoEventoSchema).nullable().optional(),
});

export type EventoFromApi = z.infer<typeof eventoSchema>;

// Schema para linha do tempo
export const linhaDoTempoSchema = z.object({
  id: z.string(),
  governador_id: z.string(),
  eventos: z.array(eventoSchema).nullable().optional(),
});

export type LinhaDoTempoFromApi = z.infer<typeof linhaDoTempoSchema>;

// Schema para criação de linha do tempo
export const createLinhaDoTempoSchema = z.object({
  governador_id: z.string().uuid(),
});

export type CreateLinhaDoTempoForm = z.infer<typeof createLinhaDoTempoSchema>;

// Schema para criação de evento
export const createEventoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().optional(),
  data: z.string().min(1, 'Data é obrigatória'),
  publico: z.boolean(),
  linha_do_tempo_id: z.string().uuid(),
});

export type CreateEventoForm = z.infer<typeof createEventoSchema>;

// Schema para atualização de evento
export const updateEventoSchema = createEventoSchema.partial().omit({
  linha_do_tempo_id: true,
});

export type UpdateEventoForm = z.infer<typeof updateEventoSchema>;

// Schema para criação de foto
export const createFotoEventoSchema = z.object({
  evento_id: z.string().uuid(),
  descricao: z.string().optional(),
});

export type CreateFotoEventoForm = z.infer<typeof createFotoEventoSchema>;

// Schema para atualização de foto
export const updateFotoEventoSchema = z.object({
  descricao: z.string().optional(),
});

export type UpdateFotoEventoForm = z.infer<typeof updateFotoEventoSchema>;
