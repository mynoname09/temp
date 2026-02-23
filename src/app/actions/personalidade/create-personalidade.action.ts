'use server';

import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para criar uma nova personalidade
 * @param formData - FormData contendo os dados da personalidade e imagem de perfil (opcional)
 */
export async function createPersonalidadeAction(
  formData: FormData,
): Promise<ActionResult<BasePersonalidadeFromApi>> {
  let response: ActionResult<BasePersonalidadeFromApi>;

  try {
    const responseApi =
      await apiAcervoPublicoFCJA.post<BasePersonalidadeFromApi>(
        '/personalidade/new',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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
