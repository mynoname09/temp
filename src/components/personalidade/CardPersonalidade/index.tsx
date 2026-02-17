'use client';

import { ListaPersonalidadesFromApi } from '@/features/personalidade/base/personalidade.schema';
import { BookOpenIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ModalPersonalidade from '../ModalPersonalidade';

type CardPersonalidadeProps = {
  personalidade: ListaPersonalidadesFromApi;
  onItemDeleted: (id: string) => void;
};

export default function CardPersonalidade({
  personalidade,
  onItemDeleted,
}: CardPersonalidadeProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div
      key={personalidade.id}
      className='group cursor-pointer bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105'
      onClick={() => setModalIsOpen(true)}
    >
      <div className='aspect-square overflow-hidden'>
        <div className='w-full h-full bg-muted flex items-center justify-center'>
          {personalidade.url_imagem_perfil ? (
            <Image
              width={300}
              height={300}
              src={personalidade.url_imagem_perfil}
              alt={personalidade.nome}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
            />
          ) : (
            <BookOpenIcon className='w-12 h-12 text-muted-foreground' />
          )}
        </div>
      </div>
      <div className='p-4'>
        <>
          <h3 className='font-bold text-card-foreground mb-1 text-lg'>
            {`${personalidade.nome} ${personalidade.sobrenome}`}
          </h3>
          {personalidade.apelido && (
            <span className='text-base font-normal text-muted-foreground'>
              {`(${personalidade.apelido})`}
            </span>
          )}
        </>
        <span
          className='text-lg font-semibold text-highlight line-clamp-2'
          title={personalidade.nome_tags_de_personalidade?.join(', ')}
        >
          {personalidade.nome_tags_de_personalidade?.join(', ')}
        </span>
        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          <MapPinIcon className='w-3 h-3' />
          <span>{personalidade.naturalidade?.split(',')[0]}</span>
        </div>
      </div>

      {modalIsOpen && (
        <ModalPersonalidade
          personalidade={personalidade}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onDeleteSuccess={() => onItemDeleted(personalidade.id)}
        />
      )}
    </div>
  );
}
