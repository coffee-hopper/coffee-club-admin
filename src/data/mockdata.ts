export const mockData = {
  invoices: [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
  ],

  products: [
    {
      id: 1,
      name: "Espresso",
      price: "$2.50",
      stock: 50,
      category: "Beverage",
      edit: true,
    },
    {
      id: 2,
      name: "Cappuccino",
      price: "$3.50",
      stock: 30,
      category: "Beverage",
      edit: true,
    },
  ],

  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      edit: true,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      role: "User",
      edit: true,
    },
  ],

  orders: [
    {
      orderId: "ORD001",
      customer: "John Doe",
      status: "Shipped",
      total: "$40.00",
    },
    {
      orderId: "ORD002",
      customer: "Jane Doe",
      status: "Processing",
      total: "$30.00",
    },
  ],
};
