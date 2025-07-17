import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getActionHandler } from "@/utils/tableActions";
import { useLocation } from "react-router-dom";
import { ActionType } from "@/types/data-types";

interface DataRow {
  edit?: boolean;
  [key: string]: unknown;
}

type TableProps<T extends DataRow> = {
  data: T[];
};

export function AppTable<T extends DataRow>({ data }: TableProps<T>) {
  const location = useLocation();
  const { pathname } = location;

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-lg">No data available.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]) as (keyof T)[];

  const actionConfig = getActionHandler(pathname);
  const handleAction = actionConfig?.handler as
    | ((action: ActionType, item: T) => void)
    | undefined;
  const availableActions: ActionType[] = actionConfig?.actions || [];

  const hasActions = data.some((row) => row.edit === true);

  return (
    <div className="rounded-lg p-4">
      <Table>
        <TableCaption>Displaying data</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col)} className="capitalize">
                {String(col)
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
              </TableHead>
            ))}
            {hasActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={String(col)}>
                  {typeof row[col] === "string" || typeof row[col] === "number"
                    ? row[col]
                    : JSON.stringify(row[col])}
                </TableCell>
              ))}
              {row.edit && handleAction && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {availableActions.map((action, i) => (
                        <DropdownMenuItem
                          key={i}
                          onClick={() => handleAction(action, row)}
                        >
                          {action}asdasd
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>Total Items</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
