'use client';

import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
}

export default function ErrorMessage({
  pageTitle = '',
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={cn(
          'min-h-80 bg-slate-900 text-slate-100',
          'mb-16 p-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h2 className='text-7xl/tight mb-4 font-extrabold'>{contentTitle}</h2>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}
