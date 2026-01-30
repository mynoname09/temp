'use client'; // 1. Necessário para usar hooks

import {
  ChevronDownIcon,
  CircleQuestionMarkIcon,
  HomeIcon,
  UsersRoundIcon,
} from 'lucide-react';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar, // 2. Importe o hook useSidebar
} from '@ui/sidebar'; // Verifique se o caminho está correto, às vezes é '@/components/ui/sidebar'
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  colapiside?: {
    items: SidebarItem[];
  };
}

// ... (definição da constante items permanece igual) ...
const items: SidebarItem[] = [
  { title: 'Home', url: '/', icon: <HomeIcon /> },
  { title: 'Governadores', url: '/governador', icon: <UsersRoundIcon /> },
  {
    title: 'Personalidades',
    url: '/personalidade',
    icon: <UsersRoundIcon />,
    colapiside: {
      items: [
        {
          title: 'Personalidades cadastradas',
          url: '/personalidade',
          icon: <UsersRoundIcon />,
        },
        {
          title: 'Adicionar personalidade',
          url: '/personalidade/new',
          icon: <UsersRoundIcon />,
        },
      ],
    },
  },
  { title: 'Sobre', url: '/sobre', icon: <CircleQuestionMarkIcon /> },
];

type SidebarItemsProps = {
  pathname: string;
};

function isActivePath(pathname: string, url: string) {
  if (url === '/') return pathname === '/';
  return pathname === url;
}

export default function SidebarItems({ pathname }: SidebarItemsProps) {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      {items.map(item => {
        const hasSubItems = item.colapiside && item.colapiside.items.length > 0;
        const isParentActive = isActivePath(pathname, item.url);

        if (hasSubItems) {
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive}
              className='group/collapsible'
            >
              <SidebarMenuItem className='cursor-pointer'>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    variant="neutral"
                    className='cursor-pointer'
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronDownIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.colapiside!.items.map(subItem => (
                      <SidebarMenuSubItem key={subItem.url}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActivePath(pathname, subItem.url)}
                        >
                          <Link href={subItem.url} onClick={handleLinkClick}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={isParentActive}
            >
              <Link href={item.url} onClick={handleLinkClick}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
