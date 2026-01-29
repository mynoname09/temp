'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('An unexpected error occurred on the page.', error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='500 - Internal Server Error'
      // nao muito útil
      content={
        <>
          <p>Ocorreu um erro inesperado.</p>
          <Button
            className='cursor-pointer'
            onClick={() => {
              // console.log('tentou');
              reset();
            }}
          >
            Try again
          </Button>
        </>
      }
    />
  );
}
