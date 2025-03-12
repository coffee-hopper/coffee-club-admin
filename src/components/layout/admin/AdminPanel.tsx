import { AdmSidebar } from "./AdmSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { AdmBody } from "./AdmBody";

export function AdminPanel() {
  return (
    <div className="flex lg:w-5xl md:w-3xl xl:w-screen mx-auto overflow-hidden">
      <SidebarProvider>
        <AdmSidebar />
        <AdmBody />
      </SidebarProvider>
    </div>
  );
}
