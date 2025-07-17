import { User } from "@/types/entity-types";
import { AppTable } from "../app-table";

export function UserTable({ data }: { data: User[] }) {
  const filtered = data.map(
    ({ id, username, googleEmail, role, createdAt }) => ({
      id,
      username,
      email: googleEmail,
      role,
      createdAt,
    })
  );

  return <AppTable data={filtered} />;
}
