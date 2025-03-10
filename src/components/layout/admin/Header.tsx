import { useAuth } from "../../../hooks/auth/useAuth";
import { Button } from "../../common/Buttons";

export function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Coffee Shop Header</h1>
      <Button label="Logout" onClick={() => logout()} variant="danger" />
    </header>
  );
}
