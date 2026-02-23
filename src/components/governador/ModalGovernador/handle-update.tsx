'use server';

import { redirect } from 'next/navigation';

export async function handleUpdateGovernador(id: string) {
  redirect(`/governador/${id}`);
}
