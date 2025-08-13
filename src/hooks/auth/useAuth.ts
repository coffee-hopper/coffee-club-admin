import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser as getStoredUser, clearAuth } from "@/utils/storage";
import { User } from "@/types/entity-types";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User | null>({
    queryKey: ["user"],
    initialData: getStoredUser,
    enabled: false,
  });

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google`
      );
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Google login URL not received.");
      }
    } catch (error) {
      console.error("Failed to initiate Google login:", error);
    }
  };

  const logout = useMutation({
    mutationFn: async () => {
      clearAuth();
      queryClient.setQueryData(["user"], null);
      window.location.assign("/");
    },
  });

  return {
    user,
    handleGoogleLogin,
    logout: logout.mutate,
  };
}
