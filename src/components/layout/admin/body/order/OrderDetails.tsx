import { Invoice, Order, Product } from "@/types/entity-types";
import { useRef } from "react";

import formatInvoiceDate from "@/utils/dateFormatter";
import ProductImageCard from "../product/ProductImageCard";

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
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]"
      onClick={onClose}
    >
      <div
        ref={printRef}
        className="flex flex-col gap-4 bg-white p-8 rounded-xl w-[450px] max-h-[90vh] overflow-y-auto print:max-h-full print:overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-center font-extrabold text-lg mb-4">
            ORDER #{order.id}'s INVOICE
          </h2>
          <hr />
        </div>

        <div className="text-sm space-y-1">
          <p>
            <strong>Customer mail:</strong> {order.username}@gmail.com
          </p>
          <p>
            <strong>Order Created:</strong> {formattedDate}
          </p>
          <p>
            <strong>Order Status:</strong>{" "}
            <span className="capitalize">{order.status}</span>
          </p>

          <div className="mt-2">
            <strong>Products:</strong>
            <div className="flex flex-wrap gap-2 mt-2 max-h-[45vh] overflow-y-auto pr-2 print:max-h-full print:overflow-visible">
              {order.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                return (
                  <ProductImageCard
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

        <p className="text-sm font-bold">
          <strong>Total:</strong> {invoice?.totalAmount} ₺
        </p>

        <div className="flex justify-between mt-6 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Print PDF
          </button>
        </div>
      </div>
    </div>
  );
}
