import { Suspense } from 'react';
import WrapperListaTagsDePersonalidade from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade';
import { Separator } from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';
import { TagsLoadingFallback } from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade/fall-back';

// TODO: componentizar o layout padrão das páginas de tags

export default function ListaTagsPersonalidade() {
  return (
    <div
      className={cn(
        'w-full px-4 py-6 pb-8',
        'md:px-8 md:py-8 md:pb-10',
        'lg:px-12',
        'xl:px-16 xl:max-w-6xl xl:mx-auto',
        '2xl:max-w-7xl 2xl:px-20',
      )}
    >
      <div
        className={cn(
          // Base (mobile)
          'mb-4',
          // md
          'md:mb-6',
        )}
      >
        <h1
          className={cn(
            // Base (mobile)
            'text-xl font-bold tracking-tight',
            // md
            'md:text-2xl',
            // 2xl (4K)
            '2xl:text-3xl',
          )}
        >
          Tags de Personalidade
        </h1>
        <p
          className={cn(
            // Base (mobile)
            'text-muted-foreground text-sm',
            // md
            'md:text-base',
          )}
        >
          Crie, busque e gerencie as tags de personalidade para categorizar os
          perfis.
        </p>
      </div>

      <Separator
        orientation='horizontal'
        className='my-4 h-px w-full bg-border'
      />

      <Suspense fallback={<TagsLoadingFallback />}>
        <WrapperListaTagsDePersonalidade />
      </Suspense>
    </div>
  );
}
