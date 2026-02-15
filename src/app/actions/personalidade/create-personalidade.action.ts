'use server';

import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

export async function createPersonalidadeAction(
  data: PersonalidadeBaseFormValues,
): Promise<ActionResult<BasePersonalidadeFromApi>> {
  let response: ActionResult<BasePersonalidadeFromApi>;

  try {
    const responseApi =
      await apiAcervoPublicoFCJA.post<BasePersonalidadeFromApi>(
        '/personalidade/new',
        data,
      );

    response = createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao criar personalidade:', error);

    return createActionResult({
      success: false,
      errors: ['Erro ao criar personalidade. Tente novamente mais tarde.'],
    });
  }

  return response;
}
