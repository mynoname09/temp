import { CircleQuestionMarkIcon, HomeIcon, UsersRoundIcon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

const items: SidebarItem[] = [
  { title: 'Home', url: '/', icon: <HomeIcon /> },
  { title: 'Governadores', url: '/governador', icon: <UsersRoundIcon /> },
  { title: 'Sobre', url: '/sobre', icon: <CircleQuestionMarkIcon /> },
];

type SidebarItemsProps = {
  pathname: string;
};

function isActivePath(pathname: string, url: string) {
  if (url === '/') return pathname === '/';
  return pathname === url || pathname.startsWith(`${url}/`);
}

export default function SidebarItems({ pathname }: SidebarItemsProps) {
  return (
    <>
      {items.map(item => (
        <SidebarMenuItem key={`sidebar-item-${item.title}`}>
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className={cn(
                isActivePath(pathname, item.url)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
