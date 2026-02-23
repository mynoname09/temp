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
import { cn } from '@/lib/utils';
import {
  createMandatoSchema,
  CreateMandatoForm,
  MandatoFromApi,
  PartidoFromApi,
} from '@/features/personalidade/governador/mandato/mandato.schema';

interface FormMandatoProps {
  governadorId: string;
  mandato?: MandatoFromApi;
  partidos: PartidoFromApi[];
  onSubmit: (data: CreateMandatoForm) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function FormMandato({
  governadorId,
  mandato,
  partidos,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}: FormMandatoProps) {
  const form = useForm<CreateMandatoForm>({
    resolver: zodResolver(createMandatoSchema),
    defaultValues: {
      periodo: mandato?.periodo ?? '',
      contexto_historico: mandato?.contexto_historico ?? '',
      data_inicio: mandato?.data_inicio?.split('T')[0] ?? '',
      data_fim: mandato?.data_fim?.split('T')[0] ?? '',
      governador_id: governadorId,
      partidos_id: mandato?.partidos?.map((p) => p.id) ?? [],
    },
  });

  const handlePartidoToggle = (partidoId: string) => {
    const current = form.getValues('partidos_id') ?? [];
    if (current.includes(partidoId)) {
      form.setValue(
        'partidos_id',
        current.filter((id) => id !== partidoId),
      );
    } else {
      form.setValue('partidos_id', [...current, partidoId]);
    }
  };

  const selectedPartidos = form.watch('partidos_id') ?? [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <FormField
          control={form.control}
          name='periodo'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Período</RequiredLabel>
              <FormControl>
                <Input placeholder='Ex: 1990-1994' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='data_inicio'
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Data de Início</RequiredLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='data_fim'
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={false}>Data de Fim</RequiredLabel>
                <FormControl>
                  <Input type='date' {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='contexto_historico'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required={false}>Contexto Histórico</RequiredLabel>
              <FormControl>
                <Textarea
                  placeholder='Descreva o contexto histórico do mandato...'
                  className='min-h-24 resize-y'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Seleção de Partidos */}
        <div className='space-y-2'>
          <RequiredLabel required={false}>Partidos</RequiredLabel>
          <div className='flex flex-wrap gap-2 border rounded-lg p-3 min-h-12'>
            {partidos.map((partido) => (
              <button
                key={partido.id}
                type='button'
                onClick={() => handlePartidoToggle(partido.id)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm transition-colors',
                  selectedPartidos.includes(partido.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80',
                )}
              >
                {partido.sigla}
              </button>
            ))}
            {partidos.length === 0 && (
              <span className='text-muted-foreground text-sm'>
                Nenhum partido cadastrado
              </span>
            )}
          </div>
        </div>

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
