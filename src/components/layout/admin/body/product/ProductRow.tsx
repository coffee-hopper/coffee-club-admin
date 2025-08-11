import ProductImageCard from "./ProductImageCard";
import { Product } from "@/types/entity-types";
import { deleteProduct } from "@/api/product";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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
        <button
          onClick={onEdit}
          className="p-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          title="Edit stock"
        >
          <Pencil className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 border border-red-300 text-red-700 rounded-md bg-red-50 hover:bg-red-100 transition disabled:opacity-60"
          title="Delete product"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
