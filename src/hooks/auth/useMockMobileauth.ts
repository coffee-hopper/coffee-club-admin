import { useState } from "react";

export function useMockMobileAuth() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const requestOtp = (phone: string) => {
    console.log(`Mock OTP sent to ${phone}`);
    setIsLoading(true);
    setTimeout(() => {
      setStep("otp");
      setIsLoading(false);
    }, 1000);
  };

  const verifyOtp = ({ phone, code }: { phone: string; code: string }) => {
    console.log(`Mock OTP verified for ${phone} with code ${code}`);
    setIsLoading(true);
    setTimeout(() => {
      alert("Mock Login Successful!");
      setIsLoading(false);
    }, 1000);
  };

  return {
    requestOtp,
    verifyOtp,
    isRequesting: isLoading,
    isVerifying: isLoading,
    step,
  };
}
