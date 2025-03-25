import axios, { AxiosError } from "axios";

export function handleApiError(error: unknown, context: string = ""): never {
  let message = "Unknown error";

  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;

    if (err.response) {
      message = err.response.data?.message || `Error ${err.response.status}`;
    } else if (err.request) {
      message = "Network error: No response from server.";
    } else {
      message = err.message || "Unexpected Axios error";
    }
  }

  if (!message && error instanceof Error) {
    message = error.message;
  }

  console.error(`[API Error] ${context ? `[${context}] ` : ""}${message}`);

  throw new Error(message);
}
