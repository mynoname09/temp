import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalidade',
};

type PersonalidadeLayoutProps = {
  children: React.ReactNode;
};

export default function PersonalidadeLayout({
  children,
}: PersonalidadeLayoutProps) {
  return <>{children}</>;
}
