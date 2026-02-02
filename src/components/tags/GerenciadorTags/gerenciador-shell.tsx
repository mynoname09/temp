'use client';

import InputPesquisaSimples from '@/components/BarraDePesquisa/InputPesquisaSimples';
import { FloatingAddButton } from './add-tag-floating-button';
import { useState } from 'react';

export type GerenciadorTagsShellProps = {
  entityName: string;
  searchPlaceholder?: string;
  onSearchChangeAction?: (term: string) => void;
  onCreateClickAction?: () => void;
  children: React.ReactNode;
};

export function GerenciadorTagsShell({
  entityName,
  searchPlaceholder = 'Buscar tags...',
  onSearchChangeAction,
  onCreateClickAction,
  children,
}: GerenciadorTagsShellProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChangeAction?.(value);
  };

  return (
    <>
      <div className='space-y-6'>
        {/* Barra de pesquisa - sempre visível */}
        <InputPesquisaSimples
          value={searchTerm}
          onChangeAction={handleSearchChange}
          placeholder={searchPlaceholder}
        />

        {/* Lista de tags ou skeleton */}
        <div className='border rounded-lg p-4'>{children}</div>
      </div>

      {/* Botão flutuante para adicionar - sempre visível */}
      {onCreateClickAction && (
        <FloatingAddButton
          entityName={entityName}
          onClick={onCreateClickAction}
        />
      )}
    </>
  );
}
