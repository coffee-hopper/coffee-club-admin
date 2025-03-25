import client from "./client";
import { CreateProductPayload, Product } from "@/types/entity-types";
import { handleApiError } from "./error-handler";

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await client.get("/products");
    return res.data;
  } catch (error) {
    handleApiError(error, "getAllProduct");
  }
}

// Create new product
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
