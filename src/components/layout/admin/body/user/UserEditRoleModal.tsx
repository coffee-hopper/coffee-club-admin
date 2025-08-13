import { useEffect, useState } from "react";
import { User } from "@/types/entity-types";
import { updateUserRole } from "@/api/user";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function UserEditRoleModal({
  open,
  user,
  onClose,
  onSaved,
}: Props) {
  const [role, setRole] = useState<User["role"]>("user");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role) setRole(user.role);
    setError("");
  }, [user]);

  if (!open || !user) return null;

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      if (role !== user.role) {
        await updateUserRole(user.id, { role });
      }

      onSaved();
    } catch {
      setError("Failed to update role. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-[420px] max-w-[92vw] rounded-xl p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-1">Edit role</h3>
        <p className="text-sm text-gray-500 mb-4 truncate">
          {user.username} &middot; {user.googleEmail ?? "—"}
        </p>

        <label className="block text-sm mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as User["role"])}
          className="w-full border rounded-md px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={onClose}
            title="Cancel Changes"
          >
            Cancel
          </Button>

          <Button
            variant="default"
            className="gap-2"
            onClick={handleSave}
            disabled={saving}
            title="Save Changes"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
