import z from 'zod';

export const obrasArtistaResponseSchema = z.object({
  id: z.uuid(),
  titulo: z.string(),
  link: z.string().optional().nullable(),
});

export type ObrasArtistaForApi = z.infer<typeof obrasArtistaResponseSchema>;
