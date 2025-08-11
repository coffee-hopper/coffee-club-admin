import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useMobileAuth } from "@/hooks/auth/useMobileAuth";

export function Register({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { handleGoogleLogin } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { requestOtp, verifyOtp, isRequesting, isVerifying } = useMobileAuth(); // ✅ Now using real auth hook

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    requestOtp(phone, {
      onError: () => setError("Failed to send OTP. Please try again."),
    });
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    verifyOtp(
      { phone, code: otp },
      {
        onError: () => setError("Invalid OTP. Please try again."),
      }
    );
  };

  return (
    <div
      className={cn("flex mx-auto pt-20 flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with Google or enter your phone number
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="google"
                className="w-50 mx-auto"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            </div>
          </div>
        </CardContent>
        <div className="relative  py-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
        <CardContent>
          {otp === "" ? (
            // {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0(5__)___-____"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isRequesting}
                >
                  {isRequesting ? "Sending OTP..." : "Login with Phone"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="otp">SMS Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Continue"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
