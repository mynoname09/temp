export default function CardPersonalidadeSkeleton() {
  return (
    <div className='animate-pulse rounded-lg border border-border bg-card p-4 space-y-4'>
      {/* Imagem */}
      <div className='h-40 w-full rounded-md bg-muted' />

      {/* Título */}
      <div className='h-4 w-3/4 rounded bg-muted' />

      {/* Subtítulo */}
      <div className='h-3 w-1/2 rounded bg-muted' />

      {/* Texto */}
      <div className='space-y-2'>
        <div className='h-3 w-full rounded bg-muted' />
        <div className='h-3 w-5/6 rounded bg-muted' />
      </div>
    </div>
  );
}
