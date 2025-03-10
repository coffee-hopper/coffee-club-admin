import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../types/user";
import { storage } from "../../utils/storage";
import { api } from "../../lib/api";

export function useAuth() {
  const queryClient = useQueryClient();

  //Created for simulated mock-login action
  const mockUser: User = {
    id: "12345",
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://i.pravatar.cc/150?u=12345", // Random profile image
  };

  // **Mock Google Login**
  const handleMockLogin = () => {
    storage.setUser(mockUser); // Store in local storage
    queryClient.setQueryData(["user"], mockUser); // Simulate API response
  };

  const { data: user } = useQuery<User | null>({
    queryKey: ["user"],
    initialData: storage.getUser,
    enabled: false, // we might add queryFn in the future
  });

  const handleGoogleLogin = () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/google`;
    window.location.href = url;
  };

  const logout = useMutation({
    mutationFn: async () => {
      storage.removeUser();
      queryClient.setQueryData(["user"], null); // for removing cache
    },
  });

  return {
    user,
    // handleGoogleLogin,
    handleGoogleLogin: handleMockLogin, //ADDED: Mock_Login
    logout: logout.mutate,
  };
}
