import { useEffect, useState } from "react";
import { getAllPayments, createPayment } from "@/api/payment";

export default function PaymentTest() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    order: "",
    iyzicoTransactionId: "trx123456",
    amount: "",
    paymentMethod: "iyzico",
    status: "success",
  });

  const fetchPayments = async () => {
    try {
      const data = await getAllPayments();
      setPayments(data);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["amount", "order"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createPayment(form);
      fetchPayments();
    } catch (err) {
      alert("Payment creation failed");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">💳 Payment Test</h2>

      <div className="space-y-2">
        <input
          name="order"
          type="number"
          placeholder="Order ID"
          value={form.order}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="iyzicoTransactionId"
          placeholder="Transaction ID"
          value={form.iyzicoTransactionId}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="iyzico">Iyzico</option>
          <option value="cash">Cash</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Payment
        </button>
      </div>

      <section>
        <h3 className="font-semibold">🧾 All Payments</h3>
        <pre className="bg-gray-100 p-4 text-sm rounded max-h-80 overflow-auto">
          {JSON.stringify(payments, null, 2)}
        </pre>
      </section>
    </div>
  );
}
