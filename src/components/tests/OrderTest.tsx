import { useEffect, useState } from "react";
import { getAllOrders, createOrder, getAllOrderItems } from "@/api/order";

export default function OrderTest() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    productId: "",
    quantity: "",
    price: "",
  });

  const fetchAll = async () => {
    try {
      const [ordersData, itemsData] = await Promise.all([
        getAllOrders(),
        getAllOrderItems(),
      ]);
      setOrders(ordersData);
      setOrderItems(itemsData);
    } catch (err) {
      console.error("Fetching failed", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ["userId", "productId", "quantity", "price"].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleCreateOrder = async () => {
    const totalAmount = form.price * form.quantity;

    const payload = {
      user: form.userId,
      items: [
        {
          product: { id: form.productId },
          quantity: form.quantity,
          price: form.price,
        },
      ],
      totalAmount,
      status: "pending",
    };

    try {
      await createOrder(payload);
      fetchAll();
    } catch (err) {
      alert("Order creation failed.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📦 Order & OrderItem Test Panel</h2>

      <div className="space-y-2">
        <input
          name="userId"
          placeholder="User ID"
          type="number"
          value={form.userId}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="productId"
          placeholder="Product ID"
          type="number"
          value={form.productId}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleCreateOrder}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Order
        </button>
      </div>

      <section>
        <h3 className="font-semibold">🧾 All Orders</h3>
        <pre className="bg-gray-100 p-4 text-sm rounded max-h-80 overflow-auto">
          {JSON.stringify(orders, null, 2)}
        </pre>
      </section>

      <section>
        <h3 className="font-semibold">📦 All Order Items</h3>
        <pre className="bg-gray-100 p-4 text-sm rounded max-h-80 overflow-auto">
          {JSON.stringify(orderItems, null, 2)}
        </pre>
      </section>
    </div>
  );
}
