/**
 * Utilitário para construir FormData a partir de objetos de formulário
 * Útil para enviar dados com arquivos (multipart/form-data)
 */

/**
 * Converte um objeto de formulário em FormData
 * @param data - Objeto com os dados do formulário
 * @param options - Opções de configuração
 * @returns FormData pronto para envio
 */
export function buildFormData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  options?: {
    /** Nome do campo de arquivo (padrão: 'file') */
    fileFieldName?: string;
    /** Campos que devem ser ignorados */
    excludeFields?: string[];
  },
): FormData {
  const formData = new FormData();
  const excludeFields = options?.excludeFields ?? [];

  for (const [key, value] of Object.entries(data)) {
    // Ignorar campos excluídos
    if (excludeFields.includes(key)) {
      continue;
    }

    // Ignorar valores undefined
    if (value === undefined) {
      continue;
    }

    // Tratar null
    if (value === null) {
      // Não adiciona campos null ao FormData
      continue;
    }

    // Tratar arquivos
    if (value instanceof File) {
      formData.append(key, value);
      continue;
    }

    // Tratar arrays
    if (Array.isArray(value)) {
      value.forEach(item => {
        formData.append(key, String(item));
      });
      continue;
    }

    // Tratar booleanos
    if (typeof value === 'boolean') {
      formData.append(key, String(value));
      continue;
    }

    // Tratar números
    if (typeof value === 'number') {
      formData.append(key, String(value));
      continue;
    }

    // Tratar strings
    if (typeof value === 'string') {
      formData.append(key, value);
      continue;
    }
  }

  return formData;
}

/**
 * Converte dados de personalidade para FormData
 * Função específica para o formulário de personalidade
 */
export function buildPersonalidadeFormData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
): FormData {
  return buildFormData(data);
}
