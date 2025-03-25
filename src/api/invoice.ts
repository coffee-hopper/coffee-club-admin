import client from "./client";
import { CreateInvoicePayload, Invoice } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

// Fetch all invoices
export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const res = await client.get("/invoices");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllInvoices");
  }
}

// Create invoice
export async function createInvoice(
  data: CreateInvoicePayload
): Promise<Invoice> {
  try {
    const res = await client.post("/invoices", data);
    return res.data;
  } catch (error) {
    handleApiError(error, "createInvoice");
  }
}

// Fetch invoice by order ID
export async function getInvoiceByOrderId(orderId: number): Promise<Invoice> {
  try {
    const res = await client.get(`/invoices/order/${orderId}`);
    return res.data;
  } catch (error) {
    handleApiError(error, "getInvoiceByOrderId");
  }
}
