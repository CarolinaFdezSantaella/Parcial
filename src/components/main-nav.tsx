'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, BookOpen, Calendar, Users, Trophy, Bot, GraduationCap } from 'lucide-react';
import { useSidebar } from './ui/sidebar';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: <Home />,
  },
  {
    href: '/rules',
    label: 'Rules',
    icon: <BookOpen />,
  },
  {
    href: '/tournaments',
    label: 'Tournaments',
    icon: <Calendar />,
  },
  {
    href: '/players',
    label: 'Players',
    icon: <Users />,
  },
  {
    href: '/championships',
    label: 'Championships',
    icon: <Trophy />,
  },
  {
    href: '/play',
    label: 'Play AI',
    icon: <Bot />,
  },
  {
    href: '/learn',
    label: 'Learn with AI',
    icon: <GraduationCap />,
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
              onClick={() => setOpenMobile(false)}
            >
              <a>
                {item.icon}
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
