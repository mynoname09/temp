import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Governador',
};

type GovernadorLayoutProps = {
  children: React.ReactNode;
};

export default function GovernadorLayout({ children }: GovernadorLayoutProps) {
  return <>{children}</>;
}
