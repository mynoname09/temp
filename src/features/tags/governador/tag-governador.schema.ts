import z from 'zod';
import { BaseTagFromApi } from '../tag.types';
import { createTagBaseSchema, updateTagBaseSchema } from '../tag.schema';

export type TagDeGovernadorFromApi = BaseTagFromApi;

export const createTagDeGovernadorSchema = createTagBaseSchema.extend({});

export const updateTagDeGovernadorSchema = updateTagBaseSchema.extend({});

export type CreateTagDeGovernadorDto = z.infer<
  typeof createTagDeGovernadorSchema
>;
export type UpdateTagDeGovernadorDto = z.infer<
  typeof updateTagDeGovernadorSchema
>;
