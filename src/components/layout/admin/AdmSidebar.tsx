import * as React from "react";
import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
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
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

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
        {items.map((item) => (
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

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
