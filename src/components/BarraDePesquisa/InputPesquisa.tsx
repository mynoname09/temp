import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UseFormRegisterReturn, Control, useWatch } from 'react-hook-form';
import { FiltroFormSchema } from '@/lib/pesquisa/pesquisa.schemas';

type InputPesquisaProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register: UseFormRegisterReturn;
  control: Control<FiltroFormSchema>;
  onClear: () => void;
  isSubmitting: boolean;
  containerClassName?: string;
};

export default function InputPesquisa({
  register,
  control,
  onClear,
  className,
  containerClassName,
  placeholder = 'Pesquisar...',
  isSubmitting,
  ...props
}: InputPesquisaProps) {
  const termoAtual = useWatch({
    control,
    name: 'termo',
  });

  return (
    <div
      className={cn(
        'relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-red-300 hover:shadow-md transition-all z-20',
        containerClassName,
      )}
    >
      <div className='flex items-center h-14 px-4'>
        <input
          type='text'
          placeholder={placeholder}
          className={cn(
            'flex-1 h-full outline-none text-base bg-transparent text-foreground placeholder:text-muted-foreground',
            className,
          )}
          {...register}
          {...props}
        />

        {termoAtual && termoAtual.length > 0 && (
          <>
            <button
              type='button'
              onClick={onClear}
              className='p-1 hover:bg-gray-100 rounded-full text-gray-400 transition-colors cursor-pointer'
              aria-label='Limpar pesquisa'
            >
              <XIcon className='w-4 h-4' />
            </button>
            <div className='h-5 w-px bg-gray-200 mx-2' />
          </>
        )}

        <button
          type='submit'
          className='cursor-pointer'
          aria-label='Pesquisar'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className='w-5 h-5 border-2 border-gray-200 border-t-red-900 rounded-full animate-spin mr-3 shrink-0' />
          ) : (
            <SearchIcon className='w-5 h-5 text-muted-foreground mr-3 shrink-0' />
          )}
        </button>
      </div>
    </div>
  );
}
