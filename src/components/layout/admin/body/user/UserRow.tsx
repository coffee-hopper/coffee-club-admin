import { User } from "@/types/entity-types";
import formatDate from "@/utils/dateFormatter";
import { Button } from "@/components/ui/button";
import { CircleUser, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
  onEdit: () => void;
};

export default function UserRow({ user, onEdit }: Props) {
  const created = formatDate(user.createdAt);

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-sm">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
            )}
          >
            {user.role}
          </span>
        </div>
        {user.googlePicture ? (
          <img
            src={user.googlePicture}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover border"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border bg-gray-50 flex items-center justify-center">
            <CircleUser className="w-6 h-6 text-gray-500" />
          </div>
        )}
        <div className="min-w-0">
          <div className="font-semibold truncate">{user.username}</div>
          <div className="text-sm text-gray-500 truncate">
            {user.googleEmail ?? "—"}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center text-sm text-gray-500">
          <span className="font-medium text-gray-700">Created:</span>
          <span className="font-light text-gray-500"> {created}</span>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={onEdit}
          title="Edit role"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
