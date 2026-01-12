'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './ThemeProvider';

type ProvidersProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Providers({ children, defaultOpen }: ProvidersProps) {
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          {children}
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
}
