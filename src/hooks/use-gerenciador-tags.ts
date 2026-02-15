'use client';

import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { BaseTagFromApi } from '@/features/tags/@types/tag.types';
import { ConfirmDialog } from '@/components/Dialog';

export type TagActions<T extends BaseTagFromApi, TCreateDto, TUpdateDto> = {
  create: (data: TCreateDto) => Promise<T>;
  update: (id: string, data: TUpdateDto) => Promise<T>;
  remove: (id: string) => Promise<void>;
};

export type UseGerenciadorTagsConfig<
  T extends BaseTagFromApi,
  TCreateDto,
  TUpdateDto,
> = {
  initialTags: T[];
  actions: TagActions<T, TCreateDto, TUpdateDto>;
  entityName: string;
};

export type UseGerenciadorTagsResult<T extends BaseTagFromApi> = {
  // Estado
  tags: T[];
  filteredTags: T[];
  searchTerm: string;
  editingTag: T | null;
  isModalOpen: boolean;
  isEditing: boolean;

  // Ações de pesquisa
  setSearchTerm: (term: string) => void;

  // Ações de modal
  openCreateModal: () => void;
  openEditModal: (tag: T) => void;
  closeModal: () => void;

  // Ações CRUD
  handleCreate: (data: { nome: string }) => Promise<void>;
  handleUpdate: (data: { nome: string }) => Promise<void>;
  handleDelete: (tag: T) => Promise<void>;
};

export function useGerenciadorTags<
  T extends BaseTagFromApi,
  TCreateDto,
  TUpdateDto,
>({
  initialTags,
  actions,
  entityName,
}: UseGerenciadorTagsConfig<
  T,
  TCreateDto,
  TUpdateDto
>): UseGerenciadorTagsResult<T> {
  // Estado principal
  const [tags, setTags] = useState<T[]>(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTag, setEditingTag] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derivado: se está editando
  const isEditing = editingTag !== null;

  // Filtra tags baseado no termo de pesquisa (memoizado para performance)
  const filteredTags = useMemo(() => {
    if (!searchTerm.trim()) return tags;
    const termLower = searchTerm.toLowerCase();
    return tags.filter(tag => tag.nome.toLowerCase().includes(termLower));
  }, [tags, searchTerm]);

  // Ações de modal (useCallback para estabilidade de referência)
  const openCreateModal = useCallback(() => {
    setEditingTag(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((tag: T) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTag(null);
  }, []);

  // Ação: Criar nova tag
  const handleCreate = useCallback(
    async (data: { nome: string }) => {
      try {
        const newTag = await actions.create(data as TCreateDto);
        setTags(prev => [...prev, newTag]);
        toast.success(`Tag "${newTag.nome}" criada com sucesso!`);
        closeModal();
      } catch (error) {
        console.error(`Erro ao criar tag de ${entityName}:`, error);
        toast.error(`Erro ao criar tag. \n${(error as Error).message}`);
        throw error;
      }
    },
    [actions, entityName, closeModal],
  );

  // Ação: Atualizar tag existente
  const handleUpdate = useCallback(
    async (data: { nome: string }) => {
      if (!editingTag) return;

      try {
        const updatedTag = await actions.update(
          editingTag.id,
          data as TUpdateDto,
        );
        setTags(prev =>
          prev.map(tag => (tag.id === editingTag.id ? updatedTag : tag)),
        );
        toast.success(`Tag "${updatedTag.nome}" atualizada com sucesso!`);
        closeModal();
      } catch (error) {
        console.error(`Erro ao atualizar tag de ${entityName}:`, error);
        toast.error(`Erro ao atualizar tag. \n${(error as Error).message}`);
        throw error;
      }
    },
    [actions, editingTag, entityName, closeModal],
  );

  // Ação: Excluir tag
  const handleDelete = useCallback(
    async (tag: T) => {
      const confirmed = await ConfirmDialog({
        title: `Excluir tag "${tag.nome}"?`,
        content: 'Essa ação não pode ser desfeita.',
      });

      if (!confirmed) return;

      try {
        await actions.remove(tag.id);
        setTags(prev => prev.filter(t => t.id !== tag.id));
        toast.success(`Tag "${tag.nome}" excluída com sucesso!`);
      } catch (error) {
        console.error(`Erro ao excluir tag de ${entityName}:`, error);
        toast.error(`Erro ao excluir tag. \n${(error as Error).message}`);
        throw error;
      }
    },
    [actions, entityName],
  );

  return {
    // Estado
    tags,
    filteredTags,
    searchTerm,
    editingTag,
    isModalOpen,
    isEditing,

    // Ações de pesquisa
    setSearchTerm,

    // Ações de modal
    openCreateModal,
    openEditModal,
    closeModal,

    // Ações CRUD
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
