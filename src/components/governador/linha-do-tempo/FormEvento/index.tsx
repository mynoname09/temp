'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RequiredLabel } from '@/components/ui/form/required-label';
import {
  createEventoSchema,
  CreateEventoForm,
  EventoFromApi,
} from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FormEventoProps {
  linhaDoTempoId: string;
  evento?: EventoFromApi;
  onSubmit: (data: CreateEventoForm) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function FormEvento({
  linhaDoTempoId,
  evento,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}: FormEventoProps) {
  const form = useForm<CreateEventoForm>({
    resolver: zodResolver(createEventoSchema),
    defaultValues: {
      titulo: evento?.titulo ?? '',
      descricao: evento?.descricao ?? '',
      data: evento?.data?.split('T')[0] ?? '',
      publico: evento?.publico ?? false,
      linha_do_tempo_id: linhaDoTempoId,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='titulo'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Título</RequiredLabel>
              <FormControl>
                <Input placeholder='Ex: Início do mandato' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='data'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Data do Evento</RequiredLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='descricao'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required={false}>Descrição</RequiredLabel>
              <FormControl>
                <Textarea
                  placeholder='Descreva o evento...'
                  className='min-h-24 resize-y'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='publico'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <Label htmlFor='publico'>Evento Público</Label>
                <p className='text-sm text-muted-foreground'>
                  Eventos públicos podem ser vinculados a outras linhas do tempo.
                </p>
              </div>
              <FormControl>
                <Switch
                  id='publico'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-3 pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            className='cursor-pointer'
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='cursor-pointer'
          >
            {form.formState.isSubmitting ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
