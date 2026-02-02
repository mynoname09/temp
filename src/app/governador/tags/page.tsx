import { Suspense } from 'react';
import WrapperListaTagsDeGovernador from '@/components/governador/tags-de-governador/WrapperListaTagsDeGovernador';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { TagsLoadingFallback } from '@/components/personalidade/tags-de-personalidade/WrapperListaTagsDePersonalidade/fall-back';

export default function ListaTagsGovernador() {
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
          Tags de Governador
        </h1>
        <p
          className={cn(
            // Base (mobile)
            'text-muted-foreground text-sm',
            // md
            'md:text-base',
          )}
        >
          Crie, busque e gerencie as tags de governador para categorizar os
          perfis.
        </p>
      </div>

      <Separator className={cn('my-4', 'md:my-6')} />

      <Suspense fallback={<TagsLoadingFallback />}>
        <WrapperListaTagsDeGovernador />
      </Suspense>
    </div>
  );
}
