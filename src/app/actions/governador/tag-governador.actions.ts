'use server';

import { revalidatePath } from 'next/cache';
import {
  createTagDeGovernador,
  updateTagDeGovernador,
  removeTagDeGovernador,
} from '@/features/tags/governador/tag-governador.service';
import { CreateTagDto } from '@/features/tags/tag.types';

export async function createTagGovernadorAction(data: CreateTagDto) {
  const newTag = await createTagDeGovernador(data);
  revalidatePath('/governador/tags');
  return newTag;
}

export async function updateTagGovernadorAction(
  id: string,
  data: Partial<CreateTagDto>,
) {
  const updatedTag = await updateTagDeGovernador(id, data);
  revalidatePath('/governador/tags');
  return updatedTag;
}

export async function deleteTagGovernadorAction(id: string) {
  await removeTagDeGovernador(id);
  revalidatePath('/governador/tags');
}
