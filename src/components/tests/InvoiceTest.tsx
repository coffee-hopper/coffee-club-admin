import { useEffect, useState } from "react";
import {
  getAllInvoices,
  createInvoice,
  getInvoiceByOrderId,
} from "@/api/invoice";

export default function InvoiceTest() {
  const [invoices, setInvoices] = useState([]);
  const [orderIdToSearch, setOrderIdToSearch] = useState("");
  const [invoiceByOrder, setInvoiceByOrder] = useState(null);
  const [form, setForm] = useState({
    orderId: 1,
    billingAddress: "123 Coffee St.",
    totalAmount: 25,
  });

  const fetchInvoices = async () => {
    try {
      const data = await getAllInvoices();
      setInvoices(data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["totalAmount", "orderId"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createInvoice({
        order: { id: form.orderId },
        billingAddress: form.billingAddress,
        totalAmount: form.totalAmount,
      });
      fetchInvoices();
    } catch (err) {
      alert("Invoice creation failed");
    }
  };

  const handleFetchByOrder = async () => {
    try {
      const data = await getInvoiceByOrderId(Number(orderIdToSearch));
      setInvoiceByOrder(data);
    } catch (err) {
      alert("Failed to fetch invoice for that order ID");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">🧾 Invoice Test</h2>

      <div className="space-y-2">
        <input
          name="orderId"
          type="number"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="billingAddress"
          placeholder="Billing Address"
          value={form.billingAddress}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="totalAmount"
          type="number"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Invoice
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Search by Order ID"
          value={orderIdToSearch}
          onChange={(e) => setOrderIdToSearch(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleFetchByOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Invoice by Order ID
        </button>
        {invoiceByOrder && (
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(invoiceByOrder, null, 2)}
          </pre>
        )}
      </div>

      <section>
        <h3 className="font-semibold">📄 All Invoices</h3>
        <pre className="bg-gray-100 p-4 text-sm rounded max-h-80 overflow-auto">
          {JSON.stringify(invoices, null, 2)}
        </pre>
      </section>
    </div>
  );
}
