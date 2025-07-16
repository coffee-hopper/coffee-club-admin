import client from "./client";
import { Payment, CreatePaymentPayload } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

export async function getAllPayments(): Promise<Payment[]> {
  try {
    const res = await client.get("/payments");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllPayments");
  }
}

export async function createPayment(
  data: CreatePaymentPayload
): Promise<Payment> {
  try {
    const res = await client.post("/payments", data);
    return res.data;
  } catch (error) {
    handleApiError(error, "createPayment");
  }
}
