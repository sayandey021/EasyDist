import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import { BackButton } from '@/components/back-button';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" side="left" collapsible="icon">
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <main className="min-h-svh p-4 lg:p-6">
          <BackButton />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
