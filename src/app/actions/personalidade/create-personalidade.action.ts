'use server';

import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';
// import { translateErrorMessage } from "@/utils/traducao";
import { redirect } from 'next/navigation';

export async function createPersonalidadeAction(
  data: PersonalidadeBaseFormValues,
) {
  let response: any;

  try {
    response = await apiAcervoPublicoFCJA.post<PersonalidadeBaseFormValues>(
      '/personalidade/new',
      data,
    );
  } catch (error) {
    console.error('Erro ao criar personalidade:', error);
    throw String(error);
  }

  redirect(`/personalidade/${response.slug}`);
}
