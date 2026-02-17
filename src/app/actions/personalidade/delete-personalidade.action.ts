'use server';

import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

export async function deletePersonalidadeAction(
  slug: string,
): Promise<ActionResult<BasePersonalidadeFromApi>> {
  let response: ActionResult<BasePersonalidadeFromApi>;

  try {
    await apiAcervoPublicoFCJA.delete<BasePersonalidadeFromApi>(
      `/personalidade/delete/${slug}`,
    );

    response = createActionResult({
      success: true,
    });
  } catch (error) {
    console.error('Erro ao excluir personalidade:', error);
    response = createActionResult({
      success: false,
      errors: ['Erro ao excluir personalidade'],
    });
  }

  return response;
}
