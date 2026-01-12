'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import SidebarItems from './sideBarItens';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <div className='p-6 border-b border-border'>
          <h2 className='text-lg font-semibold text-foreground'>
            Sistema de registro de governadores
          </h2>
          <p className='text-sm text-muted-foreground mt-1'>
            Gestão Administrativa
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Aplicação</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItems pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
