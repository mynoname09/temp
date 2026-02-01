'use server';

import { revalidatePath } from 'next/cache';
import {
  createTagDePersonalidade,
  updateTagDePersonalidade,
  removeTagDePersonalidade,
} from '@/features/tags/personalidade/tag-personalidade.service';
import { CreateTagDto } from '@/features/tags/tag.types';

export async function createTagPersonalidadeAction(data: CreateTagDto) {
  const newTag = await createTagDePersonalidade(data);
  revalidatePath('/personalidade/tags');
  return newTag;
}

export async function updateTagPersonalidadeAction(
  id: string,
  data: Partial<CreateTagDto>,
) {
  const updatedTag = await updateTagDePersonalidade(id, data);
  revalidatePath('/personalidade/tags');
  return updatedTag;
}

export async function deleteTagPersonalidadeAction(id: string) {
  await removeTagDePersonalidade(id);
  revalidatePath('/personalidade/tags');
}
