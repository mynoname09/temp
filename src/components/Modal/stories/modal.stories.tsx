import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { BookOpen, Award, MapPin, Calendar } from 'lucide-react';

import { Modal } from '../index';
import { ModalHeader } from '../modal-header';
import { ModalBody } from '../modal-body';
import Image from 'next/image';

import { mockPerson } from './mockPerson';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

export const PerfilPessoa = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='justify-center items-center flex h-screen'>
      <button
        onClick={() => setIsOpen(true)}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer'
      >
        Ver Perfil
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader title={mockPerson.nome} onClose={() => setIsOpen(false)} />
        <ModalBody>
          <div className='flex flex-col md:flex-row gap-6 mb-6'>
            {/* Foto */}
            <div className='w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0'>
              {mockPerson.imagem ? (
                <Image
                  src={mockPerson.imagem}
                  alt={mockPerson.nome}
                  width={192}
                  height={192}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <BookOpen className='w-12 h-12 text-gray-400' />
                </div>
              )}
            </div>

            {/* Informações Básicas */}
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-3'>
                <Award className='w-5 h-5 text-red-900' />
                <span className='text-lg font-semibold text-red-900'>
                  {mockPerson.categoria}
                </span>
              </div>

              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-gray-500' />
                  <span className='text-gray-700'>
                    Natural de {mockPerson.cidade}, Paraíba
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span className='text-gray-700'>
                    {mockPerson.nascimento}
                    {mockPerson.falecimento && ` - ${mockPerson.falecimento}`}
                  </span>
                </div>
              </div>

              {/* Obras Principais */}
              {mockPerson.obras && mockPerson.obras.length > 0 && (
                <div className='mt-4'>
                  <h4 className='font-semibold text-gray-900 mb-2'>
                    Obras Principais:
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {mockPerson.obras.map((obra: string, index: number) => (
                      <span
                        key={index}
                        className='px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs'
                      >
                        {obra}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Biografia */}
          <div className='mb-6'>
            <h4 className='font-semibold text-gray-900 mb-3'>Biografia</h4>
            <p className='text-gray-700 leading-relaxed text-justify'>
              {mockPerson.biografia}
            </p>
          </div>

          {/* Contribuição */}
          <div>
            <h4 className='font-semibold text-gray-900 mb-3'>
              Contribuição Cultural
            </h4>
            <p className='text-gray-700 leading-relaxed text-justify'>
              {mockPerson.contribuicao}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
