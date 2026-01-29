import { cn } from '@/lib/utils';
import { BaseTagFromApi } from '@/features/tags/tag.schema';

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
        'overflow-hidden transition-all duration-300 ease-in-out bg-white/50 border-gray-200 rounded-xl mt-2',
        isVisible
          ? 'max-h-125 opacity-100 border p-4 shadow-inner'
          : 'max-h-0 opacity-0 border-0 p-0',
      )}
    >
      <div className='flex justify-between items-center mb-3'>
        <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>
          Categorias
        </span>
        {selectedIds.length > 0 && (
          <button
            onClick={onClear}
            className='text-xs text-red-700 hover:underline cursor-pointer'
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
                  ? 'bg-red-900 text-white border-red-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:bg-red-50',
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
