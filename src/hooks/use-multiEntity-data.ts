import { useEffect, useState } from "react";
import { getAllOrders, getAllInvoices } from "@/api/order";
import { Order, Invoice, Product } from "@/types/entity-types";
import { getAllProducts } from "@/api/product";

type MultiEntityData = {
  orders: Order[];
  invoices: Invoice[];
  products: Product[];
  loading: boolean;
};

export function useMultiEntityData(): MultiEntityData {
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [ordersData, invoiceData, productData] = await Promise.all([
        getAllOrders(),
        getAllInvoices(),
        getAllProducts(),
      ]);

      setOrders(ordersData || []);
      setInvoices(invoiceData || []);
      setProducts(productData || []);
      setLoading(false);
    }

    fetchAll();
  }, []);

  return { orders, invoices, products, loading };
}
