'use client';

import { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type InputPesquisaSimpleProps = {
  value?: string;
  onChangeAction?: (value: string) => void;
  onClearAction?: () => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
};

export default function InputPesquisaSimples({
  value: controlledValue,
  onChangeAction,
  onClearAction: onClear,
  placeholder = 'Pesquisar...',
  className,
  containerClassName,
}: InputPesquisaSimpleProps) {
  const [internalValue, setInternalValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChangeAction?.(newValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChangeAction?.('');
    onClear?.();
  };

  const hasValue = currentValue && currentValue.length > 0;

  return (
    <div
      className={cn(
        'relative bg-card border border-border rounded-2xl shadow-sm hover:border-highlight hover:shadow-md transition-all focus-within:border-highlight focus-within:shadow-md',
        containerClassName,
      )}
    >
      <div className='flex items-center h-14 px-4'>
        <input
          type='text'
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'flex-1 h-full outline-none text-base bg-transparent text-foreground placeholder:text-muted-foreground',
            className,
          )}
        />

        {hasValue && (
          <>
            <button
              type='button'
              onClick={handleClear}
              className='p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
              aria-label='Limpar pesquisa'
            >
              <XIcon className='w-4 h-4' />
            </button>
            <div className='w-px h-6 bg-border mx-2' />
          </>
        )}

        <button
          type='submit'
          className='p-2 rounded-full text-muted-foreground hover:text-highlight hover:bg-highlight/10 transition-colors'
          aria-label='Pesquisar'
        >
          <SearchIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
}
