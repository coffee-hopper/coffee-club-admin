import { useState, useEffect } from "react";
import { getAllProducts, createProduct } from "@/api/product";

export default function ProductTest() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "drink",
    description: "",
    price: 0,
    stockQuantity: 0,
    loyaltyMultiplier: 1,
  });

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["price", "stockQuantity", "loyaltyMultiplier"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createProduct(form);
      fetchProducts();
    } catch (err) {
      alert("Product creation failed");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🧪 Product Test</h2>

      <div className="space-y-2">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />

        <select
          name="category"
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="drink">Drink</option>
          <option value="food">Food</option>
          <option value="snack">Snack</option>
          <option value="accessory">Accessory</option>
        </select>

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="stockQuantity"
          type="number"
          placeholder="Stock Quantity"
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="loyaltyMultiplier"
          type="number"
          placeholder="Loyalty Multiplier"
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Create Product
        </button>
      </div>

      <div className="text-2xl  font-bold text-center">All Products</div>
      <pre className="bg-gray-100 p-4 text-sm rounded max-h-80 overflow-auto">
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
