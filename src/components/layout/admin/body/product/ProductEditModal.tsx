import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types/entity-types";
import { updateProduct } from "@/api/product";
import getImagePath from "@/utils/getImagePath";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
};

const EDITABLE_KEYS = [
  "name",
  "category",
  "description",
  "price",
  "stockQuantity",
  "imageName",
  "loyaltyMultiplier",
] as const;

type EditableKey = (typeof EDITABLE_KEYS)[number];
type ProductEditable = Pick<Product, EditableKey>;

export default function ProductEditModal({
  open,
  product,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Partial<ProductEditable>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!product) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = product;
    const editable: ProductEditable = {
      name: rest.name,
      category: rest.category as ProductEditable["category"],
      description: rest.description ?? "",
      price: rest.price,
      stockQuantity: rest.stockQuantity,
      imageName: rest.imageName ?? "",
      loyaltyMultiplier: rest.loyaltyMultiplier,
    };
    setForm(editable);
    setError("");
  }, [product]);

  const previewSrc = useMemo(() => {
    if (!form?.name || !form?.category)
      return "/images/products/default_coffee.png";
    if (form.imageName && form.imageName.trim().length > 0) {
      return `/images/products/${form.imageName}`;
    }
    return getImagePath(form.category as string, form.name);
  }, [form?.name, form?.category, form?.imageName]);

  if (!open || !product) return null;

  const setField = <K extends EditableKey>(key: K, value: ProductEditable[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const buildUpdatePayload = (): Partial<ProductEditable> => {
    return (EDITABLE_KEYS as readonly EditableKey[]).reduce((acc, key) => {
      const newVal = form[key];
      const oldVal = (product as ProductEditable)[key];
      if (newVal !== undefined && newVal !== oldVal) {
        return { ...acc, [key]: newVal };
      }
      return acc;
    }, {} as Partial<ProductEditable>);
  };

  const validate = () => {
    if (!form.name || !String(form.name).trim()) return "Name is required.";
    if (!form.category) return "Category is required.";
    if (form.price != null && Number(form.price) < 0)
      return "Price cannot be negative.";
    if (form.stockQuantity != null && Number(form.stockQuantity) < 0)
      return "Stock cannot be negative.";
    if (form.loyaltyMultiplier != null && Number(form.loyaltyMultiplier) < 0)
      return "Loyalty multiplier cannot be negative.";
    return "";
  };

  const handleSave = async () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    const payload = buildUpdatePayload();
    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }
    try {
      setSaving(true);
      setError("");
      await updateProduct(product.id, payload);
      onSaved();
    } catch (err) {
      console.error(err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-[560px] max-w-[95vw] rounded-xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-[120px] h-[120px] rounded-md bg-gray-50 border flex items-center justify-center overflow-hidden">
            <img
              src={previewSrc}
              alt={String(form.name ?? "")}
              onError={(e) => {
                e.currentTarget.src = "/images/products/default_coffee.png";
              }}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Edit product</h3>
            <p className="text-sm text-gray-500 mb-4 truncate">
              {product.name}
            </p>

            {error && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  value={String(form.name ?? "")}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={String(form.category ?? "")}
                  onChange={(e) =>
                    setField(
                      "category",
                      e.target.value as ProductEditable["category"]
                    )
                  }
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="coffee">Coffee</option>
                  <option value="tea">Tea</option>
                  <option value="food">Food</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={String(form.description ?? "")}
                  onChange={(e) => setField("description", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                  rows={3}
                  placeholder="Short description"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Price (₺)
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price ?? 0}
                  onChange={(e) => setField("price", Number(e.target.value))}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Stock quantity
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.stockQuantity ?? 0}
                  onChange={(e) =>
                    setField("stockQuantity", Number(e.target.value))
                  }
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Image filename
                </label>
                <input
                  value={String(form.imageName ?? "")}
                  onChange={(e) => setField("imageName", e.target.value)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="e.g. coffee_iced_latte.png"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Leave empty to auto-derive from category + name.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Loyalty multiplier
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={form.loyaltyMultiplier ?? 0}
                  onChange={(e) =>
                    setField("loyaltyMultiplier", Number(e.target.value))
                  }
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="secondary"
                className="gap-2"
                onClick={onClose}
                title="Close without saving"
              >
                Cancel
              </Button>

              <Button
                variant="default"
                className="gap-2"
                onClick={handleSave}
                disabled={saving}
                title="Save Changes"
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
