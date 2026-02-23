'use client';

import { MandatoFromApi } from '@/features/personalidade/governador/mandato/mandato.schema';
import { CardMandato } from '../CardMandato';

interface ListaMandatosProps {
  mandatos: MandatoFromApi[];
  onEdit: (mandato: MandatoFromApi) => void;
  onDelete: (mandato: MandatoFromApi) => void;
}

export function ListaMandatos({ mandatos, onEdit, onDelete }: ListaMandatosProps) {
  if (mandatos.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        Nenhum mandato cadastrado para este governador.
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {mandatos.map((mandato) => (
        <CardMandato
          key={mandato.id}
          mandato={mandato}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
