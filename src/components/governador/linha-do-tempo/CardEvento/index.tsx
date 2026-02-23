'use client';

import { EventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { CalendarIcon, Edit2, Trash2, Globe, Lock, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CardEventoProps {
  evento: EventoFromApi;
  onEdit: (evento: EventoFromApi) => void;
  onDelete: (evento: EventoFromApi) => void;
  onManageFotos: (evento: EventoFromApi) => void;
}

export function CardEvento({
  evento,
  onEdit,
  onDelete,
  onManageFotos,
}: CardEventoProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const qtdFotos = evento.fotos?.length ?? 0;

  return (
    <div className='border rounded-lg p-4 hover:shadow-md transition-shadow'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h4 className='font-semibold text-lg'>{evento.titulo}</h4>
            <Badge variant={evento.publico ? 'default' : 'secondary'}>
              {evento.publico ? (
                <>
                  <Globe className='h-3 w-3 mr-1' />
                  Público
                </>
              ) : (
                <>
                  <Lock className='h-3 w-3 mr-1' />
                  Privado
                </>
              )}
            </Badge>
          </div>

          <div className='flex items-center gap-2 text-muted-foreground text-sm mt-1'>
            <CalendarIcon className='h-4 w-4' />
            <span>{formatDate(evento.data)}</span>
          </div>

          {evento.descricao && (
            <p className='text-sm text-muted-foreground mt-2 line-clamp-2'>
              {evento.descricao}
            </p>
          )}

          {qtdFotos > 0 && (
            <div className='flex items-center gap-1 mt-2 text-sm text-muted-foreground'>
              <ImageIcon className='h-4 w-4' />
              <span>{qtdFotos} foto{qtdFotos !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onManageFotos(evento)}
            className='h-8 w-8 hover:bg-purple-100'
            title='Gerenciar fotos'
          >
            <ImageIcon className='h-4 w-4 text-purple-600' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onEdit(evento)}
            className='h-8 w-8 hover:bg-blue-100'
          >
            <Edit2 className='h-4 w-4 text-blue-600' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onDelete(evento)}
            className='h-8 w-8 hover:bg-red-100'
          >
            <Trash2 className='h-4 w-4 text-red-600' />
          </Button>
        </div>
      </div>
    </div>
  );
}
