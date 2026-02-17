import { z } from 'zod';

export const personalidadeBaseFormSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  sobrenome: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  apelido: z.string().nullable().optional(),
  // Coerce converte a string do input date em Date ou mantém string valida
  data_nascimento: z.string().nullable().optional(),
  data_falecimento: z.string().nullable().optional(),
  naturalidade: z
    .string()
    .trim()
    .regex(
      /^[^,]+,\s*.+$/,
      'Use o formato: Cidade, Estado (ex: Recife, Pernambuco)',
    )
    .optional(),
  resumo_biografico: z.string().min(10, 'O resumo deve ser mais detalhado'),
  contribuicao_cultural: z.string().optional(),
  url_imagem_perfil: z.url().nullable().optional().or(z.literal('')),
  // Tags geralmente são array de IDs
  id_tag_personalidade: z.array(z.string()).optional(),
});

// 2. Schema Governador (Base + Específicos)
export const governadorFormSchema = personalidadeBaseFormSchema.extend({
  contexto_historico: z.string().min(5, 'Contexto histórico é obrigatório'),
  id_tags_de_governador: z.array(z.string()).optional(),
});

// 3. Schema Artista (Base + Específicos)
export const artistaFormSchema = personalidadeBaseFormSchema.extend({
  movimento_artistico: z.string().optional(), // Exemplo
  // Obras geralmente são tratadas como um FieldArray separado, mas podem estar aqui
});

export type PersonalidadeBaseFormValues = z.infer<
  typeof personalidadeBaseFormSchema
>;
export type GovernadorFormValues = z.infer<typeof governadorFormSchema>;
