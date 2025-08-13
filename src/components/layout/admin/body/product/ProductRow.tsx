import ProductImageCard from "./ProductImageCard";
import { Product } from "@/types/entity-types";
import { deleteProduct } from "@/api/product";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
  onEdit: () => void;
  onDeleted?: () => void;
};

export default function ProductRow({ product, onEdit, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      setDeleting(true);
      await deleteProduct(product.id);
      onDeleted?.();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <ProductImageCard
        key={product.id}
        product={product}
        quantity={product.stockQuantity}
        size="small"
        imageOnly
      />

      <div className="flex-1 px-4 min-w-0">
        <div className="font-semibold text-base truncate">{product.name}</div>
        <div className="text-sm text-gray-500">
          Category: {product.category}
        </div>
        <div className="text-sm text-gray-500">Price: {product.price} ₺</div>
        <div className="text-sm text-gray-500">
          Stock: {product.stockQuantity}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={onEdit}
          title="Edit Details"
        >
          <Pencil className="w-4 h-4 text-gray-700" />
        </Button>

        <Button
          variant="destructive"
          className="gap-2"
          onClick={handleDelete}
          disabled={deleting}
          title="Edit Details"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
