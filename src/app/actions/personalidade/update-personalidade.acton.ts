'use server';

import { BasePersonalidadeFromApi } from '@/features/personalidade/base/personalidade.type';
import { ActionResult, createActionResult } from '@/lib/@types/action-result';
import { apiAcervoPublicoFCJA } from '@/utils/api/acervoPublicoFCJA.api';

/**
 * Action para atualizar uma personalidade existente
 * @param slug - Slug da personalidade a ser atualizada
 * @param formData - FormData contendo os dados atualizados e imagem de perfil (opcional)
 */
export async function updatePersonalidadeAction(
  slug: string,
  formData: FormData,
): Promise<ActionResult<BasePersonalidadeFromApi>> {
  let response: ActionResult<BasePersonalidadeFromApi>;

  try {
    const responseApi =
      await apiAcervoPublicoFCJA.put<BasePersonalidadeFromApi>(
        `/personalidade/update/${slug}`,
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
    console.error('Erro ao editar personalidade:', error);
    response = createActionResult({
      success: false,
      errors: ['Erro ao editar personalidade'],
    });
  }

  return response;
}
