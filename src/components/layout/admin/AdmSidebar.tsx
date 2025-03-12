import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAuth } from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// This is mock data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Siparişler",
      url: "#Orders",
      items: [
        {
          title: "Toplam Sipariş",
          url: "#",
        },
        {
          title: "Toplam Kazanç",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Menüler",
      url: "#",
      items: [
        {
          title: "Tüm Menüler",
          url: "#",
        },
        {
          title: "Yiyecek",
          url: "#",
        },
        {
          title: "İçecek",
          url: "#",
        },
        {
          title: "Favoriler",
          url: "#",
        },
      ],
    },
    {
      title: "Müşteriler",
      url: "#",
      items: [
        {
          title: "Müşteri menü 1",
          url: "#",
        },
        {
          title: "Müşteri menü 2",
          url: "#",
        },
        {
          title: "Müşteri menü 3",
          url: "#",
        },
      ],
    },
  ],
};

export function AdmSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout, user } = useAuth();

  return (
    <Sidebar
      {...props}
      className={cn(
        "fixed left-0 top-0 h-full transition-[width] duration-200 ease-in-out z-50"
      )}
    >
      <SidebarHeader>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold">{user?.username}</h2>
          <p className="text-gray-500 text-sm">{user?.googleEmail}</p>
        </div>

        <Button variant="destructive" className="" onClick={() => logout()}>
          Logout
        </Button>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
