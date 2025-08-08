import { Invoice, Order, Product } from "@/types/entity-types";
import formatInvoiceDate from "@/utils/dateFormatter";
import OrderProductCard from "./OrderProductCard";
import { useRef } from "react";

interface Props {
  order: Order;
  invoice: Invoice | undefined;
  products: Product[];
  onClose: () => void;
}

export default function OrderDetails({
  order,
  invoice,
  products,
  onClose,
}: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const formattedDate = formatInvoiceDate(invoice?.invoiceDate);

  const handlePrint = () => {
    if (!printRef.current) return;

    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        ref={printRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          width: "450px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2
            style={{
              display: "flex",
              fontWeight: "bolder",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            ORDER #{order.id}'s INVOICE
          </h2>
          <hr />
        </div>

        <div>
          <p>
            <strong>Customer mail:</strong> {order.username}@gmail.com
          </p>
          <p>
            <strong>Order Created:</strong> {formattedDate}
          </p>
          <p>
            <strong>Order Status:</strong> {order.status}
          </p>

          <div>
            <strong>Products:</strong>
            <div className="flex flex-wrap gap-2 mt-2 max-h-[45vh] overflow-y-auto pr-2">
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                return (
                  <OrderProductCard
                    key={item.productId}
                    product={product}
                    quantity={item.quantity}
                    size="small"
                  />
                );
              })}
            </div>
          </div>

          <p className="mt-4">
            <strong>Invoice ID:</strong> #{invoice?.id}
          </p>
          <p>
            <strong>Billing Address:</strong> {invoice?.billingAddress}'s mock
            address
          </p>
        </div>
        <p>
          <strong>Total:</strong> {invoice?.totalAmount} ₺
        </p>

        <div className="flex justify-between mt-8 print:hidden">
          <button
            onClick={onClose}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              border: " 1px solid gray",
              borderRadius: "10px",
            }}
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            style={{
              padding: "6px 12px",
              cursor: "pointer",
              border: " 1px solid gray",
              borderRadius: "10px",
            }}
          >
            Print PDF
          </button>
        </div>
      </div>
    </div>
  );
}
