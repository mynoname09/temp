import z from 'zod';

export const baseTagSchema = z.object({
  id: z.uuid(),
  nome: z.string().min(1).max(100),
  slug: z.string(),
});

export const createTagBaseSchema = z.object({
  nome: z.string().min(1).max(100),
});

export const updateTagBaseSchema = z.object({
  nome: z.string().min(1).max(100).optional(),
});
