type GovernadorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GovernadorPage({ params }: GovernadorPageProps) {
  const { slug } = await params;

  return <div>Governador: {slug}</div>;
}
