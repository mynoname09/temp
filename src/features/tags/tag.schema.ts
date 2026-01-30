import z from 'zod';

export const baseTagSchema = z.object({
  id: z.uuid(),
  nome: z.string().min(1).max(100),
  slug: z.string(),
});

export type TagSchemaType = z.infer<typeof baseTagSchema>;
