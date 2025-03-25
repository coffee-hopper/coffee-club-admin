import {
  AddLoyaltyEntryPayload,
  LoyaltyEntry,
  LoyaltySummary,
} from "@/types/entity-types";
import client from "./client";
import { handleApiError } from "./error-handler";

// Get all loyalty entries
export async function getAllLoyaltyEntries(): Promise<LoyaltyEntry[]> {
  try {
    const res = await client.get("/loyalty");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllLoyaltyEntries");
  }
}

// Add loyalty entry
export async function addLoyaltyEntry(data: AddLoyaltyEntryPayload) {
  try {
    const res = await client.post("/loyalty", data);
    return res.data;
  } catch (error) {
    handleApiError(error, "addLoyaltyEntry");
  }
}

// Get stars for user
export async function getUserStars(userId: number): Promise<LoyaltySummary> {
  try {
    const res = await client.get(`/loyalty/user/${userId}/stars`);
    return res.data;
  } catch (error) {
    handleApiError(error, "getUserStars");
  }
}
