import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
} from "@/api/product";
import { Product } from "@/types/entity-types";

export default function ProductEdit() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleDeleteOne = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleDeleteAll = async () => {
    const ids = products.map((p) => p.id);
    await deleteManyProducts(ids);
    loadProducts();
  };

  const handleSave = async () => {
    if (selected) {
      const { id, ...data } = selected;
      await updateProduct(id, data);
      setIsEditOpen(false);
      loadProducts();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">☕ Product List</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Name</th>
            <th>Image Name</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.category}</td>
              <td>{p.name}</td>
              <td className="text-xs text-gray-500 italic">
                {p.imageName || "-"}
              </td>
              <td>{p.description}</td>
              <td>{p.stockQuantity}</td>
              <td>{p.price}</td>
              <td>
                <details className="dropdown">
                  <summary className="btn btn-sm">Edit</summary>
                  <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-32">
                    <li>
                      <button
                        onClick={() => {
                          setSelected(p);
                          setIsEditOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleDeleteOne(p.id)}>
                        Delete
                      </button>
                    </li>
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-6 py-2 rounded shadow"
        >
          Delete All Products
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg space-y-4 w-[400px]">
            <h3 className="text-lg font-semibold">Edit Product</h3>

            <input
              value={selected.name}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
              placeholder="Name"
              className="border px-2 py-1 w-full rounded"
            />
            <input
              value={selected.category}
              onChange={(e) =>
                setSelected({ ...selected, category: e.target.value })
              }
              placeholder="Category"
              className="border px-2 py-1 w-full rounded"
            />
            <input
              value={selected.description || ""}
              onChange={(e) =>
                setSelected({ ...selected, description: e.target.value })
              }
              placeholder="Description"
              className="border px-2 py-1 w-full rounded"
            />
            <input
              type="number"
              value={selected.stockQuantity}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  stockQuantity: Number(e.target.value),
                })
              }
              placeholder="Stock"
              className="border px-2 py-1 w-full rounded"
            />
            <input
              type="number"
              value={selected.price}
              onChange={(e) =>
                setSelected({ ...selected, price: Number(e.target.value) })
              }
              placeholder="Price"
              className="border px-2 py-1 w-full rounded"
            />

            <div className="flex justify-between pt-2">
              <button
                onClick={() => handleDeleteOne(selected.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="bg-gray-300 px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
