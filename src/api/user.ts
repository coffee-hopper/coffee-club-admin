import client from "./client";
import { User } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const res = await client.get(`/users/${email}`);
    return res.data;
  } catch (error) {
    handleApiError(error, "getUserByEmail");
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await client.get("/users");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllUsers");
  }
}
