import { BadgeCheck, Bell, CreditCard, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/ui/UserAvatar";

export function NavUser() {
  const { logout, user } = useAuth();

  const { isMobile, state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "h-14 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                state === "collapsed" ? "min-w-16 min-h-14 items-center" : ""
              )}
            >
              <UserAvatar
                user={user ?? null}
                size="lg"
                className={cn(
                  "shadow-sm",
                  state === "collapsed" ? "min-w-12 min-h-12" : "w-12 h-12"
                )}
              />

              <span>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.username}
                  </span>
                  <span className="truncate text-xs">{user?.googleEmail}</span>
                </div>
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={12}
          >
            <DropdownMenuLabel className="p-0 font-normal"></DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Loyalty Points
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Credits
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="default"
                className="w-full"
                onClick={() => logout()}
              >
                <LogOut />
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
