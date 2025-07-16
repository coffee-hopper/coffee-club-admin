import React, { useEffect, useState } from "react";
import { createProduct } from "@/api/product";
import { CreateProductPayload } from "@/types/entity-types";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProductCreate() {
  const { user } = useAuth();

  useEffect(() => {
    console.log("👤 Auth User Info:", user);
  }, [user]);

  const [form, setForm] = useState<CreateProductPayload>({
    name: "Flat White",
    category: "coffee",
    description: "description",
    price: 35,
    stockQuantity: 100,
    loyaltyMultiplier: 1,
  });

  console.log(user?.username);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["price", "stockQuantity", "loyaltyMultiplier"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await createProduct(form);
      alert("✅ Product created!");
      setForm({
        name: "Flat White",
        category: "coffee",
        description: "Smooth espresso with steamed milk",
        price: 35,
        stockQuantity: 100,
        loyaltyMultiplier: 1,
      });
    } catch (err) {
      alert("❌ Product creation failed");
      console.log("Error :", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto border rounded shadow">
      <h2 className="text-xl font-bold text-center">🆕 Create Product</h2>

      <div>
        <label className="block text-xs font-medium text-gray-700">Name</label>
        <input
          name="name"
          placeholder="Flat White"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="coffee">Coffee ☕</option>
          <option value="tea">Tea 🍵</option>
          <option value="food">Food 🍽️</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700">
          Description
        </label>
        <input
          name="description"
          placeholder="e.g. smooth espresso with steamed milk"
          value={form.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Price (₺)
          </label>
          <input
            name="price"
            type="number"
            placeholder="₺35"
            value={form.price}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            name="stockQuantity"
            type="number"
            placeholder="100"
            value={form.stockQuantity}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700">
          Loyalty Multiplier
        </label>
        <input
          name="loyaltyMultiplier"
          type="number"
          placeholder="1"
          value={form.loyaltyMultiplier}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded w-full"
      >
        {isLoading ? "Creating..." : "Create Product"}
      </button>
    </div>
  );
}
