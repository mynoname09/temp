import { z } from 'zod';

// Schema para validação de arquivo de imagem
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const imagemPerfilSchema = z
  .instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, 'Imagem deve ter no máximo 5MB')
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Formato aceito: .jpg, .jpeg, .png ou .webp',
  )
  .nullable()
  .optional();

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
  // url_imagem_perfil: z.url().nullable().optional().or(z.literal('')),
  // Arquivo de imagem de perfil (para upload)
  imagemPerfil: imagemPerfilSchema,
  // Flag para remover imagem de perfil existente (usado na edição)
  removerImagemPerfil: z.boolean().optional(),
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
