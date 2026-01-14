import z from "zod";

const GovBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  bio_summary: z.string().max(1000).nullable(),
  profile_image_url: z.string().url().nullable(),
});

export const GovCreateSchema = GovBaseSchema.omit({ id: true });
