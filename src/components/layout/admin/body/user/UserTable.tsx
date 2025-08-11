import { useMemo, useState } from "react";
import { User } from "@/types/entity-types";
import UserRow from "./UserRow";
import UserEditRoleModal from "./UserEditRoleModal";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
  data: User[];
  onRefresh?: () => void;
};

function isJwtExpired(token?: string | null) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    if (typeof payload.exp !== "number") return true;
    return Date.now() / 1000 >= payload.exp;
  } catch {
    return true;
  }
}

export default function UserTable({ data, onRefresh }: Props) {
  const [editing, setEditing] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (u: User) => {
    setEditing(u);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSaved = async () => {
    await onRefresh?.();
    handleClose();
  };

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const tokenExpired = useMemo(() => isJwtExpired(token), [token]);
  const isAdmin = user?.role === "admin";

  if (tokenExpired) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-xl rounded-lg border border-yellow-300 bg-yellow-50 p-5">
          <h3 className="mb-1 text-lg font-semibold text-yellow-900">
            Session expired
          </h3>
          <p className="mb-4 text-sm text-yellow-800">
            Your sign-in session has ended. Please sign in again to continue.
          </p>
          <div className="flex gap-2">
            <button
              className="rounded-md bg-yellow-700 px-4 py-2 text-white hover:bg-yellow-800"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Sign in again
            </button>
            <button
              className="rounded-md border border-yellow-700 px-4 py-2 text-yellow-800 hover:bg-yellow-100"
              onClick={() => navigate("/products")}
            >
              Go to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-xl rounded-lg border border-red-300 bg-red-50 p-5">
          <h3 className="mb-1 text-lg font-semibold text-red-900">
            Admin access required
          </h3>
          <p className="mb-4 text-sm text-red-800">
            You don’t have permission to view the Users page.
          </p>
          <button
            className="rounded-md border border-red-700 px-4 py-2 text-red-800 hover:bg-red-100"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans">
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      {data.length === 0 ? (
        <div className="text-sm text-muted-foreground">No users found.</div>
      ) : (
        <div className="space-y-3">
          {data.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user)}
            />
          ))}
        </div>
      )}

      <UserEditRoleModal
        open={open}
        user={editing}
        onClose={handleClose}
        onSaved={handleSaved}
      />
    </div>
  );
}
