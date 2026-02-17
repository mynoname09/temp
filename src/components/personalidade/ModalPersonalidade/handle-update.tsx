'use server';

import { redirect } from 'next/navigation';

export async function handleUpdate(slug: string) {
  redirect(`/personalidade/${slug}`);
}
