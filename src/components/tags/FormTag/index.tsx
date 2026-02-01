'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formTagSchema = z.object({
  nome: z.string().min(1, 'O nome da tag é obrigatório').max(100, 'O nome deve ter no máximo 100 caracteres'),
});

export type FormTagData = z.infer<typeof formTagSchema>;

export type FormTagProps = {
  defaultValues?: Partial<FormTagData>;
  onSubmit: (data: FormTagData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  isEditing?: boolean;
};

export default function FormTag({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
  isEditing = false,
}: FormTagProps) {
  const form = useForm<FormTagData>({
    resolver: zodResolver(formTagSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (data: FormTagData) => {
    await onSubmit(data);
    if (!isEditing) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da tag</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome da tag..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : (submitLabel ?? (isEditing ? 'Salvar' : 'Adicionar'))}
          </Button>
        </div>
      </form>
    </Form>
  );
}
