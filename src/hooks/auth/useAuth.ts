import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../types/user";
import { storage } from "../../utils/storage";
// import { api } from "../../lib/api";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User | null>({
    queryKey: ["user"],
    initialData: storage.getUser,
    enabled: false, // we might add queryFn in the future
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
      storage.removeUser();
      queryClient.setQueryData(["user"], null);
    },
  });

  return {
    user,
    handleGoogleLogin,
    logout: logout.mutate,
  };
}
