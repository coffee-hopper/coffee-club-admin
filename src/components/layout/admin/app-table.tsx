"use client";

import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockOrders, mockProducts, mockCustomers } from "@/data/mockdata";

interface TableColumn {
  key: string;
  label: string;
}

interface TableConfig {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: TableColumn[];
  stickyColumns?: string[];
}

const tableConfig: Record<string, TableConfig> = {
  "/": {
    title: "Welcome",
    data: [],
    columns: [],
  },
  "/orders": {
    title: "Orders",
    data: mockOrders,
    columns: [
      { key: "id", label: "Order ID" },
      { key: "customer", label: "Customer" },
      { key: "total", label: "Total Amount" },
      { key: "status", label: "Status" },
    ],
  },
  "/products": {
    title: "Products",
    data: mockProducts,
    columns: [
      { key: "id", label: "Product ID" },
      { key: "name", label: "Product Name" },
      { key: "price", label: "Price" },
      { key: "stock", label: "Stock" },
    ],
  },
  "/customers": {
    title: "Customers",
    data: mockCustomers,
    columns: [
      { key: "id", label: "Customer ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
    ],
  },
};

export function AppTable() {
  const location = useLocation();
  const { pathname } = location;
  const { data, columns, stickyColumns } =
    tableConfig[pathname] || tableConfig["/"];

  return (
    <div className="rounded-lg p-4">
      {pathname === "/" ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-lg">
            Welcome! Please select a category from the sidebar to view data.
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-[85vh] justify-between">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
          </Table>

          <div className="max-h-[65vh] overflow-auto">
            <Table className="w-full">
              <TableBody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className={
                            stickyColumns?.includes(col.key)
                              ? "sticky left-0 bg-white z-10 shadow-md"
                              : ""
                          }
                        >
                          {row[col.key as keyof typeof row]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-4"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex">
            <TableFooter className="w-full">
              <TableRow className="flex w-full  justify-between">
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {data.length} Items
                </TableCell>
              </TableRow>
            </TableFooter>
          </div>
        </div>
      )}
    </div>
  );
}
