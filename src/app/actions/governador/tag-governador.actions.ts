'use server';

import { revalidatePath } from 'next/cache';
import {
  createTagDeGovernador,
  updateTagDeGovernador,
  removeTagDeGovernador,
} from '@/features/tags/governador/tag-governador.service';
import {
  CreateTagDeGovernadorDto,
  UpdateTagDeGovernadorDto,
} from '@/features/tags/governador/tag-governador.schema';

// TODO: RESOLVER NA FEATURE DE GOVERNADOR

export async function createTagGovernadorAction(
  data: CreateTagDeGovernadorDto,
) {
  const newTag = await createTagDeGovernador(data);
  revalidatePath('/governador/tags');
  return newTag;
}

export async function updateTagGovernadorAction(
  id: string,
  data: UpdateTagDeGovernadorDto,
) {
  const updatedTag = await updateTagDeGovernador(id, data);
  revalidatePath('/governador/tags');
  return updatedTag;
}

export async function deleteTagGovernadorAction(id: string) {
  await removeTagDeGovernador(id);
  revalidatePath('/governador/tags');
}
