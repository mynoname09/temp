import { cn } from '@/lib/utils';
import { BaseTagFromApi } from '@/features/tags/@types/tag.types';

type ListaFiltrosProps = {
  isVisible: boolean;
  options: BaseTagFromApi[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
};

export default function ListaFiltros({
  isVisible = true,
  options,
  selectedIds,
  onToggle,
  onClear,
}: ListaFiltrosProps) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out bg-card/50 border-border rounded-xl mt-2',
        isVisible
          ? 'max-h-125 opacity-100 border p-4 shadow-inner'
          : 'max-h-0 opacity-0 border-0 p-0',
      )}
    >
      <div className='flex justify-between items-center mb-3'>
        <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
          Categorias
        </span>
        {selectedIds.length > 0 && (
          <button
            onClick={onClear}
            className='text-xs text-highlight hover:underline cursor-pointer'
          >
            Limpar seleção
          </button>
        )}
      </div>

      <div
        className='flex flex-wrap gap-2 overflow-y-auto pr-1'
        style={{ maxHeight: 'calc(2 * 3rem)' }}
      >
        {options.map(tag => {
          const isSelected = selectedIds.includes(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => onToggle(tag.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all border cursor-pointer',
                isSelected
                  ? 'bg-highlight text-white border-highlight shadow-md'
                  : 'bg-card text-muted-foreground border-border hover:border-highlight/50 hover:bg-highlight/10',
              )}
            >
              {tag.nome}
            </button>
          );
        })}
      </div>
    </div>
  );
}
