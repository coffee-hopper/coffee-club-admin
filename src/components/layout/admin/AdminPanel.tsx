import { SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar } from "./sidebar/app-sidebar";
import { AppBody } from "./app-body";
import { appRoutes } from "@/config/routes";
import AllTest from "@/components/tests/AllTest";

export function AdminPanel() {
  return (
    <BrowserRouter>
      <div className="flex xl:w-screen lg:w-5xl md:w-3xl w-screen mx-auto overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <Routes>
            <Route path="/" element={<AppBody />} />
            {appRoutes.map(({ url }) => (
              <Route key={url} path={url} element={<AppBody />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/tests" element={<AllTest />} />
          </Routes>
        </SidebarProvider>
      </div>
    </BrowserRouter>
  );
}
