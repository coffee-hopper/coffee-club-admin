import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../hooks/auth/useAuth";
import { storage } from "../../utils/storage";

import { AdminPanel } from "../layout/admin/AdminPanel";
import { Register } from "../layout/register/Register";

export function AuthContainer() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");

    if (userParam) {
      try {
        const decodedUser = decodeURIComponent(userParam);
        if (decodedUser.startsWith("{") && decodedUser.endsWith("}")) {
          const user = JSON.parse(decodedUser);
          storage.setUser(user);
          queryClient.setQueryData(["user"], user);
        } else {
          console.error("Invalid user data received:", decodedUser);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      } finally {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  }, []);

  return user ? <AdminPanel /> : <Register />;
}
