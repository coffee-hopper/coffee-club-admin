import { useState, useMemo } from "react";
import { CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from "@/types/entity-types";

type UserLike = Pick<User, "username" | "googleEmail" | "googlePicture">;

type Size = "xs" | "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

function getInitial(name?: string | null) {
  if (!name) return "U";
  const trimmed = name.trim();
  if (!trimmed) return "U";
  return trimmed[0]!.toUpperCase();
}

export interface UserAvatarProps {
  user?: UserLike | null;
  size?: Size;
  className?: string;
  rounded?: "full" | "md";
  withRing?: boolean;
  alt?: string;
}

export default function UserAvatar({
  user,
  size = "md",
  className,
  rounded = "full",
  withRing = false,
  alt,
}: UserAvatarProps) {
  const [errored, setErrored] = useState(false);

  const src = user?.googlePicture ?? "";
  const initial = useMemo(() => getInitial(user?.username), [user?.username]);

  const showImage = !!src && !errored;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden bg-gray-100 text-gray-600 select-none",
        sizeMap[size],
        rounded === "full" ? "rounded-full" : "rounded-md",
        withRing && "ring-2 ring-offset-2 ring-gray-200",
        className
      )}
      aria-label={alt ?? `${user?.username ?? "User"} avatar`}
      title={user?.username ?? undefined}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? `${user?.username ?? "User"} avatar`}
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className={cn("object-cover", "w-full h-full")}
          draggable={false}
        />
      ) : user?.username ? (
        <span className="font-medium">{initial}</span>
      ) : (
        <CircleUser className="w-2/3 h-2/3 text-gray-400" />
      )}
    </div>
  );
}
