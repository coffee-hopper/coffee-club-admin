/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getAllOrders } from "@/api/order";
import { getAllInvoices } from "@/api/invoice";
import { getAllProducts } from "@/api/product";
import { getAllUsers } from "@/api/user";

import { handleApiError } from "@/api/error-handler";
import { useAuth } from "./auth/useAuth";

export function useEntityData() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>();
  const [invoices, setInvoices] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      switch (pathname) {
        case "/orders": {
          const [orderRes, invoiceRes, productRes] = await Promise.all([
            getAllOrders(),
            getAllInvoices(),
            getAllProducts(),
          ]);
          setOrders(orderRes);
          setInvoices(invoiceRes);
          setProducts(productRes);
          setData(orderRes);
          break;
        }
        case "/invoices":
          setData(await getAllInvoices());
          break;
        case "/products":
          setData(await getAllProducts());
          break;
        case "/users":
          if (user?.role === "admin") {
            setData(await getAllUsers());
          } else {
            throw new Error("Unauthorized access to user data");
          }
          break;
        default:
          setData([]);
      }
    } catch (err) {
      const message = handleApiError(err, "useEntityData");
      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathname]);

  return {
    data: data ?? [],
    orders: orders ?? [],
    invoices: invoices ?? [],
    products: products ?? [],
    loading,
    error,
    pathname,
    refetch: fetchData,
  };
}
