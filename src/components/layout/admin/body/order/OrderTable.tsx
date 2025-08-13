import { useState } from "react";
import { Invoice, Order, Product } from "@/types/entity-types";
import OrderDetails from "./OrderDetails";

import formatInvoiceDate from "@/utils/dateFormatter";
import ProductImageCard from "../product/ProductImageCard";
import { Button } from "@/components/ui/button";

type Props = {
  orders: Order[];
  invoices: Invoice[];
  products: Product[];
};

export default function OrderTable({ orders, invoices, products }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleOrderDetailsClick = (order: Order) => {
    const invoice = invoices.find((i) => i.order.id === order.id);
    setSelectedOrder(order);
    setSelectedInvoice(invoice);
  };

  return (
    <div className="p-8 font-sans">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      {orders.map((order) => {
        const invoice = invoices.find((i) => i.order.id === order.id);
        const formattedDate = formatInvoiceDate(invoice?.invoiceDate);
        const statusColor = getStatusColor(order.status || "pending");

        return (
          <div
            key={order.id}
            className="border border-gray-300 rounded-lg mb-6 p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between font-semibold">
              <div
                className={`${statusColor} text-white px-3 py-1 rounded text-sm`}
              >
                {order.status ?? "Pending"}
              </div>

              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => handleOrderDetailsClick(order)}
                title="Open Order Details"
              >
                Order Details
              </Button>
            </div>

            <div className="text-sm text-gray-600 mt-2 flex justify-between items-center">
              <div>
                {formattedDate} | <strong>Order No:</strong> #{order.id}
              </div>
              <div className="font-bold text-base">
                Total: {order.totalAmount} ₺
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                return (
                  <ProductImageCard
                    key={item.productId}
                    product={product}
                    quantity={item.quantity}
                    size="medium"
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          invoice={selectedInvoice}
          products={products}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
