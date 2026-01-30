'use client';

import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
}

export default function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={cn(
          'min-h-screen flex flex-col items-center justify-center',
          'bg-background text-foreground text-center px-4',
        )}
      >
        <h1 className='text-4xl font-bold mb-4'>{contentTitle}</h1>

        <div className='text-lg mb-8 flex flex-col items-center gap-4'>
          {content}
        </div>
      </div>
    </>
  );
}
