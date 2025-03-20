import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

type NavMainProps = {
  items: NavItem[];
};

export function NavMain({ items }: NavMainProps) {
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      {state === "expanded" && (
        <SidebarGroupLabel>Coffee Club</SidebarGroupLabel>
      )}
      <SidebarMenu className={`${state === "collapsed" ? "mt-10" : ""}`}>
        {items.map(({ title, url, icon: Icon }) => (
          <SidebarMenuItem key={url}>
            <NavLink
              to={url}
              className={`flex items-center gap-3 w-full ${
                state === "collapsed" ? "justify-center" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              {state === "expanded" && <span>{title}</span>}{" "}
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
