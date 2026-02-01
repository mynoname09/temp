'use client';

import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BaseTagFromApi, CreateTagDto } from '@/features/tags/tag.types';
import ListaTags from '../ListaTags';
import FormTag, { FormTagData } from '../FormTag';

export type TagActions<T extends BaseTagFromApi> = {
  create: (data: CreateTagDto) => Promise<T>;
  update: (id: string, data: Partial<CreateTagDto>) => Promise<T>;
  remove: (id: string) => Promise<void>;
};

export type GerenciadorTagsProps<T extends BaseTagFromApi> = {
  /** Lista inicial de tags */
  initialTags: T[];
  /** Server actions para operações CRUD */
  actions: TagActions<T>;
  /** Nome da entidade para mensagens (ex: "personalidade", "governador") */
  entityName: string;
  /** Título exibido no componente */
  title?: string;
  /** Placeholder da barra de pesquisa */
  searchPlaceholder?: string;
};

export default function GerenciadorTags<T extends BaseTagFromApi>({
  initialTags,
  actions,
  entityName,
  title,
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
    return tags.filter((tag) =>
      tag.nome.toLowerCase().includes(termLower)
    );
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
      setTags((prev) => [...prev, newTag]);
      toast.success(`Tag "${newTag.nome}" criada com sucesso!`);
      handleCloseModal();
    } catch (error) {
      console.error(`Erro ao criar tag de ${entityName}:`, error);
      toast.error('Erro ao criar tag. Tente novamente.');
    }
  };

  // Atualizar tag existente
  const handleUpdate = async (data: FormTagData) => {
    if (!editingTag) return;

    try {
      const updatedTag = await actions.update(editingTag.id, data);
      setTags((prev) =>
        prev.map((tag) => (tag.id === editingTag.id ? updatedTag : tag))
      );
      toast.success(`Tag "${updatedTag.nome}" atualizada com sucesso!`);
      handleCloseModal();
    } catch (error) {
      console.error(`Erro ao atualizar tag de ${entityName}:`, error);
      toast.error('Erro ao atualizar tag. Tente novamente.');
    }
  };

  // Excluir tag
  const handleDelete = async (tag: T) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a tag "${tag.nome}"?`
    );
    if (!confirmed) return;

    try {
      await actions.remove(tag.id);
      setTags((prev) => prev.filter((t) => t.id !== tag.id));
      toast.success(`Tag "${tag.nome}" excluída com sucesso!`);
    } catch (error) {
      console.error(`Erro ao excluir tag de ${entityName}:`, error);
      toast.error('Erro ao excluir tag. Tente novamente.');
    }
  };

  const isEditing = !!editingTag;
  const modalTitle = isEditing ? `Editar tag: ${editingTag.nome}` : 'Nova tag';
  const modalDescription = isEditing
    ? 'Altere o nome da tag abaixo.'
    : `Adicione uma nova tag de ${entityName}.`;

  return (
    <>
      <div className="space-y-6">
        {/* Header com título */}
        {title && (
          <h2 className="text-xl font-semibold">{title}</h2>
        )}

        {/* Barra de pesquisa */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Lista de tags */}
        <div className="border rounded-lg p-4">
          <ListaTags
            tags={filteredTags}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
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
        size="icon-lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        aria-label={`Adicionar nova tag de ${entityName}`}
      >
        <Plus className="size-6" />
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
            onSubmit={isEditing ? handleUpdate : handleCreate}
            onCancel={handleCloseModal}
            isEditing={isEditing}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}