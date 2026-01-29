export default function CardPersonalidadeSkeleton() {
  return (
    <div className='animate-pulse rounded-lg border p-4 space-y-4'>
      {/* Imagem */}
      <div className='h-40 w-full rounded-md bg-gray-200' />

      {/* Título */}
      <div className='h-4 w-3/4 rounded bg-gray-200' />

      {/* Subtítulo */}
      <div className='h-3 w-1/2 rounded bg-gray-200' />

      {/* Texto */}
      <div className='space-y-2'>
        <div className='h-3 w-full rounded bg-gray-200' />
        <div className='h-3 w-5/6 rounded bg-gray-200' />
      </div>
    </div>
  );
}
