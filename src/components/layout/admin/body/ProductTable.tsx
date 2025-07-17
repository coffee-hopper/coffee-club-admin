import { Product } from "@/types/data-types";
import { AppTable } from "../app-table";

export function ProductTable({ data }: { data: Product[] }) {
  const filtered = data.map(({ id, name, price, stockQuantity }) => ({
    id,
    name,
    price,
    stockQuantity,
  }));

  return <AppTable data={filtered} />;
}
