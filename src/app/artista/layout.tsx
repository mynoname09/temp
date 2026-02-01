import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artista',
};

type ArtistaLayoutProps = {
  children: React.ReactNode;
};

export default function ArtistaLayout({ children }: ArtistaLayoutProps) {
  return <>{children}</>;
}
