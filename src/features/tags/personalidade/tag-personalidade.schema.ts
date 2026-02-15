import z from 'zod';
import { BaseTagFromApi } from '../@types/tag.types';
import { createTagBaseSchema, updateTagBaseSchema } from '../tag.schema';

export type TagDePersonalidadeFromApi = BaseTagFromApi;

export const createTagDePersonalidadeSchema = createTagBaseSchema.extend({});

export const updateTagDePersonalidadeSchema = updateTagBaseSchema.extend({});

export type CreateTagDePersonalidadeDto = z.infer<
  typeof createTagDePersonalidadeSchema
>;
export type UpdateTagDePersonalidadeDto = z.infer<
  typeof updateTagDePersonalidadeSchema
>;
