import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type FormContainerProps = {
  children: React.ReactNode;
  titulo: string;
  descricao: string;
};

export default function FormContainer({
  children,
  titulo,
  descricao,
}: FormContainerProps) {
  return (
    <div
      className={cn(
        // Base (mobile)
        'min-h-screen w-full px-4 py-6 pb-8',
        // md
        'md:px-8 md:py-8 md:pb-10',
        // lg
        'lg:px-12',
        // xl
        'xl:px-16 xl:max-w-6xl xl:mx-auto',
        // 2xl (4K)
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
          {titulo}
        </h1>
        <p
          className={cn(
            // Base (mobile)
            'text-muted-foreground text-sm',
            // md
            'md:text-base',
          )}
        >
          {descricao}
        </p>
      </div>

      <Separator className={cn('my-4', 'md:my-6')} />
      {children}
    </div>
  );
}
