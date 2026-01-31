import ErrorMessage from '@/components/ErrorMessage';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NotFound() {
  return (
    <ErrorMessage
      pageTitle='404 - Página Não Encontrada'
      contentTitle='404 - Página Não Encontrada'
      content={
        <>
          <p className='text-muted-foreground'>
            Desculpe, a página que você está procurando não existe.
          </p>

          <Link
            href='/'
            className={cn(
              'px-4 py-2 text-white rounded bg-highlight transition mt-4',
              ' hover:bg-highlight-hover',
            )}
          >
            Voltar para a página inicial
          </Link>
        </>
      }
    />
  );
}
