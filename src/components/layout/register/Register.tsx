import { useAuth } from "../../../hooks/auth/useAuth";
import { Button } from "../../common/Buttons";

export function Register() {
  const { handleGoogleLogin } = useAuth();

  return (
    <div>
      Register test
      <Button label="Login with Google" onClick={handleGoogleLogin} />
    </div>
  );
}
