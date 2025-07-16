import client from "./client";
import { CreateOrderPayload, Order, OrderItem } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const res = await client.get("/orders");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllOrders");
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
