import { User } from "@/types/entity-types";
import formatDate from "@/utils/dateFormatter";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/ui/UserAvatar";

type Props = {
  user: User;
  onEdit: () => void;
};

export default function UserRow({ user, onEdit }: Props) {
  const created = formatDate(user.createdAt);

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col items-center gap-2 w-20">
          <span
            className={cn(
              "flex w-14 justify-center items-center rounded-full p-1 text-xs font-medium",
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
            )}
          >
            {user.role}
          </span>

          <UserAvatar user={user} size="md" rounded="full" />
        </div>

        <div className="min-w-0">
          <div className="font-bold truncate text-xs">{user.username}</div>
          <div className="text-sm text-gray-500 truncate">
            {user.googleEmail ?? "—"}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center min-w-30">
          <span className="font-bold text-xs">Created:</span>
          <span className="font-light text-gray-500 text-sm"> {created}</span>
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
