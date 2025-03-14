import { SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppSidebar } from "./app-sidebar";
import { AppBody } from "./app-body";

export function AdminPanel() {
  return (
    <BrowserRouter>
      <div className="flex xl:w-screen lg:w-5xl md:w-3xl w-screen  mx-auto overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <Routes>
            <Route path="/" element={<AppBody />} />
            <Route path="/orders" element={<AppBody />} />
            <Route path="/products" element={<AppBody />} />
            <Route path="/customers" element={<AppBody />} />
          </Routes>
        </SidebarProvider>
      </div>
    </BrowserRouter>
  );
}
