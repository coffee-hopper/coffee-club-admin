import { Order } from "@/types/entity-types";
import { AppTable } from "../app-table";

export function OrderTable({ data }: { data: Order[] }) {
  const filtered = data.map(
    ({ id, username, totalAmount, status, createdAt }) => ({
      id,
      username,
      totalAmount,
      status,
      createdAt,
    })
  );

  return <AppTable data={filtered} />;
}
