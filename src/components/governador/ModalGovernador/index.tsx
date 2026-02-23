'use client';

import { GovernadorDeListaFromApi } from '@/features/personalidade/governador/governador.schema';
import { Modal, ModalProps } from '../../Modal';
import { ModalBody } from '../../Modal/modal-body';
import {
  BookOpenIcon,
  CalendarIcon,
  MapPinIcon,
  ScrollTextIcon,
  BriefcaseIcon,
} from 'lucide-react';
import { ModalHeader } from '../../Modal/modal-header';
import Image from 'next/image';
import {
  formatDateToLocaleString,
  getYearFromDateString,
} from '@/utils/transform-date';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { handleDeleteGovernador } from './handle-delete';
import { handleUpdateGovernador } from './handle-update';

type ModalGovernadorProps = {
  governador: GovernadorDeListaFromApi;
  onDeleteSuccess: () => void;
} & ModalProps;

export default function ModalGovernador({
  governador,
  isOpen,
  onClose,
  onDeleteSuccess,
}: ModalGovernadorProps) {
  const [imagePerfilError, setImagePerfilError] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={
          <div className='flex flex-col leading-tight'>
            <span className='font-bold'>
              {`${governador.nome} ${governador.sobrenome}`}{' '}
            </span>
            {governador.apelido && (
              <span className='text-base font-normal text-muted-foreground'>
                {`Pseudônimo: ${governador.apelido}`}
              </span>
            )}
          </div>
        }
        onClose={onClose}
      />
      <ModalBody>
        <div className='flex flex-col md:flex-row gap-6 mb-6'>
          {/* Foto */}
          <div className='w-full md:w-48 h-48 bg-muted rounded-lg overflow-hidden shrink-0'>
            {governador.url_imagem_perfil && !imagePerfilError ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${governador.url_imagem_perfil}`}
                alt={governador.nome}
                width={192}
                height={192}
                className='w-full h-full object-cover'
                unoptimized
                onError={() => setImagePerfilError(true)}
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <BookOpenIcon className='w-12 h-12 text-muted-foreground' />
              </div>
            )}
          </div>

          {/* Informações Básicas */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start gap-2 mb-3'>
              <ScrollTextIcon className='w-5 h-5 text-highlight shrink-0 mt-1' />
              <span
                className='text-lg font-semibold text-highlight line-clamp-2'
                title={governador.tags_de_governador?.join(', ')}
              >
                {governador.tags_de_governador?.join(', ') || 'Governador'}
              </span>
            </div>

            <div className='space-y-2 text-sm'>
              {governador.naturalidade && (
                <div className='flex items-center gap-2'>
                  <MapPinIcon className='w-4 h-4 text-muted-foreground' />
                  <span className='text-muted-foreground'>
                    Natural de {governador.naturalidade}
                  </span>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <CalendarIcon className='w-4 h-4 text-muted-foreground' />
                <span
                  className='text-muted-foreground'
                  title={`${formatDateToLocaleString(governador.data_nascimento ?? null)}`}
                >
                  {getYearFromDateString(governador.data_nascimento ?? null)}
                </span>
                <span>-</span>
                <span
                  className='text-muted-foreground'
                  title={`${formatDateToLocaleString(governador.data_falecimento ?? null)}`}
                >
                  {governador.data_falecimento
                    ? getYearFromDateString(governador.data_falecimento)
                    : 'Presente'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contexto Histórico */}
        {governador.contexto_historico && (
          <div className='mb-6'>
            <h4 className='font-semibold text-foreground mb-3'>
              Contexto Histórico
            </h4>
            <p className='text-muted-foreground leading-relaxed text-justify whitespace-pre-line'>
              {governador.contexto_historico}
            </p>
          </div>
        )}

        {/* Mandatos */}
        {governador.mandatos && governador.mandatos.length > 0 && (
          <div className='mb-6'>
            <h4 className='font-semibold text-foreground mb-3 flex items-center gap-2'>
              <BriefcaseIcon className='w-4 h-4' />
              Mandatos
            </h4>
            <div className='space-y-3'>
              {governador.mandatos.map(mandato => (
                <div
                  key={mandato.id}
                  className='p-3 bg-muted/50 rounded-lg border border-border'
                >
                  <div className='flex items-center gap-2 mb-1'>
                    <CalendarIcon className='w-4 h-4 text-muted-foreground' />
                    <span className='font-medium text-foreground'>
                      {mandato.periodo}
                    </span>
                  </div>
                  {mandato.partidos && mandato.partidos.length > 0 && (
                    <div className='text-sm text-muted-foreground'>
                      Partido(s): {mandato.partidos.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags de Personalidade */}
        {governador.tags_de_personalidade &&
          governador.tags_de_personalidade.length > 0 && (
            <div className='mb-6'>
              <h4 className='font-semibold text-foreground mb-3'>
                Outras Características
              </h4>
              <div className='flex flex-wrap gap-2'>
                {governador.tags_de_personalidade.map((tag, index) => (
                  <span
                    key={index}
                    className='px-2 py-1 bg-muted text-muted-foreground rounded text-xs border border-border'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
      </ModalBody>

      <div className='flex justify-end gap-3 p-6 border-t bg-muted/30 rounded-md'>
        <button
          onClick={() =>
            handleDeleteGovernador(
              governador.id,
              governador.nome,
              onClose,
              onDeleteSuccess,
            )
          }
          className={cn(
            'px-4 py-2 text-sm font-medium ',
            'bg-accent hover:bg-accent/50 text-primary',
            'rounded-md transition-colors',
            'cursor-pointer',
          )}
        >
          Excluir Governador
        </button>

        <button
          onClick={() => handleUpdateGovernador(governador.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium ',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            'rounded-md transition-colors',
            'cursor-pointer',
          )}
        >
          Editar Informações
        </button>
      </div>
    </Modal>
  );
}
