import { useMemo, useState } from "react";
import { Product } from "@/types/entity-types";
import ProductRow from "./ProductRow";
import ProductEditModal from "./ProductEditModal";

type Props = {
  data: Product[];
  onRefresh?: () => void;
};

const CATEGORY_ORDER = ["coffee", "tea", "food"] as const;
type CategoryKey = (typeof CATEGORY_ORDER)[number];

function labelFor(category: string) {
  switch (category) {
    case "coffee":
      return "Coffee";
    case "tea":
      return "Tea";
    case "food":
      return "Food";
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
}

export default function ProductTable({ data, onRefresh }: Props) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (p: Product) => {
    setEditing(p);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSaved = async () => {
    onRefresh?.();
    handleClose();
  };

  const handleDeleted = async () => {
    onRefresh?.();
  };

  const grouped = useMemo(() => {
    const buckets: Record<string, Product[]> = {};
    for (const p of data) {
      const key = (p.category || "other").toLowerCase();
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(p);
    }
    Object.keys(buckets).forEach((k) => {
      buckets[k].sort((a, b) => a.id - b.id);
    });
    return buckets;
  }, [data]);

  const orderedCategoryKeys = useMemo(() => {
    const keys = Object.keys(grouped);
    const known = (CATEGORY_ORDER as readonly string[]).filter((c) =>
      keys.includes(c)
    ) as CategoryKey[];
    const extras = keys
      .filter((k) => !(CATEGORY_ORDER as readonly string[]).includes(k))
      .sort();
    return [...known, ...extras];
  }, [grouped]);

  return (
    <div className="p-8 font-sans">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      {orderedCategoryKeys.length === 0 && (
        <div className="text-gray-500">No products found.</div>
      )}

      {orderedCategoryKeys.map((categoryKey) => (
        <section key={categoryKey} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">
              {labelFor(categoryKey)} ({grouped[categoryKey].length})
            </h3>
          </div>

          <div className="space-y-3">
            {grouped[categoryKey].map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product)}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        </section>
      ))}

      <ProductEditModal
        open={open}
        product={editing}
        onClose={handleClose}
        onSaved={handleSaved}
      />
    </div>
  );
}
