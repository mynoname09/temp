'use client';

import { useState, useRef } from 'react';
import { FotoEventoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Edit2, X, Check, Upload } from 'lucide-react';

interface GerenciadorFotosEventoProps {
  fotos: FotoEventoFromApi[];
  onAddFoto: (file: File, descricao?: string) => Promise<void>;
  onUpdateFoto: (fotoId: string, descricao: string) => Promise<void>;
  onDeleteFoto: (fotoId: string) => Promise<void>;
  onClose: () => void;
}

export function GerenciadorFotosEvento({
  fotos,
  onAddFoto,
  onUpdateFoto,
  onDeleteFoto,
  onClose,
}: GerenciadorFotosEventoProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newDescricao, setNewDescricao] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingFotoId, setEditingFotoId] = useState<string | null>(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAddSubmit = async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    try {
      await onAddFoto(selectedFile, newDescricao || undefined);
      setIsAdding(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setNewDescricao('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (foto: FotoEventoFromApi) => {
    setEditingFotoId(foto.id);
    setEditDescricao(foto.descricao ?? '');
  };

  const handleSaveEdit = async () => {
    if (!editingFotoId) return;

    setIsSubmitting(true);
    try {
      await onUpdateFoto(editingFotoId, editDescricao);
      setEditingFotoId(null);
      setEditDescricao('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setNewDescricao('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const baseUrl = process.env.NEXT_PUBLIC_GOV_BACK_API_URL || '';

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between border-b pb-4'>
        <h3 className='text-lg font-semibold'>Fotos do Evento</h3>
        <Button variant='ghost' size='icon' onClick={onClose}>
          <X className='h-4 w-4' />
        </Button>
      </div>

      {/* Lista de fotos existentes */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {fotos.map((foto) => (
          <div key={foto.id} className='relative group'>
            <div className='aspect-square rounded-lg overflow-hidden border'>
              <img
                src={`${baseUrl}/${foto.url}`}
                alt={foto.descricao ?? 'Foto do evento'}
                className='w-full h-full object-cover'
              />
            </div>

            {editingFotoId === foto.id ? (
              <div className='mt-2 space-y-2'>
                <Textarea
                  value={editDescricao}
                  onChange={(e) => setEditDescricao(e.target.value)}
                  placeholder='Descrição da foto'
                  className='text-sm'
                />
                <div className='flex gap-1'>
                  <Button
                    size='sm'
                    onClick={handleSaveEdit}
                    disabled={isSubmitting}
                    className='flex-1'
                  >
                    <Check className='h-3 w-3 mr-1' />
                    Salvar
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setEditingFotoId(null)}
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {foto.descricao && (
                  <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>
                    {foto.descricao}
                  </p>
                )}
                <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1'>
                  <Button
                    size='icon'
                    variant='secondary'
                    className='h-7 w-7'
                    onClick={() => handleStartEdit(foto)}
                  >
                    <Edit2 className='h-3 w-3' />
                  </Button>
                  <Button
                    size='icon'
                    variant='destructive'
                    className='h-7 w-7'
                    onClick={() => onDeleteFoto(foto.id)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Formulário para adicionar nova foto */}
      {isAdding ? (
        <div className='border rounded-lg p-4 space-y-4'>
          <div className='space-y-2'>
            <Label>Imagem</Label>
            <Input
              ref={fileInputRef}
              type='file'
              accept='image/jpeg,image/png,image/webp'
              onChange={handleFileSelect}
            />
            {previewUrl && (
              <div className='w-32 h-32 rounded-lg overflow-hidden border'>
                <img
                  src={previewUrl}
                  alt='Preview'
                  className='w-full h-full object-cover'
                />
              </div>
            )}
          </div>

          <div className='space-y-2'>
            <Label>Descrição (opcional)</Label>
            <Textarea
              value={newDescricao}
              onChange={(e) => setNewDescricao(e.target.value)}
              placeholder='Descreva a foto...'
            />
          </div>

          <div className='flex gap-2'>
            <Button
              onClick={handleAddSubmit}
              disabled={!selectedFile || isSubmitting}
              className='cursor-pointer'
            >
              {isSubmitting ? 'Enviando...' : 'Adicionar Foto'}
            </Button>
            <Button
              variant='outline'
              onClick={handleCancelAdd}
              className='cursor-pointer'
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant='outline'
          className='w-full cursor-pointer'
        >
          <Upload className='h-4 w-4 mr-2' />
          Adicionar Foto
        </Button>
      )}

      {fotos.length === 0 && !isAdding && (
        <p className='text-center text-muted-foreground text-sm py-4'>
          Nenhuma foto adicionada a este evento.
        </p>
      )}
    </div>
  );
}
