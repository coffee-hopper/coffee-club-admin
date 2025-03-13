import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";
import { AppBody } from "./app-body";

export function AdminPanel() {
  return (
    <div className="flex lg:w-5xl md:w-3xl xl:w-screen mx-auto overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <AppBody />
      </SidebarProvider>
    </div>
  );
}
