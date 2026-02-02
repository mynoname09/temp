'use server';

import { revalidatePath } from 'next/cache';
import {
  createTagDePersonalidade,
  updateTagDePersonalidade,
  removeTagDePersonalidade,
} from '@/features/tags/personalidade/tag-personalidade.service';
import {
  CreateTagDePersonalidadeDto,
  UpdateTagDePersonalidadeDto,
} from '@/features/tags/personalidade/tag-personalidade.schema';

export async function createTagPersonalidadeAction(
  data: CreateTagDePersonalidadeDto,
) {
  const newTag = await createTagDePersonalidade(data);
  revalidatePath('/personalidade/tags');
  return newTag;
}

export async function updateTagPersonalidadeAction(
  id: string,
  data: UpdateTagDePersonalidadeDto,
) {
  const updatedTag = await updateTagDePersonalidade(id, data);
  revalidatePath('/personalidade/tags');
  return updatedTag;
}

export async function deleteTagPersonalidadeAction(id: string) {
  await removeTagDePersonalidade(id);
  revalidatePath('/personalidade/tags');
}
