import client from "./client";
import { CreateProductPayload, Product } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await client.get("/products");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllProduct");
  }
}

export async function createProduct(
  data: CreateProductPayload
): Promise<Product> {
  try {
    const res = await client.post("/products", data);
    return res.data;
  } catch (error) {
    handleApiError(error, "createProduct");
  }
}

export async function updateProduct(
  id: number,
  data: Partial<Product>
): Promise<Product> {
  try {
    const res = await client.patch(`/products/${id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error, "updateProduct");
  }
}

export async function deleteProduct(id: number): Promise<void> {
  try {
    await client.delete(`/products/${id}`);
  } catch (error) {
    handleApiError(error, "deleteProduct");
  }
}

export async function deleteManyProducts(ids: number[]): Promise<void> {
  try {
    await Promise.all(ids.map((id) => client.delete(`/products/${id}`)));
  } catch (error) {
    handleApiError(error, "deleteManyProducts");
  }
}
