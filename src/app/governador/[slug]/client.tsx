'use client';

import { useState } from 'react';
import FormContainer from '@/components/LayoutFormCadastro';
import FormEditarGovernador from '@/components/governador/forms/FormEditarGovernador';
import { GerenciadorMandatos } from '@/components/governador/mandatos';
import { GerenciadorLinhaDoTempo } from '@/components/governador/linha-do-tempo';
import { GovernadorFromApi } from '@/features/personalidade/governador/governador.type';
import { TagDePersonalidadeFromApi } from '@/features/tags/personalidade/tag-personalidade.schema';
import { TagDeGovernadorFromApi } from '@/features/tags/governador/tag-governador.schema';
import { MandatoFromApi, PartidoFromApi } from '@/features/personalidade/governador/mandato/mandato.schema';
import { LinhaDoTempoFromApi } from '@/features/personalidade/governador/linha-do-tempo/linha-do-tempo.schema';
import { cn } from '@/lib/utils';
import { User, BriefcaseIcon, CalendarDays } from 'lucide-react';

type Tab = 'dados' | 'mandatos' | 'linha-do-tempo';

interface GovernadorEditPageClientProps {
  governador: GovernadorFromApi;
  tagsDePersonalidadeDisponiveis: TagDePersonalidadeFromApi[];
  tagsDeGovernadorDisponiveis: TagDeGovernadorFromApi[];
  mandatos: MandatoFromApi[];
  partidos: PartidoFromApi[];
  linhaDoTempo: LinhaDoTempoFromApi | null;
}

export function GovernadorEditPageClient({
  governador,
  tagsDePersonalidadeDisponiveis,
  tagsDeGovernadorDisponiveis,
  mandatos,
  partidos,
  linhaDoTempo,
}: GovernadorEditPageClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dados');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dados',
      label: 'Dados Pessoais',
      icon: <User className='h-4 w-4' />,
    },
    {
      id: 'mandatos',
      label: 'Mandatos',
      icon: <BriefcaseIcon className='h-4 w-4' />,
    },
    {
      id: 'linha-do-tempo',
      label: 'Linha do Tempo',
      icon: <CalendarDays className='h-4 w-4' />,
    },
  ];

  return (
    <FormContainer
      titulo='Editar Governador'
      descricao={`Editando: ${governador.nome} ${governador.sobrenome}`}
    >
      {/* Tabs de navegação */}
      <div className='mb-6 border-b'>
        <nav className='flex gap-1 -mb-px' aria-label='Tabs'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30',
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo das tabs */}
      <div className='min-h-100'>
        {activeTab === 'dados' && (
          <FormEditarGovernador
            tagsDePersonalidadeDisponiveis={tagsDePersonalidadeDisponiveis}
            tagsDeGovernadorDisponiveis={tagsDeGovernadorDisponiveis}
            governador={governador}
          />
        )}

        {activeTab === 'mandatos' && (
          <GerenciadorMandatos
            governadorId={governador.id}
            initialMandatos={mandatos}
            partidos={partidos}
          />
        )}

        {activeTab === 'linha-do-tempo' && (
          <GerenciadorLinhaDoTempo
            governadorId={governador.id}
            initialLinhaDoTempo={linhaDoTempo}
          />
        )}
      </div>
    </FormContainer>
  );
}
