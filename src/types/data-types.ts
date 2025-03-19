export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  edit?: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
  edit?: boolean;
};

export type ActionType = "Edit" | "Delete" | "Manage Stock";

export type ActionHandler<T> = (action: ActionType, item: T) => void;
