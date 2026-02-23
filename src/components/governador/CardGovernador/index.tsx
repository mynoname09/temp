'use client';

import { ListaGovernadoresFromApi } from '@/features/personalidade/governador/governador.schema';
import { BookOpenIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ModalGovernador from '../ModalGovernador';

type CardGovernadorProps = {
  governador: ListaGovernadoresFromApi;
  onItemDeletedAction: (id: string) => void;
};

export default function CardGovernador({
  governador,
  onItemDeletedAction: onItemDeleted,
}: CardGovernadorProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imagePerfilError, setImagePerfilError] = useState(false);

  return (
    <div
      key={governador.id}
      className='group cursor-pointer bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105'
      onClick={() => setModalIsOpen(true)}
    >
      <div className='aspect-square overflow-hidden'>
        <div className='w-full h-full bg-muted flex items-center justify-center'>
          {governador.url_imagem_perfil && !imagePerfilError ? (
            <Image
              width={300}
              height={300}
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${governador.url_imagem_perfil}`}
              alt={governador.nome}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
              unoptimized
              onError={() => setImagePerfilError(true)}
            />
          ) : (
            <BookOpenIcon className='w-12 h-12 text-muted-foreground' />
          )}
        </div>
      </div>
      <div className='p-4'>
        <>
          <h3 className='font-bold text-card-foreground mb-1 text-lg'>
            {`${governador.nome} ${governador.sobrenome}`}
          </h3>
          {governador.apelido && (
            <span className='text-base font-normal text-muted-foreground'>
              {`(${governador.apelido})`}
            </span>
          )}
        </>
        {governador.mandatos && governador.mandatos.length > 0 && (
          <span className='text-sm text-muted-foreground'>
            {governador.mandatos[0].periodo}
          </span>
        )}
        <span
          className='text-lg font-semibold text-highlight line-clamp-2'
          title={governador.tags_de_governador?.join(', ')}
        >
          {governador.tags_de_governador?.join(', ') || 'Governador'}
        </span>
        {governador.naturalidade && (
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <MapPinIcon className='w-3 h-3' />
            <span>{governador.naturalidade?.split(',')[0]}</span>
          </div>
        )}
      </div>

      {modalIsOpen && (
        <ModalGovernador
          governador={governador}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onDeleteSuccess={() => onItemDeleted(governador.id)}
        />
      )}
    </div>
  );
}
