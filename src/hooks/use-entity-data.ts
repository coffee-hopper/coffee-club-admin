import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getAllOrders } from "@/api/order";
import { getAllInvoices } from "@/api/invoice";
import { getAllProducts } from "@/api/product";
import { getAllUsers } from "@/api/user";

import { handleApiError } from "@/api/error-handler";

export function useEntityData() {
  const location = useLocation();
  const pathname = location.pathname;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      switch (pathname) {
        case "/orders":
          setData(await getAllOrders());
          break;
        case "/invoices":
          setData(await getAllInvoices());
          break;
        case "/products":
          setData(await getAllProducts());
          break;
        case "/users":
          setData(await getAllUsers());
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

  return { data, loading, error, pathname, refetch: fetchData };
}
