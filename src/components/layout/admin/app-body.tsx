import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@radix-ui/react-separator";
import { AppTable } from "./app-table";

export function AppBody() {
  return (
    <div className="bg-red-200 flex flex-col flex-1 xl:mx-10 md:mx-5 mx-10 w-screen my-2 rounded-2xl">
      <div className="flex sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator />
        <div className="text-foreground font-normal">Data Fetching</div>
      </div>
      <AppTable />
    </div>
  );
}
