import { BodyInset, SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@radix-ui/react-separator";

export function AppBody() {
  return (
    <BodyInset>
      <div className="flex flex-1 flex-col gap-4 pb-8 pt-2 lg:px-20">
        <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator />
          <div className="text-foreground font-normal">Data Fetching</div>
        </header>

        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}

        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            />
          ))}
        </div>
      </div>
    </BodyInset>
  );
}
