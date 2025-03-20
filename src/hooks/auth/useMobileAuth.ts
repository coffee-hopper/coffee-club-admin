import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { User } from "../../types/user";
import { storage } from "../../utils/storage";

export function useMobileAuth() {
  const queryClient = useQueryClient();

  // Request OTP
  const requestOtp = useMutation({
    mutationFn: async (phone: string) => {
      console.log("📤 Sending OTP request with phone:", phone);

      //   const response = await fetch(
      //     `${import.meta.env.VITE_API_URL}/otp/request`,
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ phone }),
      //     }
      //   );

      //   if (!response.ok) {
      //     console.error("❌ Failed OTP request:", await response.text());

      //     throw new Error("Failed to send OTP");
      //   }

      //   return response.json();
      // },

      const response = await fetch(`/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        console.error("❌ Failed OTP request:", await response.text());
        throw new Error("Failed to send OTP");
      }

      return response.json();
    },
  });

  // Verify OTP and authenticate
  const verifyOtp = useMutation({
    mutationFn: async ({ phone, code }: { phone: string; code: string }) => {
      console.log("📤 Sending OTP verification with:", { phone, code });

      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/otp/verify`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ phone, code }),
      //   }
      // );
      const response = await fetch(`/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      if (!response.ok) {
        console.error("❌ Failed OTP verification:", await response.text());

        throw new Error("Invalid OTP");
      }

      const data = await response.json();
      console.log("✅ OTP verification success:", data);

      storage.setUser(data.user);
      queryClient.setQueryData(["user"], data.user);

      return data;
    },
  });

  return {
    requestOtp: requestOtp.mutate,
    verifyOtp: verifyOtp.mutate,
    isRequesting: requestOtp.isPending,
    isVerifying: verifyOtp.isPending,
  };
}
