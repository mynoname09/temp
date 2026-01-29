import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar personalidade',
};

type PersonalidadeSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PersonalidadeSlugPage({
  params,
}: PersonalidadeSlugPageProps) {
  const { slug } = await params;

  return <div>Editar personalidade {slug}</div>;
}
