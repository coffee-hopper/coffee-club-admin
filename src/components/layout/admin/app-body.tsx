import { useLocation } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppTable } from "./app-table";
import { dataMap } from "@/config/routes";

export function AppBody() {
  const location = useLocation();
  const { pathname } = location;

  const selectedData = dataMap[pathname] || "";

  return (
    <div className="flex flex-col bg-accent flex-1 xl:mx-10 md:mx-5 mx-10 w-screen my-2 rounded-2xl">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator />
        <div className="text-foreground font-normal">{pathname}</div>
      </div>
      {selectedData ? (
        <AppTable data={selectedData} />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-lg">
            Welcome! Please select a category from the sidebar to view data.
          </p>
        </div>
      )}
    </div>
  );
}
