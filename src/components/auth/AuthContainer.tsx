import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth, isAuthenticated } from "@/utils/storage";
import { AdminPanel } from "../layout/admin/AdminPanel";
import { Register } from "../layout/register/Register";
import { useQueryClient } from "@tanstack/react-query";

function safeParseUser(userParam: string | null) {
  if (!userParam) return null;
  try {
    const decoded = decodeURIComponent(userParam);
    return JSON.parse(decoded);
  } catch {
    try {
      return JSON.parse(userParam);
    } catch {
      return null;
    }
  }
}

export default function AuthContainer() {
  const queryClient = useQueryClient();

  const location = useLocation();
  const navigate = useNavigate();
  const [, setVersion] = useState(0);

  useEffect(() => {
    const qp = new URLSearchParams(location.search);
    const token = qp.get("token");
    const expStr = qp.get("exp");
    const expiresAtParam = qp.get("expiresAt");
    const userParam = qp.get("user");

    if (token && (expStr || expiresAtParam) && userParam) {
      const user = safeParseUser(userParam);
      const expNum = expStr ? Number(expStr) : undefined;

      try {
        setAuth({
          token,
          user,
          expiresAt: expiresAtParam ?? undefined,
          exp: Number.isFinite(expNum) ? (expNum as number) : undefined,
        });

        setVersion((v) => v + 1);

        queryClient.setQueryData(["user"], user);
        navigate("/products", { replace: true });
      } catch {
        /* noop */
      }
    }
  }, [location.search, navigate]);

  return isAuthenticated() ? <AdminPanel /> : <Register />;
}
