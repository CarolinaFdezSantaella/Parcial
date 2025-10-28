import React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarInset, SidebarTrigger, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { Logo } from "@/components/icons/logo";
import { Button } from './ui/button';
import Link from 'next/link';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="md:hidden flex items-center justify-between p-2 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <h1 className="font-headline text-xl font-semibold text-foreground">Chess Hub</h1>
        </Link>
        <SidebarTrigger />
      </div>
      <Sidebar>
        <SidebarHeader className="hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <div className='group-data-[collapsible=icon]:hidden'>
              <h1 className="font-headline text-2xl font-semibold text-sidebar-foreground">Chess Hub</h1>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="min-h-[calc(100vh-3.5rem)] md:min-h-screen">
         {children}
        </div>
        <footer className="p-4 border-t text-center text-sm text-muted-foreground">
          <p>Proyecto con Next.js y Genkit</p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
