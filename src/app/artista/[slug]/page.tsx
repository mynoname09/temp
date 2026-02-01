type UpdateArtistaPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function UpdateArtistaPage({
  params,
}: UpdateArtistaPageProps) {
  const { slug } = await params;

  return <div>Artista: {slug}</div>;
}
