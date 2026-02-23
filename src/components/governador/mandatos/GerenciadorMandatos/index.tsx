'use client';

import { useState } from 'react';
import {
  MandatoFromApi,
  CreateMandatoForm,
  PartidoFromApi,
} from '@/features/personalidade/governador/mandato/mandato.schema';
import { ListaMandatos } from '../ListaMandatos';
import { FormMandato } from '../FormMandato';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/Dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  createMandatoAction,
  updateMandatoAction,
  deleteMandatoAction,
} from '@/app/actions/governador/mandato';
import {
  Dialog as UIDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GerenciadorMandatosProps {
  governadorId: string;
  initialMandatos: MandatoFromApi[];
  partidos: PartidoFromApi[];
}

export function GerenciadorMandatos({
  governadorId,
  initialMandatos,
  partidos,
}: GerenciadorMandatosProps) {
  const [mandatos, setMandatos] = useState<MandatoFromApi[]>(initialMandatos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMandato, setEditingMandato] = useState<MandatoFromApi | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<MandatoFromApi | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenCreate = () => {
    setEditingMandato(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (mandato: MandatoFromApi) => {
    setEditingMandato(mandato);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMandato(null);
  };

  const handleSubmit = async (data: CreateMandatoForm) => {
    try {
      if (editingMandato) {
        // Editar
        const result = await updateMandatoAction(editingMandato.id, {
          periodo: data.periodo,
          contexto_historico: data.contexto_historico,
          data_inicio: data.data_inicio,
          data_fim: data.data_fim ?? undefined,
          partidos_id: data.partidos_id,
        });

        if (result.success && result.data) {
          setMandatos((prev) =>
            prev.map((m) => (m.id === editingMandato.id ? result.data! : m)),
          );
          toast.success('Mandato atualizado com sucesso!');
        } else {
          toast.error(result.errors?.[0] ?? 'Erro ao atualizar mandato');
        }
      } else {
        // Criar
        const result = await createMandatoAction({
          ...data,
          data_fim: data.data_fim ?? undefined,
        });

        if (result.success && result.data) {
          setMandatos((prev) => [...prev, result.data!]);
          toast.success('Mandato criado com sucesso!');
        } else {
          toast.error(result.errors?.[0] ?? 'Erro ao criar mandato');
        }
      }

      handleCloseModal();
    } catch (error) {
      toast.error('Erro ao salvar mandato');
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      const result = await deleteMandatoAction(deleteConfirm.id);

      if (result.success) {
        setMandatos((prev) => prev.filter((m) => m.id !== deleteConfirm.id));
        toast.success('Mandato excluído com sucesso!');
      } else {
        toast.error(result.errors?.[0] ?? 'Erro ao excluir mandato');
      }
    } catch (error) {
      toast.error('Erro ao excluir mandato');
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Mandatos</h3>
        <Button onClick={handleOpenCreate} size='sm' className='cursor-pointer'>
          <Plus className='h-4 w-4 mr-1' />
          Novo Mandato
        </Button>
      </div>

      <ListaMandatos
        mandatos={mandatos}
        onEdit={handleOpenEdit}
        onDelete={setDeleteConfirm}
      />

      {/* Modal de criação/edição */}
      <UIDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>
              {editingMandato ? 'Editar Mandato' : 'Novo Mandato'}
            </DialogTitle>
          </DialogHeader>
          <FormMandato
            governadorId={governadorId}
            mandato={editingMandato ?? undefined}
            partidos={partidos}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            submitLabel={editingMandato ? 'Atualizar' : 'Criar'}
          />
        </DialogContent>
      </UIDialog>

      {/* Dialog de confirmação de exclusão */}
      <Dialog
        isVisible={!!deleteConfirm}
        title='Confirmar exclusão'
        content={
          <p>
            Tem certeza que deseja excluir o mandato <strong>{deleteConfirm?.periodo}</strong>? Esta ação não pode ser desfeita.
          </p>
        }
        onConfirmAction={handleConfirmDelete}
        onCancelAction={() => setDeleteConfirm(null)}
        disabled={isDeleting}
      />
    </div>
  );
}
