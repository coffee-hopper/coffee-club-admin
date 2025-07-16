import { useState } from "react";
import UserTest from "./UserTest";
import OrderTest from "./OrderTest";
import PaymentTest from "./PaymentTest";
import InvoiceTest from "./InvoiceTest";
import LoyaltyTest from "./LoyaltyTest";
import ProductEdit from "./ProductEdit";
import ProductCreate from "./ProductCreate";

const testTabs = {
  user: {
    label: "User Test",
    component: <UserTest />,
  },
  product: {
    label: "Product Create",
    component: <ProductCreate />,
  },
  productEdit: {
    label: "Product Edit",
    component: <ProductEdit />,
  },
  order: {
    label: "Order Test",
    component: <OrderTest />,
  },
  payment: {
    label: "Payment Test",
    component: <PaymentTest />,
  },
  invoice: {
    label: "Invoice Test",
    component: <InvoiceTest />,
  },
  loyalty: {
    label: "Loyalty Test",
    component: <LoyaltyTest />,
  },
};

export default function AllTest() {
  const [activeTab, setActiveTab] = useState<keyof typeof testTabs>("user");

  return (
    <div className="flex flex-col w-full px-6 py-4 items-center">
      <header className="flex gap-4 border-b pb-3 mb-4">
        {Object.entries(testTabs).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as keyof typeof testTabs)}
            className={`flex justify-center px-4 py-2 rounded-md text-xs w-16 font-semibold transition-all ${
              activeTab === key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </header>

      <main>{testTabs[activeTab].component}</main>
    </div>
  );
}
