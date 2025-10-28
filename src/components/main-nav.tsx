'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, BookOpen, Calendar, Users, Trophy, Bot, BookCopy, BrainCircuit, NotebookText } from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import { useTranslations } from 'next-intl';

const navItemKeys = [
  'home', 'rules', 'openings', 'tournaments', 'players', 'championships', 'play', 'learn', 'myGames'
];

const navItemIcons: { [key: string]: JSX.Element } = {
  home: <Home />,
  rules: <BookOpen />,
  openings: <BookCopy />,
  tournaments: <Calendar />,
  players: <Users />,
  championships: <Trophy />,
  play: <Bot />,
  learn: <BrainCircuit />,
  myGames: <NotebookText />,
};

const navItemHrefs: { [key: string]: string } = {
  home: '/',
  rules: '/rules',
  openings: '/openings',
  tournaments: '/tournaments',
  players: '/players',
  championships: '/championships',
  play: '/play',
  learn: '/learn',
  myGames: '/my-games'
};

export function MainNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const t = useTranslations('MainNav');

  const navItems = navItemKeys.map(key => ({
    href: navItemHrefs[key],
    label: t(key),
    icon: navItemIcons[key],
    key: key
  }));

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.key}>
          <Link href={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.endsWith(item.href)}
              tooltip={item.label}
              onClick={() => setOpenMobile(false)}
            >
              <div>
                {item.icon}
                <span>{item.label}</span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
