"use client";

import * as React from "react";

import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "../../ui/nav-main";
import { NavProjects } from "../../ui/nav-projects";
import { NavUser } from "../../ui/nav-user";

// This is mock data.
const data = {
  navMain: [
    {
      title: "Store",
      url: "/orders",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Orders",
          url: "/orders",
        },
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Customers",
          url: "/customers",
        },
      ],
    },
    {
      title: "Test 1",
      url: "/",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "/",
        },
        {
          title: "Explorer",
          url: "/",
        },
        {
          title: "Quantum",
          url: "/",
        },
      ],
    },
    {
      title: "Test 2",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/",
        },
        {
          title: "Get Started",
          url: "/",
        },
        {
          title: "Tutorials",
          url: "/",
        },
        {
          title: "Changelog",
          url: "/",
        },
      ],
    },
  ],
  messages: [
    {
      name: "Messages",
      url: "/",
      icon: Frame,
    },
    {
      name: "Unread",
      url: "/",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects messages={data.messages} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
