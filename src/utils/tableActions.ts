import { ActionHandler, ActionType, Product, User } from "@/types/data-types";

export const userActions: ActionType[] = ["Edit", "Delete"];
export const productActions: ActionType[] = ["Edit", "Manage Stock", "Delete"];

export const handleUserAction: ActionHandler<User> = (action, user) => {
  alert(`${action} User\n${JSON.stringify(user, null, 2)}`);
};

export const handleProductAction: ActionHandler<Product> = (
  action,
  product
) => {
  alert(`${action} Product\n${JSON.stringify(product, null, 2)}`);
};

export function getActionHandler(
  pathname: string
): { handler: ActionHandler<User | Product>; actions: ActionType[] } | null {
  if (pathname.includes("users"))
    return {
      handler: handleUserAction as ActionHandler<User | Product>,
      actions: userActions,
    };
  if (pathname.includes("products"))
    return {
      handler: handleProductAction as ActionHandler<User | Product>,
      actions: productActions,
    };
  return null;
}
