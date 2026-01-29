import { PersonalidadeDeListaFromApi } from '@/features/personalidade/base/personalidade.schema';
import { Modal, ModalProps } from '../../Modal';
import { ModalBody } from '../../Modal/modal-body';
import {
  AwardIcon,
  BookOpenIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
} from 'lucide-react';
import { ModalHeader } from '../../Modal/modal-header';
import Image from 'next/image';
import {
  formatDateToLocaleString,
  getYearFromDateString,
} from '@/utils/transform-date';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ModalPersonalidadeProps = {
  personalidade: PersonalidadeDeListaFromApi;
} & ModalProps;

export default function ModalPersonalidade({
  personalidade,
  isOpen,
  onClose,
}: ModalPersonalidadeProps) {
  const [mostrarTodasObras, setMostrarTodasObras] = useState(false);

  const LIMIAR_QUEBRA_LINHA = 4;
  const totalObras = personalidade.obras?.length || 0;
  const temMuitasObras = totalObras > LIMIAR_QUEBRA_LINHA;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={
          <div className='flex flex-col leading-tight'>
            <span className='font-bold'>
              {`${personalidade.nome} ${personalidade.sobrenome}`}{' '}
            </span>
            {personalidade.apelido && (
              <span className='text-base font-normal text-muted-foreground'>
                {`Pseudônimo: ${personalidade.apelido}`}
              </span>
            )}
          </div>
        }
        onClose={onClose}
      />
      <ModalBody>
        <div className='flex flex-col md:flex-row gap-6 mb-6'>
          {/* Foto */}
          <div className='w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden shrink-0'>
            {personalidade.url_imagem_perfil ? (
              <Image
                src={personalidade.url_imagem_perfil}
                alt={personalidade.nome}
                width={192}
                height={192}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <BookOpenIcon className='w-12 h-12 text-gray-400' />
              </div>
            )}
          </div>

          {/* Informações Básicas */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start gap-2 mb-3'>
              <AwardIcon className='w-5 h-5 text-red-900 shrink-0 mt-1' />
              <span
                className='text-lg font-semibold text-red-900 line-clamp-2'
                title={personalidade.nome_tags_de_personalidade?.join(', ')}
              >
                {personalidade.nome_tags_de_personalidade?.join(', ')}
              </span>
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-2'>
                <MapPinIcon className='w-4 h-4 text-gray-500' />
                <span className='text-gray-700'>
                  Natural de {personalidade.naturalidade}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='w-4 h-4 text-gray-500' />
                <span
                  className='text-gray-700'
                  title={`${formatDateToLocaleString(personalidade.data_nascimento)}`}
                >
                  {getYearFromDateString(personalidade.data_nascimento)}
                </span>
                <span>-</span>
                <span
                  className='text-gray-700'
                  title={`${formatDateToLocaleString(personalidade.data_falecimento)}`}
                >
                  {personalidade.data_falecimento
                    ? getYearFromDateString(personalidade.data_falecimento)
                    : 'Presente'}
                </span>
              </div>
            </div>

            {/* Obras Principais */}
            {personalidade.obras && personalidade.obras.length > 0 && (
              <div className='mt-4'>
                <h4 className='font-semibold text-gray-900 mb-2'>
                  Obras Principais:
                </h4>

                <div
                  className={cn(
                    'flex flex-wrap gap-2 transition-all duration-300 pr-1',
                    mostrarTodasObras
                      ? 'max-h-16.5 overflow-y-auto'
                      : 'max-h-7 overflow-hidden',
                  )}
                >
                  {personalidade.obras.map((obra, index: number) => (
                    <span
                      key={index}
                      className='px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200 h-fit whitespace-nowrap'
                      title={obra.titulo}
                    >
                      {obra.titulo}
                    </span>
                  ))}
                </div>

                {/* Botão de Controle */}
                {temMuitasObras && (
                  <button
                    onClick={() => setMostrarTodasObras(!mostrarTodasObras)}
                    className={cn(
                      'mt-2 text-xs font-medium ',
                      'text-red-900 hover:text-red-700 ',
                      'flex items-center gap-1 transition-colors',
                      'cursor-pointer',
                    )}
                  >
                    {mostrarTodasObras ? (
                      <>
                        Recolher <ChevronUpIcon className='w-3 h-3' />
                      </>
                    ) : (
                      <>
                        Ver lista completa (+{totalObras}){' '}
                        <ChevronDownIcon className='w-3 h-3' />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Biografia */}
        <div className='mb-6'>
          <h4 className='font-semibold text-gray-900 mb-3'>Biografia</h4>
          <p className='text-gray-700 leading-relaxed text-justify whitespace-pre-line'>
            {personalidade.resumo_biografico}
          </p>
        </div>

        {/* Contribuição */}
        <div>
          <h4 className='font-semibold text-gray-900 mb-3'>
            Contribuição Cultural
          </h4>
          <p className='text-gray-700 leading-relaxed text-justify whitespace-pre-line'>
            {personalidade.contribuicao_cultural}
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
}
