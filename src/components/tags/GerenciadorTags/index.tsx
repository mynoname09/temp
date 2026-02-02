'use client';

import { useState, useMemo, ReactNode } from 'react';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import InputPesquisaSimples from '@/components/BarraDePesquisa/InputPesquisaSimples';
import { BaseTagFromApi, CreateTagDto } from '@/features/tags/tag.types';
import ListaTags from '../ListaTags';
import FormTag, { FormTagData } from '../FormTag';
import { ConfirmDialog } from '@/components/Dialog';

// TODO: FIX ME: Importar do lugar correto

export type TagActions<T extends BaseTagFromApi> = {
  create: (data: CreateTagDto) => Promise<T>;
  update: (id: string, data: Partial<CreateTagDto>) => Promise<T>;
  remove: (id: string) => Promise<void>;
};

export type GerenciadorTagsProps<T extends BaseTagFromApi> = {
  initialTags: T[];
  actions: TagActions<T>;
  entityName: string;
  searchPlaceholder?: string;
};

export type GerenciadorTagsShellProps = {
  entityName: string;
  searchPlaceholder?: string;
  onSearchChangeAction?: (term: string) => void;
  onCreateClickAction?: () => void;
  children: ReactNode;
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
        <Button
          onClick={onCreateClickAction}
          size='icon-lg'
          className='fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 cursor-pointer'
          aria-label={`Adicionar nova tag de ${entityName}`}
        >
          <PlusIcon className='size-6' />
        </Button>
      )}
    </>
  );
}

export default function GerenciadorTags<T extends BaseTagFromApi>({
  initialTags,
  actions,
  entityName,
  searchPlaceholder = 'Buscar tags...',
}: GerenciadorTagsProps<T>) {
  const [tags, setTags] = useState<T[]>(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTag, setEditingTag] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtra tags baseado no termo de pesquisa
  const filteredTags = useMemo(() => {
    if (!searchTerm.trim()) return tags;
    const termLower = searchTerm.toLowerCase();
    return tags.filter(tag => tag.nome.toLowerCase().includes(termLower));
  }, [tags, searchTerm]);

  // Abre o modal para criar nova tag
  const handleOpenCreateModal = () => {
    setEditingTag(null);
    setIsModalOpen(true);
  };

  // Abre o modal para editar tag
  const handleOpenEditModal = (tag: T) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTag(null);
  };

  // Criar nova tag
  const handleCreate = async (data: FormTagData) => {
    try {
      const newTag = await actions.create(data as CreateTagDto);
      setTags(prev => [...prev, newTag]);
      toast.success(`Tag "${newTag.nome}" criada com sucesso!`);
      handleCloseModal();
    } catch (error) {
      console.error(`Erro ao criar tag de ${entityName}:`, error);
      toast.error(`Erro ao criar tag. \n${(error as Error).message}`);
      throw error;
    }
  };

  // Atualizar tag existente
  const handleUpdate = async (data: FormTagData) => {
    if (!editingTag) return;

    try {
      const updatedTag = await actions.update(editingTag.id, data);
      setTags(prev =>
        prev.map(tag => (tag.id === editingTag.id ? updatedTag : tag)),
      );
      toast.success(`Tag "${updatedTag.nome}" atualizada com sucesso!`);
      handleCloseModal();
    } catch (error) {
      console.error(`Erro ao atualizar tag de ${entityName}:`, error);
      toast.error(`Erro ao atualizar tag. \n${(error as Error).message}`);
      throw error;
    }
  };

  // Excluir tag
  const handleDelete = async (tag: T) => {
    // TODO: substituir por um modal de confirmação
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
  };

  const isEditing = !!editingTag;
  const modalTitle = isEditing ? `Editar tag: ${editingTag.nome}` : 'Nova tag';
  const modalDescription = isEditing
    ? 'Altere o nome da tag abaixo.'
    : `Adicione uma nova tag de ${entityName}.`;

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
            onEditAction={handleOpenEditModal}
            onDeleteAction={handleDelete}
            emptyMessage={
              searchTerm
                ? `Nenhuma tag encontrada para "${searchTerm}".`
                : `Nenhuma tag de ${entityName} cadastrada.`
            }
          />
        </div>
      </div>

      {/* Botão flutuante para adicionar */}
      <Button
        onClick={handleOpenCreateModal}
        size='icon-lg'
        className='fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 cursor-pointer'
        aria-label={`Adicionar nova tag de ${entityName}`}
      >
        <PlusIcon className='size-6' />
      </Button>

      {/* Modal de criação/edição */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>{modalDescription}</DialogDescription>
          </DialogHeader>

          <FormTag
            key={editingTag?.id ?? 'new'}
            defaultValues={editingTag ? { nome: editingTag.nome } : undefined}
            onSubmitAction={isEditing ? handleUpdate : handleCreate}
            onCancelAction={handleCloseModal}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
