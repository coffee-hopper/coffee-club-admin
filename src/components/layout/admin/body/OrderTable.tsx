import { useState } from "react";
import { Invoice, Order, Product } from "@/types/entity-types";
import OrderDetails from "./OrderDetails";
import OrderProductCard from "./OrderProductCard";
import formatInvoiceDate from "@/utils/dateFormatter";

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
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const handleOrderDetailsClick = (order: Order) => {
    const invoice = invoices.find((i) => i.order.id === order.id);
    setSelectedOrder(order);
    setSelectedInvoice(invoice);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Order Summary
      </h2>

      {orders.map((order) => {
        const invoice = invoices.find((i) => i.order.id === order.id);

        const statusColor = getStatusColor(order.status || "pending");

        const formattedDate = formatInvoiceDate(invoice?.invoiceDate);

        return (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "space-between",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <div
                style={{
                  backgroundColor: statusColor,
                  color: "#fff",
                  alignContent: "center",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {order.status ?? "Pending"}
              </div>

              <button
                onClick={() => handleOrderDetailsClick(order)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #666",
                  background: "#f9f9f9",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Order Details
              </button>
            </div>

            <div style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
              {formattedDate}
              {"  |  "}
              <strong>Order No:</strong> #{order.id}
              <span
                style={{
                  float: "right",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Total: {order.totalAmount} ₺
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "1rem",
              }}
            >
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                return (
                  <OrderProductCard
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
