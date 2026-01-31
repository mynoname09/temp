'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

// pode ter o reset como parametro, para tentar resetar o estado da pagina
export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('An unexpected error occurred on the page.', error);
  }, [error]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-foreground'>
      <h1 className='text-4xl font-bold mb-4'>Ocorreu um erro</h1>
      <p className='text-lg mb-8'>
        Desculpe, algo deu errado ao carregar a página.
      </p>
      <Link
        href='/'
        className='px-4 py-2 rounded transition bg-highlight text-primary-foreground hover:bg-highlight-hover'
      >
        Voltar para a página inicial
      </Link>
      <button
        onClick={reset}
        className='mt-4 px-4 py-2  rounded  transition cursor-pointer bg-highlight text-primary-foreground hover:bg-highlight-hover'
      >
        Tentar novamente
      </button>
    </div>
  );
}
