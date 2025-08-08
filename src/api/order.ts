import client from "./client";
import {
  CreateOrderPayload,
  Invoice,
  Order,
  OrderItem,
  Payment,
} from "@/types/entity-types";
import { handleApiError } from "./error-handler";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const res = await client.get("/orders");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllOrders");
  }
}

export async function getAllPayments(): Promise<Payment[]> {
  try {
    const res = await client.get("/payments");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllPayments");
  }
}

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const res = await client.get("/invoices");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllInvoices");
  }
}


export async function createOrder(data: CreateOrderPayload): Promise<Order> {
  try {
    const res = await client.post("/orders", data);
    return res.data;
  } catch (error) {
    handleApiError(error, "createOrder");
  }
}

export async function getAllOrderItems(): Promise<OrderItem[]> {
  try {
    const res = await client.get("/order-items");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllOrderItems");
  }
}
