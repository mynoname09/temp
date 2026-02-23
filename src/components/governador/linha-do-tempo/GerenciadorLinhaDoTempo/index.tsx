'use client';

import { useState } from 'react';
import {
  LinhaDoTempoFromApi,
  EventoFromApi,
  CreateEventoForm,
} from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { ListaEventos } from '../ListaEventos';
import { FormEvento } from '../FormEvento';
import { GerenciadorFotosEvento } from '../GerenciadorFotosEvento';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/Dialog';
import { Plus, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import {
  createLinhaDoTempoAction,
  createEventoAction,
  updateEventoAction,
  deleteEventoAction,
  createFotoEventoAction,
  updateFotoEventoAction,
  deleteFotoEventoAction,
} from '@/app/actions/governador/linha-do-tempo';
import {
  Dialog as UIDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GerenciadorLinhaDoTempoProps {
  governadorId: string;
  initialLinhaDoTempo: LinhaDoTempoFromApi | null;
}

export function GerenciadorLinhaDoTempo({
  governadorId,
  initialLinhaDoTempo,
}: GerenciadorLinhaDoTempoProps) {
  const [linhaDoTempo, setLinhaDoTempo] = useState<LinhaDoTempoFromApi | null>(
    initialLinhaDoTempo,
  );
  const [isCreatingLinhaDoTempo, setIsCreatingLinhaDoTempo] = useState(false);
  const [isEventoModalOpen, setIsEventoModalOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState<EventoFromApi | null>(null);
  const [deleteEventoConfirm, setDeleteEventoConfirm] = useState<EventoFromApi | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [managingFotosEvento, setManagingFotosEvento] = useState<EventoFromApi | null>(null);

  // Criar linha do tempo
  const handleCreateLinhaDoTempo = async () => {
    setIsCreatingLinhaDoTempo(true);
    try {
      const result = await createLinhaDoTempoAction(governadorId);

      if (result.success && result.data) {
        setLinhaDoTempo(result.data);
        toast.success('Linha do tempo criada com sucesso!');
      } else {
        toast.error(result.errors?.[0] ?? 'Erro ao criar linha do tempo');
      }
    } catch (error) {
      toast.error('Erro ao criar linha do tempo');
      console.error(error);
    } finally {
      setIsCreatingLinhaDoTempo(false);
    }
  };

  // Abrir modal para criar evento
  const handleOpenCreateEvento = () => {
    setEditingEvento(null);
    setIsEventoModalOpen(true);
  };

  // Abrir modal para editar evento
  const handleOpenEditEvento = (evento: EventoFromApi) => {
    setEditingEvento(evento);
    setIsEventoModalOpen(true);
  };

  const handleCloseEventoModal = () => {
    setIsEventoModalOpen(false);
    setEditingEvento(null);
  };

  // Submeter evento (criar ou editar)
  const handleSubmitEvento = async (data: CreateEventoForm) => {
    try {
      if (editingEvento) {
        const result = await updateEventoAction(editingEvento.id, {
          titulo: data.titulo,
          descricao: data.descricao,
          data: data.data,
          publico: data.publico,
        });

        if (result.success && result.data) {
          setLinhaDoTempo((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              eventos: prev.eventos?.map((e) =>
                e.id === editingEvento.id ? result.data! : e,
              ),
            };
          });
          toast.success('Evento atualizado com sucesso!');
        } else {
          toast.error(result.errors?.[0] ?? 'Erro ao atualizar evento');
        }
      } else {
        const result = await createEventoAction(data);

        if (result.success && result.data) {
          setLinhaDoTempo((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              eventos: [...(prev.eventos ?? []), result.data!],
            };
          });
          toast.success('Evento criado com sucesso!');
        } else {
          toast.error(result.errors?.[0] ?? 'Erro ao criar evento');
        }
      }

      handleCloseEventoModal();
    } catch (error) {
      toast.error('Erro ao salvar evento');
      console.error(error);
    }
  };

  // Confirmar exclusão de evento
  const handleConfirmDeleteEvento = async () => {
    if (!deleteEventoConfirm) return;

    setIsDeleting(true);
    try {
      const result = await deleteEventoAction(deleteEventoConfirm.id);

      if (result.success) {
        setLinhaDoTempo((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            eventos: prev.eventos?.filter((e) => e.id !== deleteEventoConfirm.id),
          };
        });
        toast.success('Evento excluído com sucesso!');
      } else {
        toast.error(result.errors?.[0] ?? 'Erro ao excluir evento');
      }
    } catch (error) {
      toast.error('Erro ao excluir evento');
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeleteEventoConfirm(null);
    }
  };

  // Funções para gerenciar fotos
  const handleAddFoto = async (file: File, descricao?: string) => {
    if (!managingFotosEvento) return;

    const formData = new FormData();
    formData.append('imagem', file);
    formData.append('evento_id', managingFotosEvento.id);
    if (descricao) {
      formData.append('descricao', descricao);
    }

    const result = await createFotoEventoAction(formData);

    if (result.success && result.data) {
      setLinhaDoTempo((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          eventos: prev.eventos?.map((e) =>
            e.id === managingFotosEvento.id
              ? { ...e, fotos: [...(e.fotos ?? []), result.data!] }
              : e,
          ),
        };
      });
      setManagingFotosEvento((prev) =>
        prev ? { ...prev, fotos: [...(prev.fotos ?? []), result.data!] } : prev,
      );
      toast.success('Foto adicionada com sucesso!');
    } else {
      toast.error(result.errors?.[0] ?? 'Erro ao adicionar foto');
    }
  };

  const handleUpdateFoto = async (fotoId: string, descricao: string) => {
    const formData = new FormData();
    formData.append('descricao', descricao);

    const result = await updateFotoEventoAction(fotoId, formData);

    if (result.success && result.data) {
      setLinhaDoTempo((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          eventos: prev.eventos?.map((e) => ({
            ...e,
            fotos: e.fotos?.map((f) => (f.id === fotoId ? result.data! : f)),
          })),
        };
      });
      setManagingFotosEvento((prev) =>
        prev
          ? {
              ...prev,
              fotos: prev.fotos?.map((f) => (f.id === fotoId ? result.data! : f)),
            }
          : prev,
      );
      toast.success('Foto atualizada com sucesso!');
    } else {
      toast.error(result.errors?.[0] ?? 'Erro ao atualizar foto');
    }
  };

  const handleDeleteFoto = async (fotoId: string) => {
    const result = await deleteFotoEventoAction(fotoId);

    if (result.success) {
      setLinhaDoTempo((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          eventos: prev.eventos?.map((e) => ({
            ...e,
            fotos: e.fotos?.filter((f) => f.id !== fotoId),
          })),
        };
      });
      setManagingFotosEvento((prev) =>
        prev ? { ...prev, fotos: prev.fotos?.filter((f) => f.id !== fotoId) } : prev,
      );
      toast.success('Foto excluída com sucesso!');
    } else {
      toast.error(result.errors?.[0] ?? 'Erro ao excluir foto');
    }
  };

  // Se não tem linha do tempo, mostrar botão para criar
  if (!linhaDoTempo) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>Linha do Tempo</h3>
        </div>
        <div className='border rounded-lg p-8 text-center'>
          <CalendarDays className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
          <p className='text-muted-foreground mb-4'>
            Este governador ainda não possui uma linha do tempo.
          </p>
          <Button
            onClick={handleCreateLinhaDoTempo}
            disabled={isCreatingLinhaDoTempo}
            className='cursor-pointer'
          >
            <Plus className='h-4 w-4 mr-2' />
            {isCreatingLinhaDoTempo ? 'Criando...' : 'Criar Linha do Tempo'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Linha do Tempo</h3>
        <Button onClick={handleOpenCreateEvento} size='sm' className='cursor-pointer'>
          <Plus className='h-4 w-4 mr-1' />
          Novo Evento
        </Button>
      </div>

      <ListaEventos
        eventos={linhaDoTempo.eventos ?? []}
        onEdit={handleOpenEditEvento}
        onDelete={setDeleteEventoConfirm}
        onManageFotos={setManagingFotosEvento}
      />

      {/* Modal de criação/edição de evento */}
      <UIDialog open={isEventoModalOpen} onOpenChange={setIsEventoModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>
              {editingEvento ? 'Editar Evento' : 'Novo Evento'}
            </DialogTitle>
          </DialogHeader>
          <FormEvento
            linhaDoTempoId={linhaDoTempo.id}
            evento={editingEvento ?? undefined}
            onSubmit={handleSubmitEvento}
            onCancel={handleCloseEventoModal}
            submitLabel={editingEvento ? 'Atualizar' : 'Criar'}
          />
        </DialogContent>
      </UIDialog>

      {/* Modal de gerenciamento de fotos */}
      <UIDialog
        open={!!managingFotosEvento}
        onOpenChange={(open) => !open && setManagingFotosEvento(null)}
      >
        <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              Fotos: {managingFotosEvento?.titulo}
            </DialogTitle>
          </DialogHeader>
          {managingFotosEvento && (
            <GerenciadorFotosEvento
              fotos={managingFotosEvento.fotos ?? []}
              onAddFoto={handleAddFoto}
              onUpdateFoto={handleUpdateFoto}
              onDeleteFoto={handleDeleteFoto}
              onClose={() => setManagingFotosEvento(null)}
            />
          )}
        </DialogContent>
      </UIDialog>

      {/* Dialog de confirmação de exclusão */}
      <Dialog
        isVisible={!!deleteEventoConfirm}
        title='Confirmar exclusão'
        content={
          <p>
            Tem certeza que deseja excluir o evento{' '}
            <strong>{deleteEventoConfirm?.titulo}</strong>? Esta ação não pode ser
            desfeita e todas as fotos associadas serão removidas.
          </p>
        }
        onConfirmAction={handleConfirmDeleteEvento}
        onCancelAction={() => setDeleteEventoConfirm(null)}
        disabled={isDeleting}
      />
    </div>
  );
}
