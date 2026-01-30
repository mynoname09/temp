import { z } from 'zod';
import { personalidadeBaseFormSchema } from '../base/form-schemas';

// Schema Governador (Base + Específicos)
export const governadorFormSchema = personalidadeBaseFormSchema.extend({
  contexto_historico: z.string().min(5, 'Contexto histórico é obrigatório'),
  id_tags_de_governador: z.array(z.string()).optional(),
});

export type GovernadorFormValues = z.infer<typeof governadorFormSchema>;
