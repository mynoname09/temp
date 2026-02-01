import {
  CircleQuestionMarkIcon,
  HomeIcon,
  PaletteIcon,
  UsersRoundIcon,
} from 'lucide-react';

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  collapside?: {
    items: Omit<SidebarItem, 'icon' | 'collapside'>[];
  };
}

export const items: SidebarItem[] = [
  { title: 'Home', url: '/', icon: <HomeIcon /> },
  {
    title: 'Governadores',
    url: '/governador',
    icon: <UsersRoundIcon />,
    collapside: {
      items: [
        {
          title: 'Governadores cadastrados',
          url: '/governador',
        },
        {
          title: 'Adicionar governador',
          url: '/governador/new',
        },
        {
          title: 'Tags de governador',
          url: '/governador/tags',
        },
      ],
    },
  },
  {
    title: 'Artistas',
    url: '/artista',
    icon: <PaletteIcon />,
    collapside: {
      items: [
        {
          title: 'Artistas cadastrados',
          url: '/artista',
        },
        {
          title: 'Adicionar artista',
          url: '/artista/new',
        },
      ],
    },
  },
  {
    title: 'Personalidades',
    url: '/personalidade',
    icon: <UsersRoundIcon />,
    collapside: {
      items: [
        {
          title: 'Personalidades cadastradas',
          url: '/personalidade',
        },
        {
          title: 'Adicionar personalidade',
          url: '/personalidade/new',
        },
        {
          title: 'Tags de personalidade',
          url: '/personalidade/tags',
        },
      ],
    },
  },
  { title: 'Sobre', url: '/sobre', icon: <CircleQuestionMarkIcon /> },
];
