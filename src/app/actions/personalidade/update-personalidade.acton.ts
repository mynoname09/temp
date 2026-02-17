'use server';

import { PersonalidadeBaseFormValues } from '@/features/personalidade/base/form-schemas';
import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

export async function updatePersonalidadeAction(
  slug: string,
  updatedData: PersonalidadeBaseFormValues,
): Promise<ActionResult<BasePersonalidadeFromApi>> {
  let response: ActionResult<BasePersonalidadeFromApi>;

  try {
    const responseApi =
      await apiAcervoPublicoFCJA.put<BasePersonalidadeFromApi>(
        `/personalidade/update/${slug}`,
        updatedData,
      );

    response = createActionResult({
      success: true,
      data: responseApi,
    });
  } catch (error) {
    console.error('Erro ao editar personalidade:', error);
    response = createActionResult({
      success: false,
      errors: ['Erro ao editar personalidade'],
    });
  }

  return response;
}
