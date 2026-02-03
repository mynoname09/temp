'use client';

import InputPesquisaSimples from '@/components/BarraDePesquisa/InputPesquisaSimples';
import { BaseTagFromApi } from '@/features/tags/tag.types';
import ListaTags from '../ListaTags';
import {
  useGerenciadorTags,
  type TagActions,
} from '@/hooks/use-gerenciador-tags';
import { TagFormModal } from './tag-form-modal';
import { FloatingAddButton } from './add-tag-floating-button';

export type { TagActions };

export type GerenciadorTagsProps<
  T extends BaseTagFromApi,
  TCreateTagDto,
  TUpdateTagDto,
> = {
  initialTags: T[];
  actions: TagActions<T, TCreateTagDto, TUpdateTagDto>;
  entityName: string;
  searchPlaceholder?: string;
};

/**
 * Props para o botão flutuante de adicionar.
 */

/**
 * Botão flutuante para adicionar nova tag.
 * Componente extraído para melhor reutilização (SRP).
 */

export default function GerenciadorTags<
  TFromApi extends BaseTagFromApi,
  TCreateTagDto,
  TUpdateTagDto,
>({
  initialTags,
  actions,
  entityName,
  searchPlaceholder = 'Buscar tags...',
}: GerenciadorTagsProps<TFromApi, TCreateTagDto, TUpdateTagDto>) {
  // Utiliza o hook customizado para toda a lógica de estado e operações
  const {
    filteredTags,
    searchTerm,
    setSearchTerm,
    editingTag,
    isModalOpen,
    isEditing,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useGerenciadorTags({
    initialTags,
    actions,
    entityName,
  });

  // Determina qual handler usar baseado no modo (criar ou editar)
  const handleSubmit = isEditing ? handleUpdate : handleCreate;

  // Mensagem de estado vazio
  const emptyMessage = searchTerm
    ? `Nenhuma tag encontrada para "${searchTerm}".`
    : `Nenhuma tag de ${entityName} cadastrada.`;

  return (
    <>
      <div className='space-y-6'>
        {/* Barra de pesquisa */}
        <InputPesquisaSimples
          value={searchTerm}
          onChangeAction={setSearchTerm}
          placeholder={searchPlaceholder}
        />

        {/* Lista de tags */}
        <div className='border rounded-lg p-4'>
          <ListaTags
            tags={filteredTags}
            onEditAction={openEditModal}
            onDeleteAction={handleDelete}
            emptyMessage={emptyMessage}
          />
        </div>
      </div>

      {/* Botão flutuante para adicionar */}
      <FloatingAddButton entityName={entityName} onClick={openCreateModal} />

      {/* Modal de criação/edição */}
      <TagFormModal
        isOpen={isModalOpen}
        onOpenChange={open => !open && closeModal()}
        editingTag={editingTag}
        entityName={entityName}
        onSubmit={handleSubmit}
        onCancel={closeModal}
      />
    </>
  );
}
