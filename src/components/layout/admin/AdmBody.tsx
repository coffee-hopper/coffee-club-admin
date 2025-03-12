import { BodyInset, SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@radix-ui/react-separator";

export function AdmBody() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-8 pt-2 lg:px-20 overflow-auto">
      <BodyInset>
        <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator />
          <text className="text-foreground font-normal">Data Fetching</text>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            />
          ))}
        </div>
      </BodyInset>
    </div>
  );
}
