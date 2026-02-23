'use client';

import { MandatoFromApi } from '@/features/personalidade/governador/mandato/mandato.schema';
import { CalendarIcon, Edit2, Trash2, BriefcaseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardMandatoProps {
  mandato: MandatoFromApi;
  onEdit: (mandato: MandatoFromApi) => void;
  onDelete: (mandato: MandatoFromApi) => void;
}

export function CardMandato({ mandato, onEdit, onDelete }: CardMandatoProps) {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const dataInicio = formatDate(mandato.data_inicio);
  const dataFim = formatDate(mandato.data_fim);

  return (
    <div className='border rounded-lg p-4 hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <h4 className='font-semibold text-lg'>{mandato.periodo}</h4>

          {(dataInicio || dataFim) && (
            <div className='flex items-center gap-2 text-muted-foreground text-sm mt-1'>
              <CalendarIcon className='h-4 w-4' />
              <span>
                {dataInicio ?? '?'} - {dataFim ?? 'Atual'}
              </span>
            </div>
          )}

          {mandato.partidos && mandato.partidos.length > 0 && (
            <div className='flex items-center gap-2 mt-2'>
              <BriefcaseIcon className='h-4 w-4 text-muted-foreground' />
              <div className='flex flex-wrap gap-1'>
                {mandato.partidos.map((partido) => (
                  <span
                    key={partido.id}
                    className='px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs'
                  >
                    {partido.sigla}
                  </span>
                ))}
              </div>
            </div>
          )}

          {mandato.contexto_historico && (
            <p className='text-sm text-muted-foreground mt-2 line-clamp-2'>
              {mandato.contexto_historico}
            </p>
          )}
        </div>

        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onEdit(mandato)}
            className='h-8 w-8 hover:bg-blue-100'
          >
            <Edit2 className='h-4 w-4 text-blue-600' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onDelete(mandato)}
            className='h-8 w-8 hover:bg-red-100'
          >
            <Trash2 className='h-4 w-4 text-red-600' />
          </Button>
        </div>
      </div>
    </div>
  );
}
