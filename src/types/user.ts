export interface User {
  id: string;
  googleEmail: string;
  username: string;
  role: "user" | "owner";
  googlePicture?: string;
  // Add other user properties as needed
}
