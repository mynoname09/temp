import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AppSidebar } from '@/components/AppSidebar';
import Header from '@/components/Header';
import { Providers } from './providers';
import { cookies } from 'next/headers';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Histórico FCJA',
    template: '%s | FCJA',
  },
  description:
    'Sistema de gestão de conteúdos que irão para o frontend público.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <html lang='pt-BR'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers defaultOpen={defaultOpen}>
          <div className='min-h-screen flex w-full bg-linear-to-br from-background to-secondary'>
            <AppSidebar />

            <div className='flex-1 flex flex-col'>
              <Header />

              <main className='flex-1 p-6'>{children}</main>
              <Toaster position='bottom-right' richColors />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
