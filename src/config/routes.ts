/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockData } from "@/data/mockdata";
import { sidebarIcons } from "./sidebarIcons";

export const appRoutes = [
  {
    title: "Orders",
    url: "/orders",
    icon: sidebarIcons.orders,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: sidebarIcons.invoices,
  },
  {
    title: "Products",
    url: "/products",
    icon: sidebarIcons.products,
  },
  {
    title: "Users",
    url: "/users",
    icon: sidebarIcons.users,
  },
];

export const dataMap: Record<string, any[]> = {
  "/orders": mockData.orders || [],
  "/invoices": mockData.invoices || [],
  "/products": mockData.products || [],
  "/users": mockData.users || [],
};
