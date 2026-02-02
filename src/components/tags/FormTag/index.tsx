'use client';

import { useEffect } from 'react';
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
  nome: z
    .string()
    .min(1, 'O nome da tag é obrigatório')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
});

export type FormTagData = z.infer<typeof formTagSchema>;

export type FormTagProps = {
  defaultValues?: Partial<FormTagData>;
  onSubmitAction: (data: FormTagData) => Promise<void>;
  onCancelAction?: () => void;
  submitLabel?: string;
  isEditing?: boolean;
};

export default function FormTag({
  defaultValues,
  onSubmitAction,
  onCancelAction,
  submitLabel,
  isEditing = false,
}: FormTagProps) {
  const form = useForm<FormTagData>({
    resolver: zodResolver(formTagSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
    },
  });

  // Atualiza os valores quando defaultValues mudar
  useEffect(() => {
    form.reset({
      nome: defaultValues?.nome ?? '',
    });
  }, [defaultValues, form]);

  const { isSubmitting } = form.formState;

  const handleSubmit = async (data: FormTagData) => {
    await onSubmitAction(data);
    if (!isEditing) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='nome'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da tag</FormLabel>
              <FormControl>
                <Input placeholder='Digite o nome da tag...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2 justify-end'>
          {onCancelAction && (
            <Button
              type='button'
              variant='outline'
              onClick={onCancelAction}
              className='cursor-pointer'
            >
              Cancelar
            </Button>
          )}
          <Button
            type='submit'
            disabled={isSubmitting}
            className='cursor-pointer'
          >
            {isSubmitting
              ? 'Salvando...'
              : (submitLabel ?? (isEditing ? 'Salvar' : 'Adicionar'))}
          </Button>
        </div>
      </form>
    </Form>
  );
}
