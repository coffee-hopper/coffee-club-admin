import client from "./client";
import { User } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await client.get("/users");
    return res.data as User[];
  } catch (error) {
    handleApiError(error, "getAllUsers");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const res = await client.get(`/users/${encodeURIComponent(email)}`);
    return (res.data as User) ?? null;
  } catch (error) {
    handleApiError(error, "getUserByEmail");
    return null;
  }
}

export async function updateUserRole(
  id: number,
  payload: { role: User["role"] }
): Promise<User> {
  try {
    const res = await client.patch(`/users/${id}/role`, payload);
    return res.data as User;
  } catch (error) {
    handleApiError(error, "updateUserRole");
    throw error;
  }
}
