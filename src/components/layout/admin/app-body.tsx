import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@radix-ui/react-separator";
import { AppTable } from "./app-table";
import { useLocation } from "react-router-dom";

export function AppBody() {
  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  return (
    <div className="flex flex-col bg-accent flex-1 xl:mx-10 md:mx-5 mx-10 w-screen my-2 rounded-2xl">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator />
        <div className="text-foreground font-normal">{pathname}</div>
      </div>
      <AppTable />
    </div>
  );
}
