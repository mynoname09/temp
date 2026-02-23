'use client';

import { EventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { CardEvento } from '../CardEvento';

interface ListaEventosProps {
  eventos: EventoFromApi[];
  onEdit: (evento: EventoFromApi) => void;
  onDelete: (evento: EventoFromApi) => void;
  onManageFotos: (evento: EventoFromApi) => void;
}

export function ListaEventos({
  eventos,
  onEdit,
  onDelete,
  onManageFotos,
}: ListaEventosProps) {
  if (eventos.length === 0) {
    return (
      <div className='text-center py-8 text-muted-foreground'>
        Nenhum evento cadastrado na linha do tempo.
      </div>
    );
  }

  // Ordenar eventos por data
  const sortedEventos = [...eventos].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
  );

  return (
    <div className='space-y-3'>
      {sortedEventos.map((evento) => (
        <CardEvento
          key={evento.id}
          evento={evento}
          onEdit={onEdit}
          onDelete={onDelete}
          onManageFotos={onManageFotos}
        />
      ))}
    </div>
  );
}
