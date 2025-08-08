// LOYALTY TYPES
export type LoyaltyEntry = {
  id: number;
  user: { id: number; username: string };
  product: { id: number; name: string };
  points: number;
  earnedAt: string;
  note?: string;
};

export type LoyaltySummary = {
  stars: number;
  rewards: number;
  remainingToNext: number;
};

export type AddLoyaltyEntryPayload = {
  user: { id: number };
  product: { id: number };
  points: number;
  note?: string;
};

// ===== ORDER TYPES =====
export type OrderItem = {
  id: number;
  order: { id: number };
  productId: number;
  product: { id: number; name: string; category: string };
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  user: User;
  username: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  payment?: Payment;
  invoice?: Invoice;
};

export type OrderItemInput = {
  product: { id: number };
  quantity: number;
  price: number;
};

export type CreateOrderPayload = {
  user: number;
  items: OrderItemInput[];
  totalAmount: number;
  status?: string;
};

// ===== PAYMENT TYPES =====
export type Payment = {
  id: number;
  order: { id: number };
  iyzicoTransactionId: string;
  amount: number;
  paymentMethod: "iyzico" | "cash";
  status: "success" | "failed";
  createdAt: string;
};

export type CreatePaymentPayload = {
  order: number;
  iyzicoTransactionId: string;
  amount: number;
  paymentMethod: "iyzico" | "cash";
  status: "success" | "failed";
};

// ===== INVOICE TYPES =====
export type Invoice = {
  id: number;
  order: { id: number };
  billingAddress: string;
  totalAmount: number;
  invoiceDate: string;
};

export type CreateInvoicePayload = {
  order: { id: number };
  billingAddress: string;
  totalAmount: number;
};

/*

// INVOICE TYPES
export type CreateInvoicePayload = {
  order: { id: number };
  billingAddress: string;
  totalAmount: number;
};

export type Invoice = {
  id: number;
  order: { id: number };
  billingAddress: string;
  totalAmount: number;
  invoiceDate: string;
};

// ORDER TYPES
export type OrderItemInput = {
  product: { id: number };
  quantity: number;
  price: number;
};

export type CreateOrderPayload = {
  user: number;
  items: OrderItemInput[];
  totalAmount: number;
  status?: string;
};

export type Order = {
  id: number;
  username: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export type OrderItem = {
  id: number;
  order: { id: number };
  product: { id: number; name: string };
  quantity: number;
  price: number;
};

// PAYMENT TYPES
export type CreatePaymentPayload = {
  order: number;
  iyzicoTransactionId: string;
  amount: number;
  paymentMethod: "iyzico" | "cash";
  status: "success" | "failed";
};

export type Payment = {
  id: number;
  order: { id: number };
  iyzicoTransactionId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  paidAt: string;
};
*/
// PRODUCT TYPES
export type CreateProductPayload = {
  name: string;
  category: "coffee" | "tea" | "food";
  description?: string;
  price: number;
  stockQuantity: number;
  loyaltyMultiplier?: number;
};

export type Product = {
  id: number;
  name: string;
  imageName?: string;
  category: string;
  description?: string;
  price: number;
  stockQuantity: number;
  loyaltyMultiplier: number;
  createdAt: string;
  updatedAt: string;
};

// USER TYPES
export type User = {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  googleId?: string;
  googleEmail?: string;
  googlePicture?: string;
  password?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};
